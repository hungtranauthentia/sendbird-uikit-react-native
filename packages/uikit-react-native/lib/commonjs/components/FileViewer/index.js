"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _FileViewerContent = _interopRequireDefault(require("./FileViewerContent"));
var _FileViewerFooter = _interopRequireDefault(require("./FileViewerFooter"));
var _FileViewerHeader = _interopRequireDefault(require("./FileViewerHeader"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const FileViewer = _ref => {
  let {
    headerShown = true,
    maxZoom = 3,
    minZoom = 1,
    headerTopInset,
    fileMessage,
    onClose,
    onPressDownload,
    onPressDelete,
    deleteMessage
  } = _ref;
  const {
    topInset,
    statusBarTranslucent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const {
    show
  } = (0, _uikitReactNativeFoundation.useToast)();
  const {
    fileService
  } = (0, _useContext.usePlatformService)();
  const {
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const fileType = (0, _uikitUtils.getFileType)(fileMessage.type || (0, _uikitUtils.getFileExtension)(fileMessage.url));
  const canDelete = (0, _uikitUtils.isMyMessage)(fileMessage, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
  const basicTopInset = statusBarTranslucent ? topInset : 0;
  const onPressDeleteButton = () => {
    if (!canDelete) return;
    if (onPressDelete) {
      onPressDelete(fileMessage);
    } else {
      alert({
        title: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_TITLE,
        buttons: [{
          text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_CANCEL
        }, {
          text: STRINGS.LABELS.CHANNEL_MESSAGE_DELETE_CONFIRM_OK,
          style: 'destructive',
          onPress: () => {
            deleteMessage().then(() => {
              onClose();
            }).catch(() => {
              show(STRINGS.TOAST.DELETE_MSG_ERROR, 'error');
            });
          }
        }]
      });
    }
  };
  const onPressDownloadButton = () => {
    if (onPressDownload) {
      onPressDownload(fileMessage);
    } else {
      if ((0, _uikitUtils.toMegabyte)(fileMessage.size) > 4) {
        show(STRINGS.TOAST.DOWNLOAD_START, 'success');
      }
      fileService.save({
        fileUrl: fileMessage.url,
        fileName: fileMessage.name,
        fileType: fileMessage.type
      }).then(response => {
        show(STRINGS.TOAST.DOWNLOAD_OK, 'success');
        _uikitUtils.Logger.log('File saved to', response);
      }).catch(err => {
        show(STRINGS.TOAST.DOWNLOAD_ERROR, 'error');
        _uikitUtils.Logger.log('File save failure', err);
      });
    }
  };
  (0, _react.useEffect)(() => {
    if (fileType === 'file') onClose();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1,
    backgroundColor: palette.background700
  }, /*#__PURE__*/_react.default.createElement(_reactNative.StatusBar, {
    barStyle: 'light-content',
    animated: true
  }), /*#__PURE__*/_react.default.createElement(_FileViewerHeader.default, {
    topInset: headerTopInset ?? basicTopInset,
    headerShown: headerShown,
    title: STRINGS.FILE_VIEWER.TITLE(fileMessage),
    subtitle: STRINGS.FILE_VIEWER.SUBTITLE(fileMessage),
    onClose: onClose
  }), /*#__PURE__*/_react.default.createElement(_FileViewerContent.default, {
    topInset: headerTopInset ?? basicTopInset,
    bottomInset: bottom,
    type: fileType,
    src: fileMessage.url,
    maxZoom: maxZoom,
    minZoom: minZoom
  }), /*#__PURE__*/_react.default.createElement(_FileViewerFooter.default, {
    bottomInset: bottom,
    deleteShown: canDelete,
    onPressDelete: onPressDeleteButton,
    onPressDownload: onPressDownloadButton
  }));
};
var _default = FileViewer;
exports.default = _default;
//# sourceMappingURL=index.js.map