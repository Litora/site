export interface LocaleText {
	meta: {
		index: {
			title: string;
			description: string;
		};
	};
	navigation: {
		aboutText: string;
		soundsText: string;
		githubText: string;
	};
	hero: {
		title: string;
		description: string;
		buttonText: string;
	};
	mixer: {
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
	};
	focus: {
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
	};
	spirit: {
		quoteText: string;
		quoteAuthor: string;
	};
	quote: {
		quoteText: string;
		quoteAuthor: {
			name: string;
			role: string;
		};
	};
}
