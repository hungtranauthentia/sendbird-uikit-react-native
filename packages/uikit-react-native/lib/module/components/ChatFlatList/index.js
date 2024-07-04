function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { forwardRef, useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { NOOP, getMessageUniqId, useFreshCallback } from '@sendbird/uikit-utils';
import FlatListInternal from './FlatListInternal';
function isInvertedFlatListFixedVersion() {
  var _Platform$constants$r;
  if (((_Platform$constants$r = Platform.constants.reactNativeVersion) === null || _Platform$constants$r === void 0 ? void 0 : _Platform$constants$r.major) < 1) {
    var _Platform$constants$r2;
    if (((_Platform$constants$r2 = Platform.constants.reactNativeVersion) === null || _Platform$constants$r2 === void 0 ? void 0 : _Platform$constants$r2.minor) < 73) {
      var _Platform$constants$r3;
      if (((_Platform$constants$r3 = Platform.constants.reactNativeVersion) === null || _Platform$constants$r3 === void 0 ? void 0 : _Platform$constants$r3.patch) < 4) {
        return false;
      }
    }
  }
  return true;
}
let ANDROID_BUG_ALERT_SHOWED = Platform.OS !== 'android' || isInvertedFlatListFixedVersion();
const BOTTOM_DETECT_THRESHOLD = 50;
const UNREACHABLE_THRESHOLD = Number.MIN_SAFE_INTEGER;
const ChatFlatList = /*#__PURE__*/forwardRef(function ChatFlatList(_ref, ref) {
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
  } = useUIKitTheme();
  const contentOffsetY = useRef(0);
  const _onScroll = useFreshCallback(event => {
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
  return /*#__PURE__*/React.createElement(FlatListInternal, _extends({
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
    onScrollToIndexFailed: NOOP,
    onStartReached: onBottomReached,
    scrollEventThrottle: 16,
    onScroll: _onScroll,
    keyExtractor: getMessageUniqId,
    style: {
      flex: 1,
      ...StyleSheet.flatten(props.style)
    },
    maintainVisibleContentPosition: {
      minIndexForVisible: 0,
      autoscrollToTopThreshold: UNREACHABLE_THRESHOLD
    }
  }));
});
export default ChatFlatList;
//# sourceMappingURL=index.js.map