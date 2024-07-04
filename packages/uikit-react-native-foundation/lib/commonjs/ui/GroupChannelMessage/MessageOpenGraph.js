"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _Box = _interopRequireDefault(require("../../components/Box"));
var _ImageWithPlaceholder = _interopRequireDefault(require("../../components/ImageWithPlaceholder"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MessageOpenGraph = _ref => {
  let {
    onPressURL,
    onLongPress,
    ogMetaData,
    variant
  } = _ref;
  const {
    palette,
    select,
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.groupChannelMessage[variant];
  return /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    activeOpacity: 0.85,
    onPress: () => typeof (ogMetaData === null || ogMetaData === void 0 ? void 0 : ogMetaData.url) === 'string' && (onPressURL === null || onPressURL === void 0 ? void 0 : onPressURL(ogMetaData.url)),
    onLongPress: onLongPress
  }, _ref2 => {
    let {
      pressed
    } = _ref2;
    return /*#__PURE__*/_react.default.createElement(_Box.default, {
      backgroundColor: pressed ? color.pressed.background : color.enabled.background
    }, !!ogMetaData.defaultImage && /*#__PURE__*/_react.default.createElement(_ImageWithPlaceholder.default, {
      style: styles.ogImage,
      source: {
        uri: ogMetaData.defaultImage.url
      }
    }), /*#__PURE__*/_react.default.createElement(_Box.default, {
      style: styles.ogContainer,
      backgroundColor: select({
        dark: palette.background400,
        light: palette.background100
      })
    }, /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 3,
      body2: true,
      color: colors.onBackground01,
      style: styles.ogTitle
    }, ogMetaData.title), !!ogMetaData.description && /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground01,
      style: styles.ogDesc
    }, ogMetaData.description), /*#__PURE__*/_react.default.createElement(_Text.default, {
      numberOfLines: 1,
      caption2: true,
      color: colors.onBackground02
    }, ogMetaData.url)));
  });
};
const styles = (0, _createStyleSheet.default)({
  ogContainer: {
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12
  },
  ogImage: {
    maxWidth: 240,
    width: 240,
    height: 136
  },
  ogUrl: {
    marginBottom: 4
  },
  ogTitle: {
    marginBottom: 4
  },
  ogDesc: {
    lineHeight: 14,
    marginBottom: 8
  }
});
var _default = MessageOpenGraph;
exports.default = _default;
//# sourceMappingURL=MessageOpenGraph.js.map