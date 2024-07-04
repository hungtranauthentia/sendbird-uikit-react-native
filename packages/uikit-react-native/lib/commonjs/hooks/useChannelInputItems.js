"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChannelInputItems = void 0;
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _SBUError = _interopRequireDefault(require("../libs/SBUError"));
var _SBUUtils = _interopRequireDefault(require("../libs/SBUUtils"));
var _useContext = require("./useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useChannelInputItems = (channel, sendFileMessage) => {
  const {
    sbOptions,
    imageCompressionConfig
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    fileService,
    mediaService
  } = (0, _useContext.usePlatformService)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const sheetItems = [];
  const input = (0, _uikitUtils.useIIFE)(() => {
    switch (true) {
      case channel.isOpenChannel():
        return sbOptions.uikit.openChannel.channel.input;
      case channel.isGroupChannel():
        return sbOptions.uikit.groupChannel.channel.input;
      default:
        return {
          enableDocument: true,
          camera: {
            enablePhoto: true,
            enableVideo: true
          },
          gallery: {
            enablePhoto: true,
            enableVideo: true
          }
        };
    }
  });
  if (input.camera.enablePhoto) {
    sheetItems.push({
      title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_CAMERA_PHOTO,
      icon: 'camera',
      onPress: async () => {
        const mediaFile = await fileService.openCamera({
          mediaType: 'photo',
          onOpenFailure: error => {
            if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
              alert({
                title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_CAMERA, STRINGS.LABELS.PERMISSION_APP_NAME),
                buttons: [{
                  text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                  onPress: () => _SBUUtils.default.openSettings()
                }]
              });
            } else {
              toast.show(STRINGS.TOAST.OPEN_CAMERA_ERROR, 'error');
            }
          }
        });
        if (mediaFile) {
          // Image compression
          if ((0, _uikitUtils.isImage)(mediaFile.uri, mediaFile.type) && (0, _uikitUtils.shouldCompressImage)(mediaFile.type, sbOptions.chat.imageCompressionEnabled)) {
            await _SBUUtils.default.safeRun(async () => {
              const compressed = await mediaService.compressImage({
                uri: mediaFile.uri,
                maxWidth: imageCompressionConfig.width,
                maxHeight: imageCompressionConfig.height,
                compressionRate: imageCompressionConfig.compressionRate
              });
              if (compressed) {
                mediaFile.uri = compressed.uri;
                mediaFile.size = compressed.size;
              }
            });
          }
          sendFileMessage(mediaFile);
        }
      }
    });
  }
  if (input.camera.enableVideo) {
    sheetItems.push({
      title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_CAMERA_VIDEO,
      icon: 'camera',
      onPress: async () => {
        const mediaFile = await fileService.openCamera({
          mediaType: 'video',
          onOpenFailure: error => {
            if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
              alert({
                title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_CAMERA, STRINGS.LABELS.PERMISSION_APP_NAME),
                buttons: [{
                  text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                  onPress: () => _SBUUtils.default.openSettings()
                }]
              });
            } else {
              toast.show(STRINGS.TOAST.OPEN_CAMERA_ERROR, 'error');
            }
          }
        });
        if (mediaFile) {
          sendFileMessage(mediaFile);
        }
      }
    });
  }
  if (input.gallery.enablePhoto || input.gallery.enableVideo) {
    const mediaType = (() => {
      switch (true) {
        case input.gallery.enablePhoto && input.gallery.enableVideo:
          return 'all';
        case input.gallery.enablePhoto && !input.gallery.enableVideo:
          return 'photo';
        case !input.gallery.enablePhoto && input.gallery.enableVideo:
          return 'video';
        default:
          return 'all';
      }
    })();
    sheetItems.push({
      title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_PHOTO_LIBRARY,
      icon: 'photo',
      onPress: async () => {
        const mediaFiles = await fileService.openMediaLibrary({
          selectionLimit: 1,
          mediaType,
          onOpenFailure: error => {
            if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
              alert({
                title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
                buttons: [{
                  text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                  onPress: () => _SBUUtils.default.openSettings()
                }]
              });
            } else {
              toast.show(STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR, 'error');
            }
          }
        });
        if (mediaFiles && mediaFiles[0]) {
          const mediaFile = mediaFiles[0];

          // Image compression
          if ((0, _uikitUtils.isImage)(mediaFile.uri, mediaFile.type) && (0, _uikitUtils.shouldCompressImage)(mediaFile.type, sbOptions.chat.imageCompressionEnabled)) {
            await _SBUUtils.default.safeRun(async () => {
              const compressed = await mediaService.compressImage({
                uri: mediaFile.uri,
                maxWidth: imageCompressionConfig.width,
                maxHeight: imageCompressionConfig.height,
                compressionRate: imageCompressionConfig.compressionRate
              });
              if (compressed) {
                mediaFile.uri = compressed.uri;
                mediaFile.size = compressed.size;
              }
            });
          }
          sendFileMessage(mediaFile);
        }
      }
    });
  }
  if (input.enableDocument) {
    sheetItems.push({
      title: STRINGS.LABELS.CHANNEL_INPUT_ATTACHMENT_FILES,
      icon: 'document',
      onPress: async () => {
        const documentFile = await fileService.openDocument({
          onOpenFailure: () => toast.show(STRINGS.TOAST.OPEN_FILES_ERROR, 'error')
        });
        if (documentFile) {
          // Image compression
          if ((0, _uikitUtils.isImage)(documentFile.uri, documentFile.type) && (0, _uikitUtils.shouldCompressImage)(documentFile.type, sbOptions.chat.imageCompressionEnabled)) {
            await _SBUUtils.default.safeRun(async () => {
              const compressed = await mediaService.compressImage({
                uri: documentFile.uri,
                maxWidth: imageCompressionConfig.width,
                maxHeight: imageCompressionConfig.height,
                compressionRate: imageCompressionConfig.compressionRate
              });
              if (compressed) {
                documentFile.uri = compressed.uri;
                documentFile.size = compressed.size;
              }
            });
          }
          sendFileMessage(documentFile);
        }
      }
    });
  }
  return sheetItems;
};
exports.useChannelInputItems = useChannelInputItems;
//# sourceMappingURL=useChannelInputItems.js.map