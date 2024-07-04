"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _FlatListInternal = _interopRequireDefault(require("./FlatListInternal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function isInvertedFlatListFixedVersion() {
  var _Platform$constants$r;
  if (((_Platform$constants$r = _reactNative.Platform.constants.reactNativeVersion) === null || _Platform$constants$r === void 0 ? void 0 : _Platform$constants$r.major) < 1) {
    var _Platform$constants$r2;
    if (((_Platform$constants$r2 = _reactNative.Platform.constants.reactNativeVersion) === null || _Platform$constants$r2 === void 0 ? void 0 : _Platform$constants$r2.minor) < 73) {
      var _Platform$constants$r3;
      if (((_Platform$constants$r3 = _reactNative.Platform.constants.reactNativeVersion) === null || _Platform$constants$r3 === void 0 ? void 0 : _Platform$constants$r3.patch) < 4) {
        return false;
      }
    }
  }
  return true;
}
let ANDROID_BUG_ALERT_SHOWED = _reactNative.Platform.OS !== 'android' || isInvertedFlatListFixedVersion();
const BOTTOM_DETECT_THRESHOLD = 50;
const UNREACHABLE_THRESHOLD = Number.MIN_SAFE_INTEGER;
const ChatFlatList = /*#__PURE__*/(0, _react.forwardRef)(function ChatFlatList(_ref, ref) {
  var _props$data;
  let {
    onTopReached,
    onBottomReached,
    onScrolledAwayFromBottom,
    onScroll,
    ...props
  } = _ref;
  const {
    select
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const contentOffsetY = (0, _react.useRef)(0);
  const _onScroll = (0, _uikitUtils.useFreshCallback)(event => {
    onScroll === null || onScroll === void 0 ? void 0 : onScroll(event);
    const {
      contentOffset
    } = event.nativeEvent;
    const prevOffsetY = contentOffsetY.current;
    const currOffsetY = contentOffset.y;
    if (BOTTOM_DETECT_THRESHOLD < prevOffsetY && currOffsetY <= BOTTOM_DETECT_THRESHOLD) {
      onScrolledAwayFromBottom(false);
    } else if (BOTTOM_DETECT_THRESHOLD < currOffsetY && prevOffsetY <= BOTTOM_DETECT_THRESHOLD) {
      onScrolledAwayFromBottom(true);
    }
    contentOffsetY.current = contentOffset.y;
  });
  if (__DEV__ && !ANDROID_BUG_ALERT_SHOWED) {
    ANDROID_BUG_ALERT_SHOWED = true;
    // eslint-disable-next-line no-console
    console.warn('UIKit Warning: The Inverted FlatList had performance issues on Android.\n' + 'This issue was fixed in 0.72.4+\n' + 'Please refer to the link: https://github.com/facebook/react-native/issues/30034');
  }
  return /*#__PURE__*/_react.default.createElement(_FlatListInternal.default, _extends({
    bounces: false,
    removeClippedSubviews: true,
    keyboardDismissMode: 'on-drag',
    keyboardShouldPersistTaps: 'handled',
    indicatorStyle: select({
      light: 'black',
      dark: 'white'
    })
  }, props, {
    // FIXME: inverted list of ListEmptyComponent is reversed {@link https://github.com/facebook/react-native/issues/21196#issuecomment-836937743}
    inverted: Boolean((_props$data = props.data) === null || _props$data === void 0 ? void 0 : _props$data.length),
    ref: ref,
    onEndReached: onTopReached,
    onScrollToIndexFailed: _uikitUtils.NOOP,
    onStartReached: onBottomReached,
    scrollEventThrottle: 16,
    onScroll: _onScroll,
    keyExtractor: _uikitUtils.getMessageUniqId,
    style: {
      flex: 1,
      ..._reactNative.StyleSheet.flatten(props.style)
    },
    maintainVisibleContentPosition: {
      minIndexForVisible: 0,
      autoscrollToTopThreshold: UNREACHABLE_THRESHOLD
    }
  }));
});
var _default = ChatFlatList;
exports.default = _default;
//# sourceMappingURL=index.js.map