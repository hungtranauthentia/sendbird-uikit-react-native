import type { Locale } from 'date-fns';
import type { PartialDeep } from '@sendbird/uikit-utils';
import type { StringSet } from './StringSet.type';
type StringSetCreateOptions = {
    dateLocale: Locale;
    overrides?: PartialDeep<StringSet>;
};
/**
 * Create string set
 * You can create localized String set, you should provide locale for date and string as a parameters
 *
 * @param {StringSetCreateOptions.dateLocale} dateLocale Date locale (from date-fns)
 * @param {StringSetCreateOptions.overrides} [overrides] Localized strings
 * */
export declare const createBaseStringSet: ({ dateLocale, overrides }: StringSetCreateOptions) => StringSet;
export {};
