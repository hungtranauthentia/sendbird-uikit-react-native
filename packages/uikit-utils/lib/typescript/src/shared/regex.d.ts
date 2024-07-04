export declare const urlRegexStrict: RegExp;
export declare const urlRegexRough: RegExp;
export declare const phoneRegex: RegExp;
export declare const emailRegex: RegExp;
export declare const newLineRegex: RegExp;
export declare const createMentionTemplateRegex: (trigger: string) => RegExp;
export declare const replaceWithRegex: <T>(text: string, regex: RegExp, replacer: (params: {
    match: string;
    groups: string[];
    matchIndex: number | undefined;
    index: number;
    keyPrefix: string;
}) => T, keyPrefix: string) => (string | T)[];
export declare const replaceUrlAsComponents: <T>(originText: string, replacer: (url: string) => T, strict?: boolean) => (string | T)[];
