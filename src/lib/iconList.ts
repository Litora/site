export const iconNames = [
	"check_circle",
  "close",
	"error",
	"fireplace",
	"flight",
  "info",
	"local_cafe",
	"nest_eco_leaf",
	"rainy",
	"raven",
	"train",
	"waves",
] as const;

export type IconName = (typeof iconNames)[number];
