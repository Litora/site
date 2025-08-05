// src/components/sections/MixerSection.tsx
import React from "react";
import Effect from "@components/Effect";
import RainyIcon from "@components/icons/Rainy";
import FireplaceIcon from "@components/icons/Fireplace";
import AirplaneIcon from "@components/icons/Airplane";
import CafeIcon from "@components/icons/Cafe";
import LeafIcon from "@components/icons/Leaf";
import BirdIcon from "@components/icons/Bird";
import TrainIcon from "@components/icons/Train";
import WavesIcon from "@components/icons/Waves";
import "./Mixer.scss";

import type { MixerSection } from "@i18n/types.ts";

export interface MixerSectionProps {
	mixer: MixerSection;
}

export default function MixerSection({ mixer }: MixerSectionProps) {
	return (
		<section id="mixer" className="section">
			<div className="box">
				<h1>{mixer.title}</h1>
				<p>{mixer.description}</p>
				<div className="effect-container">
					<Effect effectTitle={mixer.sounds.rain} playlistId="rain">
						<RainyIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.flight} playlistId="airplane">
						<AirplaneIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.cafe} playlistId="coffee">
						<CafeIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.sea} playlistId="sea">
						<WavesIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.birds} playlistId="birds">
						<BirdIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.crickets} playlistId="crickets">
						<LeafIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.fireplace} playlistId="fire">
						<FireplaceIcon />
					</Effect>
					<Effect effectTitle={mixer.sounds.train} playlistId="train">
						<TrainIcon />
					</Effect>
				</div>
			</div>
		</section>
	);
}
