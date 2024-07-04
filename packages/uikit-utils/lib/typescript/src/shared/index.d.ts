/**
 * Converts a given string to a hashed string.
 * */
export declare function hash(str: string): string;
/**
 * Replace a specific range of text in the string with another text.
 * */
export declare function replace(str: string, start: number, end: number, text: string): string;
/**
 * Returns the value corresponding to the first true index of a given condition array.
 * */
export declare function conditionChaining<T, V>(conditions: T[], values: V[]): V;
/**
 * Returns a new object with only the specified keys from the input object.
 *
 * @param {Object} obj - The input object to pick keys from.
 * @param {Array<string>} keys - An array of keys to pick from the input object.
 * @returns {Object} - A new object containing only the specified keys from the input object.
 * @example
 * ```ts
 *   pick({ a: 1, b: '2', c: true }, ['a', 'c']); // returns { a: 1, c: true }
 * ```
 */
export declare function pick<T extends {
    [key: string]: unknown;
}, Keys extends keyof T>(obj: T, keys: Keys[]): { [key in Keys]: T[key]; };
export declare function mergeObjectArrays<T>(A: T[], B: T[], key: keyof T): T[];
export declare function sleep(ms: number): Promise<unknown>;
export declare function matchesOneOf<V, C extends V[]>(value: V, candidates: C): boolean;
