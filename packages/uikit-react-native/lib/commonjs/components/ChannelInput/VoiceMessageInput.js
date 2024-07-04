"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../../hooks/useContext");
var _useVoiceMessageInput = _interopRequireDefault(require("../../hooks/useVoiceMessageInput"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const VoiceMessageInput = _ref => {
  let {
    onClose,
    onSend
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    actions,
    state
  } = (0, _useVoiceMessageInput.default)({
    onSend: (file, duration) => onSend({
      file,
      duration
    }),
    onClose
  });
  const uiColors = colors.ui.voiceMessageInput.default[state.status !== 'idle' ? 'active' : 'inactive'];
  const onPressCancel = async () => {
    actions.cancel();
    onClose();
  };
  const onPressSend = async () => {
    actions.send();
    onClose();
  };
  const onPressVoiceMessageAction = () => {
    switch (state.status) {
      case 'idle':
        actions.startRecording();
        break;
      case 'recording':
        if (lessThanMinimumDuration) {
          actions.cancel();
        } else {
          actions.stopRecording();
        }
        break;
      case 'recording_completed':
      case 'playing_paused':
        actions.playPlayer();
        break;
      case 'playing':
        actions.pausePlayer();
        break;
    }
  };
  const renderActionIcon = () => {
    switch (state.status) {
      case 'idle':
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
          icon: 'recording',
          size: 20,
          color: uiColors.recording
        });
      case 'recording':
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
          icon: 'stop',
          size: 20,
          color: uiColors.actionIcon
        });
      case 'recording_completed':
      case 'playing_paused':
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
          icon: 'play',
          size: 20,
          color: uiColors.actionIcon
        });
      case 'playing':
        return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
          icon: 'pause',
          size: 20,
          color: uiColors.actionIcon
        });
    }
  };
  const isRecorderState = state.status === 'recording' || state.status === 'recording_completed';
  const lessThanMinimumDuration = state.recordingTime.currentTime < state.recordingTime.minDuration;
  const remainingTime = state.playingTime.duration - state.playingTime.currentTime;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    backgroundColor: uiColors.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ProgressBar, {
    style: styles.progressBar,
    current: (0, _uikitUtils.conditionChaining)([state.status === 'recording', state.status === 'recording_completed'], [state.recordingTime.currentTime, 0, state.playingTime.currentTime]),
    total: (isRecorderState ? state.recordingTime.maxDuration : state.playingTime.duration) || 1,
    trackColor: uiColors.progressTrack,
    overlay: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 16
    }, /*#__PURE__*/_react.default.createElement(RecordingLight, {
      visible: state.status === 'recording'
    }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
      caption1: true,
      style: {
        lineHeight: undefined,
        marginLeft: 6
      },
      color: uiColors.textTime
    }, (0, _uikitUtils.millsToMMSS)(isRecorderState ? state.recordingTime.currentTime : remainingTime)))
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flexDirection: 'row'
  }, /*#__PURE__*/_react.default.createElement(CancelButton, {
    label: STRINGS.LABELS.VOICE_MESSAGE_INPUT_CANCEL,
    onPress: onPressCancel
  }), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    flex: 1
  }), /*#__PURE__*/_react.default.createElement(SendButton, {
    disabled: state.status === 'idle' || lessThanMinimumDuration,
    onPress: onPressSend
  })), /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    style: {
      position: 'absolute'
    },
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    activeOpacity: 0.5,
    onPress: onPressVoiceMessageAction
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: uiColors.actionIconBackground
  }, renderActionIcon())))));
};
const RecordingLight = props => {
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const value = (0, _react.useRef)(new _reactNative.Animated.Value(0)).current;
  const animation = (0, _react.useRef)(_reactNative.Animated.loop(_reactNative.Animated.sequence([_reactNative.Animated.timing(value, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true
  }), _reactNative.Animated.timing(value, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true
  })]))).current;
  (0, _react.useEffect)(() => {
    if (props.visible) animation.start();
    return () => {
      animation.reset();
    };
  }, [props.visible]);
  if (!props.visible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.Animated.View, {
    style: {
      width: 12,
      height: 12,
      borderRadius: 6,
      opacity: value,
      backgroundColor: colors.ui.voiceMessageInput.default.active.recording
    }
  });
};
const CancelButton = props => {
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    activeOpacity: 0.8,
    onPress: props.onPress
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    paddingHorizontal: 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    button: true,
    color: colors.ui.voiceMessageInput.default.active.textCancel,
    numberOfLines: 1
  }, props.label)));
};
const SendButton = props => {
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const uiColors = colors.ui.voiceMessageInput.default[props.disabled ? 'inactive' : 'active'];
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
    disabled: props.disabled,
    activeOpacity: 0.8,
    onPress: props.onPress
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
    backgroundColor: uiColors.sendIconBackground,
    padding: 7,
    borderRadius: 40
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    icon: 'send',
    size: 20,
    color: uiColors.sendIcon
  })));
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  container: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  },
  progressBar: {
    height: 36,
    marginBottom: 16,
    borderRadius: 18
  }
});
var _default = VoiceMessageInput;
exports.default = _default;
//# sourceMappingURL=VoiceMessageInput.js.map