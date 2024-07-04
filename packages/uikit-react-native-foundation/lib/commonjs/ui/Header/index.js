"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
  } = (0, _useHeaderStyle.default)();
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const {
    left: paddingLeft,
    right: paddingRight
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const actualTitleAlign = titleAlign ?? defaultTitleAlign;
  const actualTopInset = clearStatusBarTopInset ? 0 : topInset;
  if (!title && !left && !right) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        paddingTop: actualTopInset,
        backgroundColor: colors.ui.header.nav.none.background
      }
    }, children);
  }
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      [statusBarTopInsetAs === 'padding' ? 'paddingTop' : 'marginTop']: actualTopInset,
      paddingLeft: paddingLeft + styles.container.paddingHorizontal,
      paddingRight: paddingRight + styles.container.paddingHorizontal,
      backgroundColor: colors.ui.header.nav.none.background,
      borderBottomColor: colors.ui.header.nav.none.borderBottom
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.header, {
      height: defaultHeight
    }]
  }, /*#__PURE__*/_react.default.createElement(LeftSide, {
    titleAlign: actualTitleAlign,
    left: left,
    onPressLeft: onPressLeft
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.title, clearTitleMargin && {
      marginHorizontal: 0
    }, {
      justifyContent: AlignMapper[actualTitleAlign]
    }]
  }, typeof title === 'string' ? /*#__PURE__*/_react.default.createElement(HeaderTitle, null, title) : title), /*#__PURE__*/_react.default.createElement(RightSide, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.left
    }, left && /*#__PURE__*/_react.default.createElement(HeaderButton, {
      onPress: onPressLeft
    }, left));
  }
  if (!left) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.left
  }, /*#__PURE__*/_react.default.createElement(HeaderButton, {
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
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.right
    }, right && /*#__PURE__*/_react.default.createElement(HeaderButton, {
      onPress: onPressRight
    }, right));
  }
  if (!right) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.right
  }, /*#__PURE__*/_react.default.createElement(HeaderButton, {
    onPress: onPressRight
  }, right));
};
const HeaderTitle = _ref4 => {
  let {
    children,
    style,
    ...props
  } = _ref4;
  return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, props, {
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
  } = (0, _useUIKitTheme.default)();
  return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({
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
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, _extends({
    style: styles.button
  }, props, {
    disabled: !onPress || disabled,
    onPress: e => onPress === null || onPress === void 0 ? void 0 : onPress(e),
    activeOpacity: 0.7
  }), (0, _uikitUtils.conditionChaining)([typeof children === 'string' || typeof children === 'number'], [/*#__PURE__*/_react.default.createElement(_Text.default, {
    button: true,
    numberOfLines: 1,
    color: color
  }, children), children]));
};
const styles = (0, _createStyleSheet.default)({
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
var _default = Object.assign(Header, {
  Button: HeaderButton,
  Title: HeaderTitle,
  Subtitle: HeaderSubtitle
});
exports.default = _default;
//# sourceMappingURL=index.js.map