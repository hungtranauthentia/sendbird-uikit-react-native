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
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ReactionUserListBottomSheet = _ref => {
  let {
    visible,
    onClose,
    onDismiss,
    reactionCtx,
    chatCtx,
    localizationCtx,
    onPressUserProfile
  } = _ref;
  const {
    width
  } = (0, _reactNative.useWindowDimensions)();
  const {
    bottom,
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const [tabIndex, setTabIndex] = (0, _react.useState)(0);
  const scrollRef = (0, _react.useRef)();
  const tabIndicatorValue = (0, _react.useRef)([]);
  const tabIndicatorAnimated = (0, _react.useRef)({
    x: new _reactNative.Animated.Value(0),
    width: new _reactNative.Animated.Value(0)
  }).current;
  const focusedWithLayoutCalculated = (0, _react.useRef)(false);
  const {
    emojiManager
  } = chatCtx;
  const {
    channel,
    message,
    focusIndex
  } = reactionCtx;
  const {
    STRINGS
  } = localizationCtx;
  const color = colors.ui.reaction.default;
  const reactions = (message === null || message === void 0 ? void 0 : message.reactions) ?? [];
  const focusedReaction = reactions[tabIndex];
  const containerSafeArea = {
    paddingLeft: left + styles.layout.paddingHorizontal,
    paddingRight: right + styles.layout.paddingHorizontal
  };
  const focusTab = function (index) {
    let animated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const indicatorValue = tabIndicatorValue.current[index];
    if (indicatorValue) {
      var _scrollRef$current;
      setTabIndex(index);
      animateTabIndicator(indicatorValue.x, indicatorValue.width, animated);
      (_scrollRef$current = scrollRef.current) === null || _scrollRef$current === void 0 ? void 0 : _scrollRef$current.scrollTo({
        x: indicatorValue.x,
        animated
      });
    }
  };
  const animateTabIndicator = function (x, width) {
    let animated = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    const baseConfig = {
      duration: animated ? 300 : 0,
      easing: _reactNative.Easing.inOut(_reactNative.Easing.ease),
      useNativeDriver: false
    };
    _reactNative.Animated.parallel([_reactNative.Animated.timing(tabIndicatorAnimated.x, {
      toValue: x,
      ...baseConfig
    }), _reactNative.Animated.timing(tabIndicatorAnimated.width, {
      toValue: width,
      ...baseConfig
    })]).start();
  };
  const layoutCalculated = () => {
    return tabIndicatorValue.current.length === reactions.length && tabIndicatorValue.current.every(Boolean);
  };
  (0, _react.useEffect)(() => {
    if (!visible) {
      tabIndicatorValue.current = [];
      tabIndicatorAnimated.x = new _reactNative.Animated.Value(0);
      tabIndicatorAnimated.width = new _reactNative.Animated.Value(0);
      focusedWithLayoutCalculated.current = false;
    }
  }, [visible]);
  const renderTabs = () => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
      style: styles.tabsWrapper
    }, reactions.map((reaction, index) => {
      const isFocused = (focusedReaction === null || focusedReaction === void 0 ? void 0 : focusedReaction.key) === reaction.key;
      const isLastItem = reactions.length - 1 === index;
      const emoji = emojiManager.allEmojiMap[reaction.key];
      return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
        key: reaction.key,
        style: [styles.tabItem, isLastItem && {
          marginRight: styles.layout.marginRight
        }],
        onPress: () => focusTab(index),
        onLayout: e => {
          tabIndicatorValue.current[index] = e.nativeEvent.layout;
          if (layoutCalculated()) {
            if (focusedWithLayoutCalculated.current) {
              focusTab(tabIndex, false);
            } else {
              focusedWithLayoutCalculated.current = true;
              focusTab(focusIndex);
            }
          }
        }
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Image, {
        source: {
          uri: emoji.url
        },
        style: styles.tabEmoji
      }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
        button: true,
        color: isFocused ? color.selected.highlight : color.enabled.highlight
      }, (0, _uikitUtils.truncatedCount)((0, _uikitUtils.getReactionCount)(reaction))));
    }), /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
      style: [styles.tabIndicator, {
        left: tabIndicatorAnimated.x,
        width: tabIndicatorAnimated.width,
        backgroundColor: color.selected.highlight
      }]
    }));
  };
  const renderPage = () => {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, focusedReaction === null || focusedReaction === void 0 ? void 0 : focusedReaction.userIds.map(userId => {
      if (channel !== null && channel !== void 0 && channel.isGroupChannel()) {
        const user = channel.members.find(x => x.userId === userId);
        return /*#__PURE__*/_react.default.createElement(_reactNative.Pressable, {
          key: userId,
          onPress: async () => {
            if (user) {
              await onClose();
              onPressUserProfile(user);
            }
          },
          style: styles.pageItem
        }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Avatar, {
          size: 36,
          uri: user === null || user === void 0 ? void 0 : user.profileUrl,
          containerStyle: styles.avatar
        }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
          subtitle2: true,
          style: {
            flex: 1
          }
        }, (user === null || user === void 0 ? void 0 : user.nickname) || STRINGS.LABELS.USER_NO_NAME));
      }
      return null;
    }));
  };
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Modal, {
    type: 'slide-no-gesture',
    visible: Boolean(visible && channel && message),
    onClose: onClose,
    onDismiss: onDismiss,
    backgroundStyle: styles.modal
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      width,
      paddingBottom: bottom,
      backgroundColor: colors.ui.dialog.default.none.background
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    ref: scrollRef,
    horizontal: true,
    bounces: false,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: [containerSafeArea, styles.tabsContainer]
  }, renderTabs()), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Divider, {
    style: {
      top: -1
    }
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    bounces: false,
    showsVerticalScrollIndicator: false,
    style: styles.pageContainer,
    contentContainerStyle: containerSafeArea
  }, renderPage())));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  layout: {
    paddingHorizontal: 16,
    marginRight: 0
  },
  container: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingTop: 16,
    alignItems: 'center'
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  tabsContainer: {
    flexGrow: 1
  },
  tabsWrapper: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    height: 44
  },
  tabItem: {
    marginRight: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabEmoji: {
    width: 28,
    height: 28,
    marginRight: 4
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3
  },
  pageContainer: {
    height: 216,
    width: '100%'
  },
  pageItem: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16
  }
});
var _default = ReactionUserListBottomSheet;
exports.default = _default;
//# sourceMappingURL=ReactionUserListBottomSheet.js.map