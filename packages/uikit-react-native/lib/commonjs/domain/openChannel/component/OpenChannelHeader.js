"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../..//hooks/useContext");
var _ChannelCover = _interopRequireDefault(require("../../../components/ChannelCover"));
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OpenChannelHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight,
    rightIconName
  } = _ref;
  const {
    headerTitle,
    channel
  } = (0, _react.useContext)(_moduleContext.OpenChannelContexts.Fragment);
  const {
    HeaderComponent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  return /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      flexDirection: 'row',
      alignItems: 'center',
      style: styles.titleContainer
    }, /*#__PURE__*/_react.default.createElement(_ChannelCover.default, {
      channel: channel,
      size: 34,
      containerStyle: styles.avatarGroup
    }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      flexShrink: 1
    }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Header.Title, {
      h2: true
    }, headerTitle), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Header.Subtitle, {
      style: styles.subtitle
    }, STRINGS.OPEN_CHANNEL.HEADER_SUBTITLE(channel)))),
    left: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: rightIconName
    }),
    onPressRight: onPressHeaderRight
  });
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  titleContainer: {
    maxWidth: '100%'
  },
  avatarGroup: {
    marginRight: 8
  },
  subtitle: {
    marginTop: 2
  }
});
var _default = /*#__PURE__*/_react.default.memo(OpenChannelHeader);
exports.default = _default;
//# sourceMappingURL=OpenChannelHeader.js.map