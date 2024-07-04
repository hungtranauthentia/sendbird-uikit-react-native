"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Box = _interopRequireDefault(require("../Box"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _Image = _interopRequireDefault(require("../Image"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const useRetry = function (hasError) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  // NOTE: Glide(fast-image) will retry automatically on Android
  if (_reactNative.Platform.OS === 'android') return '';
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const retryCountRef = (0, _react.useRef)(1);
  const retryTimeoutRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    if (hasError) {
      const reloadReservation = () => {
        if (retryCountRef.current < retryCount) {
          retryTimeoutRef.current = setTimeout(() => {
            retryCountRef.current++;
            reloadReservation();
            forceUpdate();
          }, retryCountRef.current * 5000);
        }
      };
      return reloadReservation();
    } else {
      return clearTimeout(retryTimeoutRef.current);
    }
  }, [hasError]);
  return retryCountRef.current;
};
const ImageWithPlaceholder = props => {
  const {
    palette,
    select,
    colors
  } = (0, _useUIKitTheme.default)();
  const [imageNotFound, setImageNotFound] = (0, _react.useState)(false);
  const key = useRetry(imageNotFound);
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: [{
      overflow: 'hidden',
      width: props.width,
      height: props.height
    }, props.style],
    backgroundColor: select({
      dark: palette.background400,
      light: palette.background100
    })
  }, /*#__PURE__*/_react.default.createElement(_Image.default, {
    key: key,
    source: props.source,
    style: [_reactNative.StyleSheet.absoluteFill, imageNotFound && styles.hide],
    resizeMode: 'cover',
    resizeMethod: 'resize',
    onError: () => setImageNotFound(true),
    onLoad: () => setImageNotFound(false)
  }), imageNotFound && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    containerStyle: _reactNative.StyleSheet.absoluteFill,
    icon: 'thumbnail-none',
    size: 48,
    color: colors.onBackground02
  }));
};
const styles = (0, _createStyleSheet.default)({
  hide: {
    display: 'none'
  }
});
var _default = ImageWithPlaceholder;
exports.default = _default;
//# sourceMappingURL=index.js.map