import type * as ExpoDocumentPicker from 'expo-document-picker';
import type * as ExpoFs from 'expo-file-system';
import type * as ExpoImagePicker from 'expo-image-picker';
import type { FilePickerResponse } from '../platform/types';
declare const expoBackwardUtils: {
    imagePicker: {
        isCanceled(result: ExpoImagePicker.ImagePickerResult): boolean;
        toFilePickerResponses(result: ExpoImagePicker.ImagePickerResult, fsModule: typeof ExpoFs): Promise<FilePickerResponse[]>;
    };
    documentPicker: {
        isCanceled(result: ExpoDocumentPicker.DocumentPickerResult): boolean;
        toFilePickerResponses(result: ExpoDocumentPicker.DocumentPickerResult): Promise<FilePickerResponse[]>;
    };
    toFileSize(info: ExpoFs.FileInfo): number;
};
export default expoBackwardUtils;
