import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Avatar, Divider, Image, Modal, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { getReactionCount, truncatedCount } from '@sendbird/uikit-utils';
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
  } = useWindowDimensions();
  const {
    bottom,
    left,
    right
  } = useSafeAreaInsets();
  const {
    colors
  } = useUIKitTheme();
  const [tabIndex, setTabIndex] = useState(0);
  const scrollRef = useRef();
  const tabIndicatorValue = useRef([]);
  const tabIndicatorAnimated = useRef({
    x: new Animated.Value(0),
    width: new Animated.Value(0)
  }).current;
  const focusedWithLayoutCalculated = useRef(false);
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
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false
    };
    Animated.parallel([Animated.timing(tabIndicatorAnimated.x, {
      toValue: x,
      ...baseConfig
    }), Animated.timing(tabIndicatorAnimated.width, {
      toValue: width,
      ...baseConfig
    })]).start();
  };
  const layoutCalculated = () => {
    return tabIndicatorValue.current.length === reactions.length && tabIndicatorValue.current.every(Boolean);
  };
  useEffect(() => {
    if (!visible) {
      tabIndicatorValue.current = [];
      tabIndicatorAnimated.x = new Animated.Value(0);
      tabIndicatorAnimated.width = new Animated.Value(0);
      focusedWithLayoutCalculated.current = false;
    }
  }, [visible]);
  const renderTabs = () => {
    return /*#__PURE__*/React.createElement(Pressable, {
      style: styles.tabsWrapper
    }, reactions.map((reaction, index) => {
      const isFocused = (focusedReaction === null || focusedReaction === void 0 ? void 0 : focusedReaction.key) === reaction.key;
      const isLastItem = reactions.length - 1 === index;
      const emoji = emojiManager.allEmojiMap[reaction.key];
      return /*#__PURE__*/React.createElement(Pressable, {
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
      }, /*#__PURE__*/React.createElement(Image, {
        source: {
          uri: emoji.url
        },
        style: styles.tabEmoji
      }), /*#__PURE__*/React.createElement(Text, {
        button: true,
        color: isFocused ? color.selected.highlight : color.enabled.highlight
      }, truncatedCount(getReactionCount(reaction))));
    }), /*#__PURE__*/React.createElement(Animated.View, {
      style: [styles.tabIndicator, {
        left: tabIndicatorAnimated.x,
        width: tabIndicatorAnimated.width,
        backgroundColor: color.selected.highlight
      }]
    }));
  };
  const renderPage = () => {
    return /*#__PURE__*/React.createElement(React.Fragment, null, focusedReaction === null || focusedReaction === void 0 ? void 0 : focusedReaction.userIds.map(userId => {
      if (channel !== null && channel !== void 0 && channel.isGroupChannel()) {
        const user = channel.members.find(x => x.userId === userId);
        return /*#__PURE__*/React.createElement(Pressable, {
          key: userId,
          onPress: async () => {
            if (user) {
              await onClose();
              onPressUserProfile(user);
            }
          },
          style: styles.pageItem
        }, /*#__PURE__*/React.createElement(Avatar, {
          size: 36,
          uri: user === null || user === void 0 ? void 0 : user.profileUrl,
          containerStyle: styles.avatar
        }), /*#__PURE__*/React.createElement(Text, {
          subtitle2: true,
          style: {
            flex: 1
          }
        }, (user === null || user === void 0 ? void 0 : user.nickname) || STRINGS.LABELS.USER_NO_NAME));
      }
      return null;
    }));
  };
  return /*#__PURE__*/React.createElement(Modal, {
    type: 'slide-no-gesture',
    visible: Boolean(visible && channel && message),
    onClose: onClose,
    onDismiss: onDismiss,
    backgroundStyle: styles.modal
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      width,
      paddingBottom: bottom,
      backgroundColor: colors.ui.dialog.default.none.background
    }]
  }, /*#__PURE__*/React.createElement(ScrollView, {
    ref: scrollRef,
    horizontal: true,
    bounces: false,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: [containerSafeArea, styles.tabsContainer]
  }, renderTabs()), /*#__PURE__*/React.createElement(Divider, {
    style: {
      top: -1
    }
  }), /*#__PURE__*/React.createElement(ScrollView, {
    bounces: false,
    showsVerticalScrollIndicator: false,
    style: styles.pageContainer,
    contentContainerStyle: containerSafeArea
  }, renderPage())));
};
const styles = createStyleSheet({
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
export default ReactionUserListBottomSheet;
//# sourceMappingURL=ReactionUserListBottomSheet.js.map