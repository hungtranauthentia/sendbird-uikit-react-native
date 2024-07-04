export declare const imageExtRegex: RegExp;
export declare const audioExtRegex: RegExp;
export declare const videoExtRegex: RegExp;
export declare const getFileType: (extensionOrType: string) => "video" | "audio" | "image" | "file";
/**
 * Calculates the downscaled size of an image while preserving its aspect ratio.
 *
 * @param {Object} origin - The original size object with `width` and `height` properties.
 * @param {Object} resizing - The resizing object with optional `width` and `height` properties.
 * @returns {Object} - A new size object with the downscaled `width` and `height` properties.
 * @example
 * ```ts
 *   getDownscaleSize({ width: 1200, height: 800 }, { width: 600 }); // returns { width: 600, height: 400 }
 * ```
 */
type Size = {
    width: number;
    height: number;
};
export declare function getDownscaleSize(origin: Size, resizing: Partial<Size>): {
    width: number;
    height: number;
};
/**
 * Normalize a file name by ensuring it has the given extension, if it doesn't already.
 *
 * @param {string} fileName - The file name to normalize.
 * @param {string} extension - The desired extension, without a leading period.
 * @returns {string} - The normalized file name, with the extension.
 */
export declare function normalizeFileName(fileName: string, extension: string): string;
/**
 * Parses a MIME type string into its components.
 *
 * @param mimeType - The MIME type string to parse.
 * @returns An object containing the type, subtype, and parameters of the MIME type.
 */
type MimeType = {
    type: string;
    subtype: string;
    parameters: Record<string, string>;
};
export declare function parseMimeType(mimeType: string): MimeType;
/**
 * Returns the file extension based on the MIME type.
 *
 * @param {string | null | undefined} mimeType - The MIME type to look up.
 * @returns {string} - The file extension for the given MIME type, or an empty string if no matching file extension was found.
 */
export declare function getFileExtensionFromMime(mimeType?: string | null): string;
/**
 * Returns the MIME type based on the file extension.
 *
 * @param {string | null | undefined} ext - The file extension to look up.
 * @returns {string} - The MIME type for the given file extension, or an empty string if no matching MIME type was found.
 */
export declare function getMimeFromFileExtension(ext?: string | null): string;
/**
 * Returns the file extension of a file path.
 *
 * @param {string} filePath - The file path to extract the extension from.
 * @returns {string} - The file extension, or an empty string if the file path does not have an extension.
 */
export declare function getFileExtension(filePath: string): string;
export declare function getFileExtensionFromUri(uri: string): Promise<string>;
export declare function isImage(filePath: string, mimeType?: string): boolean;
export declare function shouldCompressImage(mime: string, compressionEnabled?: boolean): boolean;
export {};
