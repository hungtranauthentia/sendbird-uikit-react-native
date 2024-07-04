"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNativeZoomableView = require("@openspacelabs/react-native-zoomable-view");
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _SBUUtils = _interopRequireDefault(require("../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const FileViewerContent = _ref => {
  let {
    type,
    src,
    topInset = 0,
    bottomInset = 0,
    maxZoom = 4,
    minZoom = 1,
    onPress
  } = _ref;
  const [loading, setLoading] = (0, _react.useState)(true);
  const {
    defaultHeight
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    mediaService
  } = (0, _useContext.usePlatformService)();
  const {
    palette
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const source = {
    uri: src
  };
  const onLoadEnd = () => setLoading(false);
  const mediaViewer = (0, _uikitUtils.useIIFE)(() => {
    switch (type) {
      case 'image':
        {
          return /*#__PURE__*/_react.default.createElement(ZoomableImageView, {
            source: source,
            style: _reactNative.StyleSheet.absoluteFill,
            resizeMode: 'contain',
            onLoadEnd: onLoadEnd,
            zoomProps: {
              minZoom,
              maxZoom,
              onTouchEnd: onPress
            }
          });
        }
      case 'video':
      case 'audio':
        {
          return /*#__PURE__*/_react.default.createElement(mediaService.VideoComponent, {
            source: source,
            style: [_reactNative.StyleSheet.absoluteFill, {
              top: topInset,
              bottom: defaultHeight + bottomInset
            }],
            resizeMode: 'contain',
            onLoad: onLoadEnd
          });
        }
      default:
        {
          return null;
        }
    }
  });
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: styles.container
  }, mediaViewer, loading && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.LoadingSpinner, {
    style: {
      position: 'absolute'
    },
    size: 40,
    color: palette.primary300
  }));
};
const ZoomableImageView = _ref2 => {
  let {
    zoomProps,
    ...props
  } = _ref2;
  const {
    width,
    height
  } = (0, _reactNative.useWindowDimensions)();
  const imageSize = (0, _react.useRef)();
  const [contentSizeProps, setContentSizeProps] = (0, _react.useState)({
    contentWidth: width,
    contentHeight: height
  });
  (0, _react.useLayoutEffect)(() => {
    _SBUUtils.default.safeRun(async () => {
      if (props.source.uri) {
        const image = imageSize.current ?? (await _SBUUtils.default.getImageSize(props.source.uri));
        imageSize.current = image;
        const viewRatio = width / height;
        const imageRatio = image.width / image.height;
        const fitDirection = viewRatio > imageRatio ? 'height' : 'width';
        const ratio = fitDirection === 'height' ? height / image.height : width / image.width;
        const actualSize = {
          width: image.width * ratio,
          height: image.height * ratio
        };
        setContentSizeProps({
          contentWidth: actualSize.width,
          contentHeight: actualSize.height
        });
      }
    });
  }, [props.source.uri, width, height]);
  return /*#__PURE__*/_react.default.createElement(_reactNativeZoomableView.ReactNativeZoomableView, _extends({
    visualTouchFeedbackEnabled: false,
    style: {
      width,
      height
    },
    initialZoom: 1
  }, contentSizeProps, zoomProps), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, props));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
var _default = FileViewerContent;
exports.default = _default;
//# sourceMappingURL=FileViewerContent.js.map