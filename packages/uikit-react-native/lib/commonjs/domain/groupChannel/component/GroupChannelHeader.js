"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _ChannelCover = _interopRequireDefault(require("../../../components/ChannelCover"));
var _useContext = require("../../../hooks/useContext");
var _types = require("../../../types");
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelHeader = _ref => {
  let {
    shouldHideRight,
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const {
    headerTitle,
    channel
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.Fragment);
  const {
    typingUsers
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.TypingIndicator);
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    HeaderComponent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const renderSubtitle = () => {
    const subtitle = STRINGS.LABELS.TYPING_INDICATOR_TYPINGS(typingUsers);
    if (!subtitle) return null;
    if (!sbOptions.uikit.groupChannel.channel.enableTypingIndicator) return null;
    if (!sbOptions.uikit.groupChannel.channel.typingIndicatorTypes.has(_types.TypingIndicatorType.Text)) return null;
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Header.Subtitle, {
      style: styles.subtitle
    }, subtitle);
  };
  const isHidden = shouldHideRight();
  return /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: styles.titleContainer
    }, /*#__PURE__*/_react.default.createElement(_ChannelCover.default, {
      channel: channel,
      size: 34,
      containerStyle: styles.avatarGroup
    }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        flexShrink: 1
      }
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Header.Title, {
      h2: true
    }, headerTitle), renderSubtitle())),
    left: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: isHidden ? null : /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'info'
    }),
    onPressRight: isHidden ? undefined : onPressHeaderRight
  });
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  titleContainer: {
    maxWidth: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarGroup: {
    marginRight: 8
  },
  subtitle: {
    marginTop: 2
  }
});
var _default = GroupChannelHeader;
exports.default = _default;
//# sourceMappingURL=GroupChannelHeader.js.map