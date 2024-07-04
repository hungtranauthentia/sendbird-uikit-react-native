import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Box, Icon, PressBox, ProgressBar, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { conditionChaining, millsToMMSS } from '@sendbird/uikit-utils';
import { useLocalization } from '../../hooks/useContext';
import useVoiceMessageInput from '../../hooks/useVoiceMessageInput';
const VoiceMessageInput = _ref => {
  let {
    onClose,
    onSend
  } = _ref;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const {
    actions,
    state
  } = useVoiceMessageInput({
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
        return /*#__PURE__*/React.createElement(Icon, {
          icon: 'recording',
          size: 20,
          color: uiColors.recording
        });
      case 'recording':
        return /*#__PURE__*/React.createElement(Icon, {
          icon: 'stop',
          size: 20,
          color: uiColors.actionIcon
        });
      case 'recording_completed':
      case 'playing_paused':
        return /*#__PURE__*/React.createElement(Icon, {
          icon: 'play',
          size: 20,
          color: uiColors.actionIcon
        });
      case 'playing':
        return /*#__PURE__*/React.createElement(Icon, {
          icon: 'pause',
          size: 20,
          color: uiColors.actionIcon
        });
    }
  };
  const isRecorderState = state.status === 'recording' || state.status === 'recording_completed';
  const lessThanMinimumDuration = state.recordingTime.currentTime < state.recordingTime.minDuration;
  const remainingTime = state.playingTime.duration - state.playingTime.currentTime;
  return /*#__PURE__*/React.createElement(Box, {
    backgroundColor: uiColors.background,
    paddingVertical: 24,
    paddingHorizontal: 16,
    style: styles.container
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    style: styles.progressBar,
    current: conditionChaining([state.status === 'recording', state.status === 'recording_completed'], [state.recordingTime.currentTime, 0, state.playingTime.currentTime]),
    total: (isRecorderState ? state.recordingTime.maxDuration : state.playingTime.duration) || 1,
    trackColor: uiColors.progressTrack,
    overlay: /*#__PURE__*/React.createElement(Box, {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingRight: 16
    }, /*#__PURE__*/React.createElement(RecordingLight, {
      visible: state.status === 'recording'
    }), /*#__PURE__*/React.createElement(Text, {
      caption1: true,
      style: {
        lineHeight: undefined,
        marginLeft: 6
      },
      color: uiColors.textTime
    }, millsToMMSS(isRecorderState ? state.recordingTime.currentTime : remainingTime)))
  }), /*#__PURE__*/React.createElement(Box, {
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row'
  }, /*#__PURE__*/React.createElement(CancelButton, {
    label: STRINGS.LABELS.VOICE_MESSAGE_INPUT_CANCEL,
    onPress: onPressCancel
  }), /*#__PURE__*/React.createElement(Box, {
    flex: 1
  }), /*#__PURE__*/React.createElement(SendButton, {
    disabled: state.status === 'idle' || lessThanMinimumDuration,
    onPress: onPressSend
  })), /*#__PURE__*/React.createElement(Box, {
    style: {
      position: 'absolute'
    },
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.5,
    onPress: onPressVoiceMessageAction
  }, /*#__PURE__*/React.createElement(Box, {
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
  } = useUIKitTheme();
  const value = useRef(new Animated.Value(0)).current;
  const animation = useRef(Animated.loop(Animated.sequence([Animated.timing(value, {
    toValue: 1,
    duration: 500,
    useNativeDriver: true
  }), Animated.timing(value, {
    toValue: 0,
    duration: 500,
    useNativeDriver: true
  })]))).current;
  useEffect(() => {
    if (props.visible) animation.start();
    return () => {
      animation.reset();
    };
  }, [props.visible]);
  if (!props.visible) return null;
  return /*#__PURE__*/React.createElement(Animated.View, {
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
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(PressBox, {
    activeOpacity: 0.8,
    onPress: props.onPress
  }, /*#__PURE__*/React.createElement(Box, {
    paddingHorizontal: 12,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(Text, {
    button: true,
    color: colors.ui.voiceMessageInput.default.active.textCancel,
    numberOfLines: 1
  }, props.label)));
};
const SendButton = props => {
  const {
    colors
  } = useUIKitTheme();
  const uiColors = colors.ui.voiceMessageInput.default[props.disabled ? 'inactive' : 'active'];
  return /*#__PURE__*/React.createElement(PressBox, {
    disabled: props.disabled,
    activeOpacity: 0.8,
    onPress: props.onPress
  }, /*#__PURE__*/React.createElement(Box, {
    backgroundColor: uiColors.sendIconBackground,
    padding: 7,
    borderRadius: 40
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'send',
    size: 20,
    color: uiColors.sendIcon
  })));
};
const styles = createStyleSheet({
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
export default VoiceMessageInput;
//# sourceMappingURL=VoiceMessageInput.js.map