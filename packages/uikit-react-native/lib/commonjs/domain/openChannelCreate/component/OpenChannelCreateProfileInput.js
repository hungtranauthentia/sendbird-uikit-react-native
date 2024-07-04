"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _Icon = _interopRequireDefault(require("@sendbird/uikit-react-native-foundation/src/components/Icon"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../../hooks/useContext");
var _SBUError = _interopRequireDefault(require("../../../libs/SBUError"));
var _SBUUtils = _interopRequireDefault(require("../../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OpenChannelCreateProfileInput = _ref => {
  let {
    channelName,
    channelCoverFile,
    onChangeChannelName,
    onChangeChannelCoverFile
  } = _ref;
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    openSheet
  } = (0, _uikitReactNativeFoundation.useBottomSheet)();
  const {
    palette,
    colors,
    typography
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const safeArea = (0, _uikitUtils.useSafeAreaPadding)(['left', 'right']);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    fileService
  } = (0, _useContext.usePlatformService)();
  const onPressPhotoButton = () => {
    const sheetItems = [{
      title: STRINGS.OPEN_CHANNEL_CREATE.DIALOG_IMAGE_MENU_CAMERA,
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
        if (mediaFile) onChangeChannelCoverFile(mediaFile);
      }
    }, {
      title: STRINGS.OPEN_CHANNEL_CREATE.DIALOG_IMAGE_MENU_PHOTO_LIBRARY,
      onPress: async () => {
        const mediaFiles = await fileService.openMediaLibrary({
          selectionLimit: 1,
          mediaType: 'photo',
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
        if (mediaFiles !== null && mediaFiles !== void 0 && mediaFiles[0]) onChangeChannelCoverFile(mediaFiles[0]);
      }
    }];
    if (channelCoverFile) {
      sheetItems.unshift({
        title: STRINGS.OPEN_CHANNEL_CREATE.DIALOG_IMAGE_MENU_REMOVE,
        titleColor: colors.error,
        onPress: () => {
          onChangeChannelCoverFile(undefined);
        }
      });
    }
    openSheet({
      sheetItems
    });
  };
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingLeft: 16 + safeArea.paddingLeft,
    paddingRight: 16 + safeArea.paddingRight
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    onPress: onPressPhotoButton,
    style: styles.coverButton,
    activeOpacity: 0.8
  }, (0, _uikitUtils.ifThenOr)(Boolean(channelCoverFile), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
    size: 72,
    uri: channelCoverFile === null || channelCoverFile === void 0 ? void 0 : channelCoverFile.uri
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar.Icon, {
    size: 72,
    icon: 'camera'
  }))), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    borderBottomColor: colors.onBackground04,
    style: styles.inputContainer
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.TextInput, {
    placeholder: STRINGS.OPEN_CHANNEL_CREATE.PLACEHOLDER,
    style: [typography.subtitle1, styles.input, {
      backgroundColor: palette.transparent
    }],
    value: channelName,
    onChangeText: onChangeChannelName
  }), channelName.length > 0 && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    onPress: () => onChangeChannelName(''),
    style: styles.removeButtonContainer
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    color: colors.onBackground03,
    size: 22,
    icon: 'remove'
  }))));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  coverButton: {
    marginRight: 20
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1
  },
  input: {
    flex: 1,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  removeButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginLeft: 8
  }
});
var _default = OpenChannelCreateProfileInput;
exports.default = _default;
//# sourceMappingURL=OpenChannelCreateProfileInput.js.map