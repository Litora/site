import Effect from "@components/Effect";
import RainyIcon from "@components/icons/Rainy";
import FireplaceIcon from "@components/icons/Fireplace";
import AirplaneIcon from "@components/icons/Airplane";
import CafeIcon from "@components/icons/Cafe";
import LeafIcon from "@components/icons/Leaf";
import BirdIcon from "@components/icons/Bird";
import TrainIcon from "@components/icons/Train";
import WavesIcon from "@components/icons/Waves";
import "./Box.scss";

import type { MixerSection } from "@i18n/types.ts";

export interface MixerSectionProps {
	mixer: MixerSection;
}

export default function MixerSection({ mixer }: MixerSectionProps) {
	return (
		<div className="container">
			<h1>{mixer.title}</h1>
			<p>{mixer.description}</p>
			<div className="effect-container">
				<Effect effectTitle={mixer.sounds.rain} effectStatus={mixer.effectStatus} playlistId="rain">
					<RainyIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.flight} effectStatus={mixer.effectStatus} playlistId="airplane">
					<AirplaneIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.cafe} effectStatus={mixer.effectStatus} playlistId="coffee">
					<CafeIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.sea} effectStatus={mixer.effectStatus} playlistId="sea">
					<WavesIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.birds} effectStatus={mixer.effectStatus} playlistId="birds">
					<BirdIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.crickets} effectStatus={mixer.effectStatus} playlistId="crickets">
					<LeafIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.fireplace} effectStatus={mixer.effectStatus} playlistId="fire">
					<FireplaceIcon />
				</Effect>
				<Effect effectTitle={mixer.sounds.train} effectStatus={mixer.effectStatus} playlistId="train">
					<TrainIcon />
				</Effect>
			</div>
		</div>
	);
}
