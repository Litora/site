import { useRef, useState, useEffect, useCallback } from "react";
import "./VolumeSlider.scss";

interface Props {
	onVolumeChange: (volume: number) => void;
	initialValue?: number;
}

export default function VolumeSlider({
	onVolumeChange,
	initialValue = 0,
}: Props) {
	const trackRef = useRef<HTMLDivElement>(null);
	const thumbRef = useRef<HTMLDivElement>(null);

	const [isDragging, setIsDragging] = useState(false);
	const [percentage, setPercentage] = useState(initialValue);

	const updatePosition = useCallback(
		(clientX: number) => {
			const track = trackRef.current;
			if (!track) return;

			const rect = track.getBoundingClientRect();
			let x = clientX - rect.left;
			x = Math.max(0, Math.min(x, rect.width));

			const pct = x / rect.width;
			setPercentage(pct);
			onVolumeChange(pct);
		},
		[onVolumeChange]
	);

	const handlePointerDown = (e: React.PointerEvent) => {
		e.preventDefault();
		setIsDragging(true);
		updatePosition(e.clientX);
	};

	const handlePointerMove = useCallback(
		(e: PointerEvent) => {
			if (!isDragging) return;

			requestAnimationFrame(() => {
				updatePosition(e.clientX);
			});
		},
		[isDragging, updatePosition]
	);

	const handlePointerUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	useEffect(() => {
		window.addEventListener("pointermove", handlePointerMove, {
			passive: true,
		});
		window.addEventListener("pointerup", handlePointerUp);
		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("pointerup", handlePointerUp);
		};
	}, [handlePointerMove, handlePointerUp]);

	return (
		<div className="volume-slider">
			<div
				className="slider-container"
				data-slider-zero={percentage === 0 ? "zero" : "nonzero"}
				style={
					{
						"--progress-width": `calc(${percentage} * (100% - 25px))`,
					} as React.CSSProperties
				}>
				<div
					className="slider-thumb"
					ref={thumbRef}
					onPointerDown={handlePointerDown}
				/>
				<div
					className="slider-track"
					ref={trackRef}
					onPointerDown={handlePointerDown}
				/>
				<div className="slider-track-active"></div>
			</div>
			<p className="current-volume">{Math.round(percentage * 100)}%</p>
		</div>
	);
}
