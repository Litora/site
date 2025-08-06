export type EffectStatus = {
	off: string;
	loading: string;
	playing: string;
	paused: string;
};

export interface Meta {
	index: {
		title: string;
		description: string;
	};
}

export interface HeroSection {
	title: string;
	description: string;
	buttonText: string;
}
export interface MixerSection {
	title: string;
	description: string;
	sounds: {
		rain: string;
		flight: string;
		cafe: string;
		sea: string;
		birds: string;
		crickets: string;
		fireplace: string;
		train: string;
	};
	effectStatus: EffectStatus;
}
export interface QuoteSection {
	quoteText: string;
	quoteAuthor: {
		name: string;
		role: string;
	};
}
export interface FocusSection {
	title: string;
	noAds: {
		title: string;
		description: string;
	};
	noLogins: {
		title: string;
		description: string;
	};
	noInterruptions: {
		title: string;
		description: string;
	};
}
export interface SpiritSection {
	quoteText: string;
	quoteAuthor: string;
}

export interface LocaleText {
	meta: Meta;
	navigation: {
		aboutText: string;
		soundsText: string;
		githubText: string;
	};
	hero: HeroSection;
	mixer: MixerSection;
	quote: QuoteSection;
	focus: FocusSection;
	spirit: SpiritSection;
}
