function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Platform } from 'react-native';
import { Logger, getFileExtension, getFileExtensionFromMime, getFileExtensionFromUri, getFileType, normalizeFileName } from '@sendbird/uikit-utils';
import SBUError from '../libs/SBUError';
import nativePermissionGranted from '../utils/nativePermissionGranted';
import normalizeFile from '../utils/normalizeFile';
function getAndroidStoragePermissionsByAPILevel(permissionModule) {
  if (Platform.OS !== 'android') return [];
  if (Platform.Version > 32) {
    return [permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_AUDIO, permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_IMAGES, permissionModule.PERMISSIONS.ANDROID.READ_MEDIA_VIDEO];
  }
  if (Platform.Version > 28) {
    return [permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
  }
  return [permissionModule.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, permissionModule.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE];
}
const createNativeFileService = _ref => {
  let {
    imagePickerModule,
    documentPickerModule,
    permissionModule,
    mediaLibraryModule,
    fsModule
  } = _ref;
  const cameraPermissions = Platform.select({
    ios: [permissionModule.PERMISSIONS.IOS.CAMERA, permissionModule.PERMISSIONS.IOS.MICROPHONE],
    android: [permissionModule.PERMISSIONS.ANDROID.CAMERA],
    default: []
  });
  const mediaLibraryPermissions = Platform.select({
    ios: [permissionModule.PERMISSIONS.IOS.PHOTO_LIBRARY, permissionModule.PERMISSIONS.IOS.PHOTO_LIBRARY_ADD_ONLY],
    android: getAndroidStoragePermissionsByAPILevel(permissionModule),
    default: []
  });
  class NativeFileService {
    constructor() {
      _defineProperty(this, "buildDownloadPath", async options => {
        const dirname = Platform.select({
          android: fsModule.Dirs.CacheDir,
          default: fsModule.Dirs.DocumentDir
        });
        const context = {
          dirname,
          filename: options.fileName
        };
        const extension = getFileExtension(options.fileName) || getFileExtensionFromMime(options.fileType) || getFileExtension(options.fileUrl) || (await getFileExtensionFromUri(options.fileUrl));
        if (extension) context.filename = normalizeFileName(context.filename, extension);
        return {
          path: `${context.dirname}/${context.filename}`,
          ...context
        };
      });
      _defineProperty(this, "downloadFile", async options => {
        const {
          path,
          filename
        } = await this.buildDownloadPath(options);
        await fsModule.FileSystem.fetch(options.fileUrl, {
          path
        });
        return {
          downloadedPath: path,
          file: {
            name: filename,
            type: getFileType(getFileExtension(path))
          }
        };
      });
    }
    async hasCameraPermission() {
      const status = await permissionModule.checkMultiple(cameraPermissions);
      return nativePermissionGranted(status);
    }
    async requestCameraPermission() {
      const status = await permissionModule.requestMultiple(cameraPermissions);
      return nativePermissionGranted(status);
    }
    async hasMediaLibraryPermission() {
      const status = await permissionModule.checkMultiple(mediaLibraryPermissions);
      return nativePermissionGranted(status);
    }
    async requestMediaLibraryPermission() {
      const status = await permissionModule.requestMultiple(mediaLibraryPermissions);
      return nativePermissionGranted(status);
    }
    async openCamera(options) {
      var _response$assets;
      const hasPermission = await this.hasCameraPermission();
      if (!hasPermission) {
        const granted = await this.requestCameraPermission();
        if (!granted) {
          var _options$onOpenFailur;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur = options.onOpenFailure) === null || _options$onOpenFailur === void 0 ? void 0 : _options$onOpenFailur.call(options, SBUError.PERMISSIONS_DENIED);
          return null;
        }
      }
      const response = await imagePickerModule.launchCamera({
        presentationStyle: 'fullScreen',
        cameraType: (options === null || options === void 0 ? void 0 : options.cameraType) ?? 'back',
        mediaType: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return 'photo';
            case 'video':
              return 'video';
            case 'all':
              return 'mixed';
            default:
              return 'photo';
          }
        })()
      });
      if (response.didCancel) return null;
      if (response.errorCode === 'camera_unavailable') {
        var _options$onOpenFailur2;
        options === null || options === void 0 ? void 0 : (_options$onOpenFailur2 = options.onOpenFailure) === null || _options$onOpenFailur2 === void 0 ? void 0 : _options$onOpenFailur2.call(options, SBUError.DEVICE_UNAVAILABLE, new Error(response.errorMessage));
        return null;
      }
      const {
        fileName: name,
        fileSize: size,
        type,
        uri
      } = ((_response$assets = response.assets) === null || _response$assets === void 0 ? void 0 : _response$assets[0]) ?? {};
      return normalizeFile({
        uri,
        size,
        name,
        type
      });
    }
    async openMediaLibrary(options) {
      /**
       * NOTE: options.selectionLimit {@link https://github.com/react-native-image-picker/react-native-image-picker#options}
       * We do not support 0 (any number of files)
       **/
      const selectionLimit = (options === null || options === void 0 ? void 0 : options.selectionLimit) || 1;
      const hasPermission = await this.hasMediaLibraryPermission();
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission();
        if (!granted) {
          var _options$onOpenFailur3;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur3 = options.onOpenFailure) === null || _options$onOpenFailur3 === void 0 ? void 0 : _options$onOpenFailur3.call(options, SBUError.PERMISSIONS_DENIED);
          return null;
        }
      }
      const response = await imagePickerModule.launchImageLibrary({
        presentationStyle: 'fullScreen',
        selectionLimit,
        mediaType: (() => {
          switch (options === null || options === void 0 ? void 0 : options.mediaType) {
            case 'photo':
              return 'photo';
            case 'video':
              return 'video';
            case 'all':
              return 'mixed';
            default:
              return 'photo';
          }
        })()
      });
      if (response.didCancel) return null;
      if (response.errorCode === 'camera_unavailable') {
        var _options$onOpenFailur4;
        options === null || options === void 0 ? void 0 : (_options$onOpenFailur4 = options.onOpenFailure) === null || _options$onOpenFailur4 === void 0 ? void 0 : _options$onOpenFailur4.call(options, SBUError.DEVICE_UNAVAILABLE, new Error(response.errorMessage));
        return null;
      }
      return Promise.all((response.assets || []).slice(0, selectionLimit).map(_ref2 => {
        let {
          fileName: name,
          fileSize: size,
          type,
          uri
        } = _ref2;
        return normalizeFile({
          uri,
          size,
          name,
          type
        });
      }));
    }
    async openDocument(options) {
      try {
        const {
          uri,
          size,
          name,
          type
        } = await documentPickerModule.pickSingle();
        return normalizeFile({
          uri,
          size,
          name,
          type
        });
      } catch (e) {
        if (!documentPickerModule.isCancel(e) && documentPickerModule.isInProgress(e)) {
          var _options$onOpenFailur5;
          options === null || options === void 0 ? void 0 : (_options$onOpenFailur5 = options.onOpenFailure) === null || _options$onOpenFailur5 === void 0 ? void 0 : _options$onOpenFailur5.call(options, SBUError.UNKNOWN, e);
        }
        return null;
      }
    }
    async save(options) {
      const hasPermission = await this.hasMediaLibraryPermission();
      if (!hasPermission) {
        const granted = await this.requestMediaLibraryPermission();
        if (!granted) throw new Error('Permission not granted');
      }
      const {
        downloadedPath,
        file
      } = await this.downloadFile(options);
      if (Platform.OS === 'ios') {
        if (file.type === 'image' || file.type === 'video') {
          const mediaTypeMap = {
            'image': 'photo',
            'video': 'video'
          };
          const mediaType = mediaTypeMap[file.type];
          await mediaLibraryModule.save(downloadedPath, {
            type: mediaType
          });
        }
      }
      if (Platform.OS === 'android') {
        const externalDirMap = {
          'file': 'downloads',
          'audio': 'audio',
          'image': 'images',
          'video': 'video'
        };
        const externalDir = externalDirMap[file.type];
        await fsModule.FileSystem.cpExternal(downloadedPath, file.name, externalDir).catch(() => {
          Logger.error('Failed to save file to external storage. Retry saving to downloads directory instead.');
          return fsModule.FileSystem.cpExternal(downloadedPath, file.name, 'downloads');
        });
      }
      return downloadedPath;
    }
    createRecordFilePath() {
      let customExtension = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'm4a';
      const filename = `record-${Date.now()}.${customExtension}`;
      const path = `${fsModule.Dirs.CacheDir}/${filename}`;
      return Platform.select({
        ios: {
          uri: path,
          recordFilePath: filename
        },
        android: {
          uri: path.startsWith('file://') ? path : 'file://' + path,
          recordFilePath: path
        },
        default: {
          uri: path,
          recordFilePath: path
        }
      });
    }
  }
  return new NativeFileService();
};
export default createNativeFileService;
//# sourceMappingURL=createFileService.native.js.map