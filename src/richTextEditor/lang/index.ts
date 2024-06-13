const langMap: Record<string, string> = {};

export const lang = (text: string, input?: string | number) => {
    text = langMap[text] || text;
    if (input) {
        return text.replace('{$0}', `${input}`);
    }
    return text;
};

export const setLangMap = (map: Record<string, string>) => {
    Object.assign(langMap, map);
};
