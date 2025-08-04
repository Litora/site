import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import $ from "jquery";
import VolumeSlider from "./VolumeSlider";
import "./Effect.scss";

interface EffectProps {
	effectTitle: string;
	playlistId: string;
	children: any;
}

export default function Effect({
	effectTitle,
	playlistId,
	children,
}: EffectProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const hlsRef = useRef<Hls | null>(null);

	const [volume, setVolume] = useState<number>(0);
	const [hasStarted, setHasStarted] = useState(false);

	const fadeInDoneRef = useRef(false);
	const isFadingRef = useRef(false);
	const currentFadeRef = useRef<JQuery<unknown> | null>(null);
	const stableVolumeRef = useRef<number>(0);
	const lastSliderUpdate = useRef<number | null>(null);
	const playTriggeredRef = useRef(false);

	const playlistUrl = `https://raw.githubusercontent.com/Litora/ambient/refs/heads/main/${playlistId}/chunks/${playlistId}_playlist.m3u8`;

	// Función de comparación segura de volumen
	function volumesDiffer(a: number, b: number): boolean {
		return Math.abs(a - b) > 0.005;
	}

	// Función que programa el fade-in
	function scheduleFadeIn(audio: HTMLAudioElement, target: number) {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				const latestTarget = stableVolumeRef.current || target;
				if (!fadeInDoneRef.current && latestTarget !== 0) {
					fadeInDoneRef.current = true;
					audio.volume = 0;
					fadeVolume(audio, latestTarget, 3000);
				}
			});
		});
	}

	// Función que hace el fade del volumen
	function fadeVolume(audio: HTMLAudioElement, to: number, duration: number) {
		if (currentFadeRef.current) {
			currentFadeRef.current.stop(true);
		}

		const $audio = $(audio);
		const anim = $audio.animate(
			{ volume: to },
			{
				duration,
				complete: () => {
					isFadingRef.current = false;
					currentFadeRef.current = null;

					// Post-fade check
					const finalVolume = stableVolumeRef.current || volume;
					if (volumesDiffer(audio.volume, finalVolume)) {
						fadeVolume(audio, finalVolume, 200);
					}
				},
			}
		);

		isFadingRef.current = true;
		currentFadeRef.current = anim;
	}

	// Guarda el volumen actual como "estable"
	useEffect(() => {
		const now = Date.now();
		lastSliderUpdate.current = now;

		setTimeout(() => {
			if (lastSliderUpdate.current === now) {
				stableVolumeRef.current = volume;
			}
		}, 100);
	}, [volume]);

	// Lógica de reproducción y volumen
	useEffect(() => {
		const audio = audioRef.current;
		if (!audio) return;

		// Cortar fade si el usuario cambia el volumen durante el fade-in
		if (
			isFadingRef.current &&
			fadeInDoneRef.current &&
			volumesDiffer(volume, audio.volume)
		) {
			currentFadeRef.current?.stop(true);
			fadeVolume(audio, volume, 200);
			return;
		}

		// Actualizar volumen si ya empezó y no está en fade
		if (hasStarted && !isFadingRef.current) {
			audio.volume = volume;

			if (volume > 0) {
				audio.play().catch(() => {});
			} else {
				audio.pause();
				hlsRef.current?.stopLoad();
			}
		}

		// Iniciar HLS si aún no lo ha hecho
		if (!hasStarted && volume > 0 && !hlsRef.current) {
			const hls = new Hls({ autoStartLoad: false });
			hlsRef.current = hls;
			hls.loadSource(playlistUrl);
			hls.attachMedia(audio);
			hls.startLoad(0);
		}
	}, [volume, hasStarted, playlistUrl]);

	// ÚNICO efecto que inicia el audio (una sola vez)
	useEffect(() => {
		const audio = audioRef.current;
		if (
			!audio ||
			hasStarted ||
			volume === 0 ||
			!hlsRef.current ||
			playTriggeredRef.current
		)
			return;

		playTriggeredRef.current = true;

		audio
			.play()
			.then(() => {
				setHasStarted(true);
				const target = stableVolumeRef.current || volume;

				if (!fadeInDoneRef.current && target !== 0) {
					scheduleFadeIn(audio, target);
				}
			})
			.catch((err) => {
				console.error(err);
				// manejar fuera
			});
	}, [playlistUrl, volume, hasStarted]);

	// Init: poner audio en silencio
	useEffect(() => {
		const audio = audioRef.current;
		if (audio) {
			audio.loop = true;
			audio.volume = 0;
		}
	}, []);

	return (
		<div className="effect">
			<div className="icon-container">
				{children}
			</div>
			<h1 className="effect-title">{effectTitle}</h1>
			<div className="audio-container">
				<audio ref={audioRef} preload="none" style={{ display: "none" }} />
				<VolumeSlider onVolumeChange={setVolume} />
			</div>
		</div>
	);
}
