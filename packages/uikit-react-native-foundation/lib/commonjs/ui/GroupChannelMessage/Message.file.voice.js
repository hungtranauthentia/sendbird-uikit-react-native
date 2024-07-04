"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _PressBox = _interopRequireDefault(require("../../components/PressBox"));
var _ProgressBar = _interopRequireDefault(require("../../components/ProgressBar"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _LoadingSpinner = _interopRequireDefault(require("../LoadingSpinner"));
var _MessageContainer = _interopRequireDefault(require("./MessageContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const VoiceFileMessage = props => {
  const {
    onLongPress,
    variant = 'incoming',
    onToggleVoiceMessage,
    message,
    durationMetaArrayKey = 'KEY_VOICE_MESSAGE_DURATION',
    onUnmount
  } = props;
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const [state, setState] = (0, _react.useState)(() => {
    var _meta$value;
    const meta = message.metaArrays.find(it => it.key === durationMetaArrayKey);
    const value = meta === null || meta === void 0 ? void 0 : (_meta$value = meta.value) === null || _meta$value === void 0 ? void 0 : _meta$value[0];
    const initialDuration = value ? parseInt(value, 10) : 0;
    return {
      status: 'paused',
      currentTime: 0,
      duration: initialDuration
    };
  });
  (0, _react.useEffect)(() => {
    return () => {
      onUnmount();
    };
  }, []);
  const uiColors = colors.ui.groupChannelMessage[variant];
  const remainingTime = state.duration - state.currentTime;
  return /*#__PURE__*/_react.default.createElement(_MessageContainer.default, props, /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: styles.container,
    backgroundColor: uiColors.enabled.background
  }, /*#__PURE__*/_react.default.createElement(_PressBox.default, {
    onPress: () => onToggleVoiceMessage === null || onToggleVoiceMessage === void 0 ? void 0 : onToggleVoiceMessage(state, setState),
    onLongPress: onLongPress
  }, /*#__PURE__*/_react.default.createElement(_ProgressBar.default, {
    current: state.currentTime,
    total: state.duration,
    style: {
      minWidth: 136,
      height: 44
    },
    trackColor: uiColors.enabled.voiceProgressTrack,
    overlay: /*#__PURE__*/_react.default.createElement(_Box.default, {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12
    }, state.status === 'preparing' ? /*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
      size: 24,
      color: uiColors.enabled.voiceSpinner
    }) : /*#__PURE__*/_react.default.createElement(_Icon.default, {
      size: 16,
      containerStyle: {
        backgroundColor: uiColors.enabled.voiceActionIconBackground,
        padding: 6,
        borderRadius: 16
      },
      icon: state.status === 'paused' ? 'play' : 'pause'
    }), /*#__PURE__*/_react.default.createElement(_Text.default, {
      body3: true,
      style: {
        lineHeight: undefined,
        marginLeft: 6,
        opacity: 0.88
      },
      color: uiColors.enabled.textVoicePlaytime
    }, (0, _uikitUtils.millsToMSS)(state.currentTime === 0 ? state.duration : remainingTime)))
  })), props.children));
};
const styles = (0, _createStyleSheet.default)({
  container: {
    borderRadius: 16,
    overflow: 'hidden'
  },
  image: {
    maxWidth: 240,
    width: 240,
    height: 160,
    borderRadius: 16,
    overflow: 'hidden'
  }
});
var _default = VoiceFileMessage;
exports.default = _default;
//# sourceMappingURL=Message.file.voice.js.map