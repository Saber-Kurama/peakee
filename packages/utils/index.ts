export type TranslateFunction = (text: string, code: 'en-vi' | 'vi-en') => void;
export let translate: TranslateFunction;

type InjectProps = {
	translate: TranslateFunction;
};

export const injectUtils = (utils: InjectProps) => {
	translate = utils.translate;
};
