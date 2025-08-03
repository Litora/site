import { type IconName } from "./iconList";

export type AmbientSound = {
	iconName: IconName;
	effectTitle: string;
	playListId: string;
	playListUrl: `https://raw.githubusercontent.com/Litora/ambient/refs/heads/main/${string}/chunks/${string}_playlist.m3u8`;
};

export const partialAmbientSounds: Omit<AmbientSound, "playListUrl">[] = [
	{
		iconName: "rainy",
		effectTitle: "Rain",
		playListId: "rain",
	},
	{
		iconName: "flight",
		effectTitle: "Flight",
		playListId: "airplane",
	},
	{
		iconName: "local_cafe",
		effectTitle: "Cafe",
		playListId: "coffee",
	},
	{
		iconName: "waves",
		effectTitle: "Sea",
		playListId: "sea",
	},
	{
		iconName: "raven",
		effectTitle: "Birds",
		playListId: "birds",
	},
	{
		iconName: "nest_eco_leaf",
		effectTitle: "Crickets",
		playListId: "crickets",
	},
	{
		iconName: "fireplace",
		effectTitle: "Fireplace",
		playListId: "fire",
	},
	{
		iconName: "train",
		effectTitle: "Train",
		playListId: "train",
	},
];

export const ambientSounds: AmbientSound[] = partialAmbientSounds.map((e) => ({
	...e,
	playListUrl: `https://raw.githubusercontent.com/Litora/ambient/refs/heads/main/${e.playListId}/chunks/${e.playListId}_playlist.m3u8`,
}));