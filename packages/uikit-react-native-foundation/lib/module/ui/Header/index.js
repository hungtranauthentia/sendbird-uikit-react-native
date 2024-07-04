function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { conditionChaining } from '@sendbird/uikit-utils';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
const AlignMapper = {
  left: 'flex-start',
  center: 'center',
  right: 'flex-end'
};
const Header = _ref => {
  let {
    children,
    titleAlign,
    title = null,
    left = null,
    right = null,
    onPressLeft,
    onPressRight,
    clearTitleMargin = false,
    clearStatusBarTopInset = false,
    statusBarTopInsetAs = 'padding'
  } = _ref;
  const {
    topInset,
    defaultTitleAlign,
    defaultHeight
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const {
    left: paddingLeft,
    right: paddingRight
  } = useSafeAreaInsets();
  const actualTitleAlign = titleAlign ?? defaultTitleAlign;
  const actualTopInset = clearStatusBarTopInset ? 0 : topInset;
  if (!title && !left && !right) {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        paddingTop: actualTopInset,
        backgroundColor: colors.ui.header.nav.none.background
      }
    }, children);
  }
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      [statusBarTopInsetAs === 'padding' ? 'paddingTop' : 'marginTop']: actualTopInset,
      paddingLeft: paddingLeft + styles.container.paddingHorizontal,
      paddingRight: paddingRight + styles.container.paddingHorizontal,
      backgroundColor: colors.ui.header.nav.none.background,
      borderBottomColor: colors.ui.header.nav.none.borderBottom
    }]
  }, /*#__PURE__*/React.createElement(View, {
    style: [styles.header, {
      height: defaultHeight
    }]
  }, /*#__PURE__*/React.createElement(LeftSide, {
    titleAlign: actualTitleAlign,
    left: left,
    onPressLeft: onPressLeft
  }), /*#__PURE__*/React.createElement(View, {
    style: [styles.title, clearTitleMargin && {
      marginHorizontal: 0
    }, {
      justifyContent: AlignMapper[actualTitleAlign]
    }]
  }, typeof title === 'string' ? /*#__PURE__*/React.createElement(HeaderTitle, null, title) : title), /*#__PURE__*/React.createElement(RightSide, {
    titleAlign: actualTitleAlign,
    right: right,
    onPressRight: onPressRight
  })), children);
};
const LeftSide = _ref2 => {
  let {
    titleAlign,
    onPressLeft,
    left
  } = _ref2;
  if (titleAlign === 'center') {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.left
    }, left && /*#__PURE__*/React.createElement(HeaderButton, {
      onPress: onPressLeft
    }, left));
  }
  if (!left) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.left
  }, /*#__PURE__*/React.createElement(HeaderButton, {
    onPress: onPressLeft
  }, left));
};
const RightSide = _ref3 => {
  let {
    titleAlign,
    onPressRight,
    right
  } = _ref3;
  if (titleAlign === 'center') {
    return /*#__PURE__*/React.createElement(View, {
      style: styles.right
    }, right && /*#__PURE__*/React.createElement(HeaderButton, {
      onPress: onPressRight
    }, right));
  }
  if (!right) return null;
  return /*#__PURE__*/React.createElement(View, {
    style: styles.right
  }, /*#__PURE__*/React.createElement(HeaderButton, {
    onPress: onPressRight
  }, right));
};
const HeaderTitle = _ref4 => {
  let {
    children,
    style,
    ...props
  } = _ref4;
  return /*#__PURE__*/React.createElement(Text, _extends({}, props, {
    h1: true,
    numberOfLines: 1,
    style: style
  }), children);
};
const HeaderSubtitle = _ref5 => {
  let {
    children,
    style,
    ...props
  } = _ref5;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Text, _extends({
    color: colors.onBackground03
  }, props, {
    caption2: true,
    numberOfLines: 1,
    style: style
  }), children);
};
const HeaderButton = _ref6 => {
  let {
    children,
    disabled,
    onPress,
    color,
    ...props
  } = _ref6;
  return /*#__PURE__*/React.createElement(TouchableOpacity, _extends({
    style: styles.button
  }, props, {
    disabled: !onPress || disabled,
    onPress: e => onPress === null || onPress === void 0 ? void 0 : onPress(e),
    activeOpacity: 0.7
  }), conditionChaining([typeof children === 'string' || typeof children === 'number'], [/*#__PURE__*/React.createElement(Text, {
    button: true,
    numberOfLines: 1,
    color: color
  }, children), children]));
};
const styles = createStyleSheet({
  container: {
    paddingHorizontal: 12,
    borderBottomWidth: 1
  },
  header: {
    flexDirection: 'row'
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 12
  },
  left: {
    height: '100%',
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12
  },
  right: {
    height: '100%',
    minWidth: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 12
  },
  button: {
    padding: 4
  }
});
export default Object.assign(Header, {
  Button: HeaderButton,
  Title: HeaderTitle,
  Subtitle: HeaderSubtitle
});
//# sourceMappingURL=index.js.map