import type { Locale } from 'date-fns';
import type { SendbirdBaseMessage } from '../types';
type TruncateMode = 'head' | 'mid' | 'tail';
type TruncateOption = {
    mode: TruncateMode;
    maxLen: number;
    separator: string;
};
/**
 * String truncate util
 * @param {string} str
 * @param {Object} opts Options for truncate
 * @param {'head' | 'mid' | 'tail'} opts.mode  default "mid"
 * @param {number} opts.maxLen  default 40
 * @param {string} opts.separator default "..."
 * @returns {string}
 * */
export declare const truncate: (str: string, opts?: Partial<TruncateOption>) => string;
/**
 * Count truncate util
 * If count exceed the limit, it comes in the form of "MAX+"
 *
 * @param {number} count
 * @param {number} MAX default 99
 * @param {string} MAX_SUFFIX default +
 * @returns {string}
 * */
export declare const truncatedCount: (count: number, MAX?: number, MAX_SUFFIX?: string) => string;
/**
 * Messages date separator format
 *
 * @param {Date} date
 * @param {Locale} [locale]
 * @returns {string}
 * */
export declare const getDateSeparatorFormat: (date: Date, locale?: Locale) => string;
/**
 * Message time format
 *
 * @param {Date} date
 * @param {Locale} [locale]
 * @returns {string}
 * */
export declare const getMessageTimeFormat: (date: Date, locale?: Locale) => string;
/**
 * Message preview title text
 * */
export declare const getMessagePreviewTitle: (message: SendbirdBaseMessage, EMPTY_USERNAME?: string) => string;
/**
 * Message preview body text
 * */
export declare const getMessagePreviewBody: (message: SendbirdBaseMessage, EMPTY_MESSAGE?: string) => string;
/**
 * Message preview time format
 * */
export declare const getMessagePreviewTime: (timestamp: number, locale?: Locale) => string;
/**
 * milliseconds to 00:00 format
 * */
export declare const millsToMMSS: (mills: number) => string;
/**
 * milliseconds to 0:00 format
 * */
export declare const millsToMSS: (mills: number) => string;
export {};
