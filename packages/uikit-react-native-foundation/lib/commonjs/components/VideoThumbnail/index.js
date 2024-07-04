"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VideoThumbnail = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Box = _interopRequireDefault(require("../Box"));
var _Icon = _interopRequireDefault(require("../Icon"));
var _ImageWithPlaceholder = _interopRequireDefault(require("../ImageWithPlaceholder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const VideoThumbnail = _ref => {
  let {
    fetchThumbnailFromVideoSource,
    style,
    source,
    videoSource,
    iconSize = 28
  } = _ref;
  const {
    palette,
    select
  } = (0, _useUIKitTheme.default)();
  const {
    thumbnail,
    loading
  } = useRetry(async () => {
    if ((0, _uikitUtils.isImage)(source ?? videoSource)) return {
      path: source ?? videoSource
    };
    return fetchThumbnailFromVideoSource(source ?? videoSource);
  });
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: style
  }, loading ? /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: _reactNative.StyleSheet.absoluteFill,
    backgroundColor: select({
      dark: palette.background400,
      light: palette.background100
    })
  }) : /*#__PURE__*/_react.default.createElement(_ImageWithPlaceholder.default, {
    source: {
      uri: thumbnail ?? 'invalid-image'
    },
    style: _reactNative.StyleSheet.absoluteFill
  }), (loading || thumbnail !== null) && iconSize > 0 && /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: _reactNative.StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    icon: 'play',
    size: iconSize,
    color: palette.onBackgroundLight02,
    containerStyle: [styles.playIcon, {
      backgroundColor: palette.onBackgroundDark01
    }]
  })));
};
exports.VideoThumbnail = VideoThumbnail;
const useRetry = function (fetch) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  const [state, setState] = (0, _react.useState)({
    thumbnail: null,
    loading: true
  });
  const retryCountRef = (0, _react.useRef)(0);
  const fetchThumbnail = (0, _react.useRef)(fetch);
  fetchThumbnail.current = fetch;
  (0, _react.useEffect)(() => {
    let _timeout;
    let _cancelled = false;
    if (!state.thumbnail) {
      const tryFetchThumbnail = timeout => {
        const retry = () => {
          retryCountRef.current++;
          tryFetchThumbnail(timeout + 5000);
        };
        const finish = path => {
          if (!_cancelled) setState({
            loading: false,
            thumbnail: path
          });
        };
        if (retryCountRef.current < retryCount) {
          _timeout = setTimeout(() => {
            fetchThumbnail.current().then(result => {
              if (result === null) retry();else finish(result.path);
            }).catch(() => retry());
          }, timeout);
        } else {
          finish(null);
        }
      };
      tryFetchThumbnail(0);
    }
    return () => {
      _cancelled = true;
      clearTimeout(_timeout);
    };
  }, [state.thumbnail]);
  return state;
};
const styles = (0, _createStyleSheet.default)({
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
//# sourceMappingURL=index.js.map