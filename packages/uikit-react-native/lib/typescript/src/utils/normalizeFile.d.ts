import type { PartialNullable } from '@sendbird/uikit-utils';
import type { FilePickerResponse, FileType } from '../platform/types';
declare const normalizeFile: ({ uri, size, name, type }: PartialNullable<FileType>) => Promise<FilePickerResponse>;
export default normalizeFile;
