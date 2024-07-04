import { getFileType } from '@sendbird/uikit-utils';
import SBUError from '../libs/SBUError';
import expoBackwardUtils from '../utils/expoBackwardUtils';
import expoPermissionGranted from '../utils/expoPermissionGranted';
const createExpoFileService = _ref => {
  let {
    imagePickerModule,
    documentPickerModule,
    mediaLibraryModule,
    fsModule
  } = _ref;
  class ExpoFileServiceInterface {
    async hasCameraPermission() {
      const res = await imagePickerModule.getCameraPermissionsAsync();
      return expoPermissionGranted([res]);
    }
    async requestCameraPermission() {
      const res = await imagePickerModule.requestCameraPermissionsAsync();
      return expoPermissionGranted([res]);
    }
    async hasMediaLibraryPermission(type) {
      const perms = await imagePickerModule.getMediaLibraryPermissionsAsync(type === 'write');
      return expoPermissionGranted([perms]);
    }
    async requestMediaLibraryPermission(type) {
      const perms = await imagePickerModule.requestMediaLibraryPermissionsAsync(type === 'write');
      return expoPermissionGranted([perms]);
    }
    async openCamera(options) {
      const hasPermission = await this.hasCameraPermission();
      if (!hasPermission) {
        const granted = await this.requestCameraPermission();
        if (!granted) {
          var _options$onOpenFailur;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur = options.onOpenFailure) === null || _options$onOpenFailur === void 0 ? void 0 : _options$onOpenFailur.call(options, SBUError.PERMISSIONS_DENIED);
          return null;
        }
      }
      const response = await imagePickerModule.launchCameraAsync({
        mediaTypes: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return imagePickerModule.MediaTypeOptions.Images;
            case 'video':
              return imagePickerModule.MediaTypeOptions.Videos;
            case 'all':
              return imagePickerModule.MediaTypeOptions.All;
            default:
              return imagePickerModule.MediaTypeOptions.Images;
          }
        })()
      });
      if (expoBackwardUtils.imagePicker.isCanceled(response)) return null;
      const [file] = await expoBackwardUtils.imagePicker.toFilePickerResponses(response, fsModule);
      return file;
    }
    async openMediaLibrary(options) {
      const hasPermission = await this.hasMediaLibraryPermission('read');
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission('read');
        if (!granted) {
          var _options$onOpenFailur2;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur2 = options.onOpenFailure) === null || _options$onOpenFailur2 === void 0 ? void 0 : _options$onOpenFailur2.call(options, SBUError.PERMISSIONS_DENIED);
          return null;
        }
      }
      const selectionLimit = (options === null || options === void 0 ? void 0 : options.selectionLimit) || 1;
      const response = await imagePickerModule.launchImageLibraryAsync({
        selectionLimit,
        mediaTypes: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return imagePickerModule.MediaTypeOptions.Images;
            case 'video':
              return imagePickerModule.MediaTypeOptions.Videos;
            case 'all':
              return imagePickerModule.MediaTypeOptions.All;
            default:
              return imagePickerModule.MediaTypeOptions.Images;
          }
        })()
      });
      if (expoBackwardUtils.imagePicker.isCanceled(response)) return null;
      return expoBackwardUtils.imagePicker.toFilePickerResponses(response, fsModule);
    }
    async openDocument(options) {
      try {
        const response = await documentPickerModule.getDocumentAsync({
          type: '*/*'
        });
        if (expoBackwardUtils.documentPicker.isCanceled(response)) return null;
        const [file] = await expoBackwardUtils.documentPicker.toFilePickerResponses(response);
        return file;
      } catch (e) {
        var _options$onOpenFailur3;
        options === null || options === void 0 ? void 0 : (_options$onOpenFailur3 = options.onOpenFailure) === null || _options$onOpenFailur3 === void 0 ? void 0 : _options$onOpenFailur3.call(options, SBUError.UNKNOWN, e);
        return null;
      }
    }
    async save(options) {
      const hasPermission = await this.hasMediaLibraryPermission('write');
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission('write');
        if (!granted) throw new Error('Permission not granted');
      }
      const basePath = fsModule.documentDirectory || fsModule.cacheDirectory;
      if (!basePath) throw new Error('Cannot determine directory');
      const downloadPath = `${basePath}/${options.fileName}`;
      const response = await fsModule.downloadAsync(options.fileUrl, downloadPath);
      if (getFileType(options.fileType || '').match(/video|image/)) {
        await mediaLibraryModule.saveToLibraryAsync(response.uri);
      }
      return response.uri;
    }
    createRecordFilePath() {
      let customExtension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'm4a';
      const basePath = fsModule.cacheDirectory;
      if (!basePath) throw new Error('Cannot determine directory');
      const filename = `record-${Date.now()}.${customExtension}`;
      return {
        uri: `${basePath}/${filename}`,
        recordFilePath: `${basePath}/${filename}`
      };
    }
  }
  return new ExpoFileServiceInterface();
};
export default createExpoFileService;
//# sourceMappingURL=createFileService.expo.js.map