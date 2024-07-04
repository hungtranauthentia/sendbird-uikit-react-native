import React, { useEffect, useState } from 'react';
import { millsToMSS } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Icon from '../../components/Icon';
import PressBox from '../../components/PressBox';
import ProgressBar from '../../components/ProgressBar';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import LoadingSpinner from '../LoadingSpinner';
import MessageContainer from './MessageContainer';
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
  } = useUIKitTheme();
  const [state, setState] = useState(() => {
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
  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, []);
  const uiColors = colors.ui.groupChannelMessage[variant];
  const remainingTime = state.duration - state.currentTime;
  return /*#__PURE__*/React.createElement(MessageContainer, props, /*#__PURE__*/React.createElement(Box, {
    style: styles.container,
    backgroundColor: uiColors.enabled.background
  }, /*#__PURE__*/React.createElement(PressBox, {
    onPress: () => onToggleVoiceMessage === null || onToggleVoiceMessage === void 0 ? void 0 : onToggleVoiceMessage(state, setState),
    onLongPress: onLongPress
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    current: state.currentTime,
    total: state.duration,
    style: {
      minWidth: 136,
      height: 44
    },
    trackColor: uiColors.enabled.voiceProgressTrack,
    overlay: /*#__PURE__*/React.createElement(Box, {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 12
    }, state.status === 'preparing' ? /*#__PURE__*/React.createElement(LoadingSpinner, {
      size: 24,
      color: uiColors.enabled.voiceSpinner
    }) : /*#__PURE__*/React.createElement(Icon, {
      size: 16,
      containerStyle: {
        backgroundColor: uiColors.enabled.voiceActionIconBackground,
        padding: 6,
        borderRadius: 16
      },
      icon: state.status === 'paused' ? 'play' : 'pause'
    }), /*#__PURE__*/React.createElement(Text, {
      body3: true,
      style: {
        lineHeight: undefined,
        marginLeft: 6,
        opacity: 0.88
      },
      color: uiColors.enabled.textVoicePlaytime
    }, millsToMSS(state.currentTime === 0 ? state.duration : remainingTime)))
  })), props.children));
};
const styles = createStyleSheet({
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
export default VoiceFileMessage;
//# sourceMappingURL=Message.file.voice.js.map