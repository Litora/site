import React, { useEffect, useRef, useState, useCallback } from "react";
import VolumeSlider from "./VolumeSlider";
import "./Effect.scss";
import type { EffectStatus } from "@i18n/types";

interface EffectProps {
	effectTitle: string;
	playlistId: string;
	children: React.ReactNode;
	effectStatus: EffectStatus;
}

let $: any | null = null; // JQuery

export default function Effect({
	effectTitle,
	playlistId,
	children,
	effectStatus,
}: EffectProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const hlsRef = useRef<any | null>(null); // hls.js

	const [volume, setVolume] = useState(0);
	const [hasStarted, setHasStarted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [hasInteracted, setHasInteracted] = useState(false);

	const fadeInDoneRef = useRef(false);
	const isFadingRef = useRef(false);
	const currentFadeRef = useRef<JQuery<unknown> | null>(null);
	const stableVolumeRef = useRef(0);
	const lastSliderUpdate = useRef<number | null>(null);
	const playTriggeredRef = useRef(false);

	const playlistUrl = `https://raw.githubusercontent.com/Litora/ambient/refs/heads/main/${playlistId}/chunks/${playlistId}_playlist.m3u8`;

	const onVolumeChange = useCallback(
		(v: number) => {
			if (!hasInteracted) {
				setHasInteracted(true);
				if (v > 0) setIsLoading(true);
			}
			setVolume(v);
		},
		[hasInteracted]
	);

	const statusText = !hasInteracted
		? effectStatus.off
		: isLoading
		? effectStatus.loading
		: volume > 0
		? effectStatus.playing
		: effectStatus.paused;

	const litIcon = hasInteracted && !isLoading && volume > 0;

	function volumesDiffer(a: number, b: number) {
		return Math.abs(a - b) > 0.005;
	}

	async function fadeVolume(
		audio: HTMLAudioElement,
		to: number,
		duration: number
	) {
		if (!$) {
			$ = (await import("jquery")).default;
		}
		currentFadeRef.current?.stop(true);
		const $audio = $(audio);
		const anim = $audio.animate(
			{ volume: to },
			{
				duration,
				complete: () => {
					isFadingRef.current = false;
					currentFadeRef.current = null;
					const finalVol = stableVolumeRef.current || volume;
					if (volumesDiffer(audio.volume, finalVol)) {
						fadeVolume(audio, finalVol, 200);
					}
				},
			}
		);
		isFadingRef.current = true;
		currentFadeRef.current = anim;
	}

	function scheduleFadeIn(audio: HTMLAudioElement, target: number) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				if (!fadeInDoneRef.current && target !== 0) {
					fadeInDoneRef.current = true;
					audio.volume = 0;
					fadeVolume(audio, target, 3000);
				}
			});
		});
	}
	useEffect(() => {
		const now = Date.now();
		lastSliderUpdate.current = now;
		const handle = setTimeout(() => {
			if (lastSliderUpdate.current === now) {
				stableVolumeRef.current = volume;
			}
		}, 100);
		return () => clearTimeout(handle);
	}, [volume]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		if (
			isFadingRef.current &&
			fadeInDoneRef.current &&
			volumesDiffer(volume, audio.volume)
		) {
			currentFadeRef.current?.stop(true);
			fadeVolume(audio, volume, 200);
			return;
		}

		if (hasStarted && !isFadingRef.current) {
			audio.volume = volume;
			if (volume > 0) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
				hlsRef.current?.stopLoad();
			}
		}

		if (!hasStarted && volume > 0 && !hlsRef.current) {
			(async () => {
				const { default: Hls } = await import("hls.js");
				const hls = new Hls({ autoStartLoad: false });
				hlsRef.current = hls;
				hls.loadSource(playlistUrl);
				hls.attachMedia(audio);
				hls.startLoad(0);
			})();
		}
	}, [volume, hasStarted, playlistUrl]);

	useEffect(() => {
		const audio = audioRef.current;
		if (
			!audio ||
			hasStarted ||
			volume === 0 ||
			!hlsRef.current ||
			playTriggeredRef.current
		) {
			return;
		}
		playTriggeredRef.current = true;
		audio
			.play()
			.then(() => {
				setHasStarted(true);
				setIsLoading(false);
				const target = stableVolumeRef.current || volume;
				scheduleFadeIn(audio, target);
			})
			.catch(console.error);
	}, [volume, hasStarted, playlistUrl]);

	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.loop = true;
			audio.volume = 0;
		}
	}, []);

	return (
		<div className="effect">
			<div className={["icon-container", litIcon ? "lit" : ""].join(" ")}>
				{children}
			</div>
			<h1 className="effect-title">{effectTitle}</h1>
			<div className="audio-container">
				<audio ref={audioRef} preload="none" style={{ display: "none" }} />
				<VolumeSlider onVolumeChange={onVolumeChange} />
			</div>
			<div className="status-container">{statusText}</div>
		</div>
	);
}
