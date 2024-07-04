"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _ImageWithPlaceholder = _interopRequireDefault(require("../../components/ImageWithPlaceholder"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _RegexText = _interopRequireDefault(require("../../components/RegexText"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenGraphUserMessage = props => {
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const {
    onPress,
    onLongPress,
    onPressURL,
    ...rest
  } = props;
  const color = colors.ui.openChannelMessage.default;
  return /*#__PURE__*/_react.default.createElement(_Box.default, null, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: onPress,
    onLongPress: onLongPress
  }, _ref => {
    var _props$strings;
    let {
      pressed
    } = _ref;
    return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, _extends({
      pressed: pressed
    }, rest), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsg
    }, /*#__PURE__*/_react.default.createElement(_RegexText.default, {
      body3: true,
      color: color.enabled.textMsg,
      patterns: [{
        regex: _uikitUtils.urlRegexRough,
        replacer(_ref2) {
          let {
            match,
            parentProps,
            keyPrefix,
            index
          } = _ref2;
          return /*#__PURE__*/_react.default.createElement(_Text.default, _extends({}, parentProps, {
            key: `${keyPrefix}-${index}`,
            onPress: () => onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(match),
            onLongPress: onLongPress,
            color: colors.primary,
            style: parentProps === null || parentProps === void 0 ? void 0 : parentProps.style
          }), match);
        }
      }]
    }, props.message.message), Boolean(props.message.updatedAt) && /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      color: color.enabled.textMsgPostfix
    }, ((_props$strings = props.strings) === null || _props$strings === void 0 ? void 0 : _props$strings.edited) ?? ' (edited)')));
  }), props.message.ogMetaData && /*#__PURE__*/_react.default.createElement(_MessageContainer.default, _extends({}, rest, {
    grouped: true
  }), /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    style: styles.ogContainer,
    onPress: () => {
      var _props$message$ogMeta;
      return ((_props$message$ogMeta = props.message.ogMetaData) === null || _props$message$ogMeta === void 0 ? void 0 : _props$message$ogMeta.url) && (onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(props.message.ogMetaData.url));
    },
    onLongPress: onLongPress
  }, _ref3 => {
    let {
      pressed
    } = _ref3;
    return props.message.ogMetaData && /*#__PURE__*/_react.default.createElement(_Box.default, {
      padding: 8,
      borderRadius: 8,
      style: styles.ogContainer,
      backgroundColor: pressed ? color.pressed.bubbleBackground : color.enabled.bubbleBackground
    }, /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground02,
      style: styles.ogUrl
    }, props.message.ogMetaData.url), /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 2,
      body2: true,
      color: colors.primary,
      style: styles.ogTitle
    }, props.message.ogMetaData.title), Boolean(props.message.ogMetaData.description) && /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 2,
      caption2: true,
      color: colors.onBackground01
    }, props.message.ogMetaData.description), !!props.message.ogMetaData.defaultImage && /*#__PURE__*/_react.default.createElement(_ImageWithPlaceholder.default, {
      style: styles.ogImage,
      source: {
        uri: props.message.ogMetaData.defaultImage.url
      }
    }));
  })));
};
const styles = (0, _createStyleSheet.default)({
  ogContainer: {
    maxWidth: 296
  },
  ogUrl: {
    marginBottom: 4
  },
  ogTitle: {
    marginBottom: 8
  },
  ogImage: {
    width: '100%',
    height: 156,
    marginTop: 12
  }
});
var _default = OpenGraphUserMessage;
exports.default = _default;
//# sourceMappingURL=Message.user.og.js.map