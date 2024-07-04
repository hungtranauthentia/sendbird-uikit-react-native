"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _Divider = _interopRequireDefault(require("../../components/Divider"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _Avatar = _interopRequireDefault(require("../Avatar"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ProfileCard = _ref => {
  let {
    uri,
    username,
    bodyLabel,
    body,
    button,
    containerStyle
  } = _ref;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.profileCard.default.none;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      backgroundColor: color.background
    }, containerStyle]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.profileContainer
  }, /*#__PURE__*/_react.default.createElement(_Avatar.default, {
    uri: uri,
    size: 80,
    containerStyle: styles.profileAvatar
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    h1: true,
    color: color.textUsername,
    numberOfLines: 1
  }, username)), button && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.messageButtonArea
  }, button), /*#__PURE__*/_react.default.createElement(_Divider.default, {
    space: 16
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.profileInfoContainer
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    body2: true,
    color: color.textBodyLabel,
    style: styles.profileInfoBodyLabel
  }, bodyLabel), /*#__PURE__*/_react.default.createElement(_Text.default, {
    body3: true,
    numberOfLines: 1,
    color: color.textBody
  }, body)));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    paddingTop: 32,
    width: '100%'
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24
  },
  profileAvatar: {
    marginBottom: 8
  },
  profileInfoContainer: {
    padding: 16
  },
  profileInfoBodyLabel: {
    marginBottom: 4
  },
  messageButtonArea: {
    marginHorizontal: 24,
    marginBottom: 24
  }
});
var _default = ProfileCard;
exports.default = _default;
//# sourceMappingURL=index.js.map