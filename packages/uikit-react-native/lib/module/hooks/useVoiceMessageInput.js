import { useRef, useState } from 'react';
import { useAlert } from '@sendbird/uikit-react-native-foundation';
import { Logger, getVoiceMessageFileObject, matchesOneOf } from '@sendbird/uikit-utils';
import SBUUtils from '../libs/SBUUtils';
import { useLocalization, usePlatformService } from './useContext';
const useVoiceMessageInput = _ref => {
  let {
    onSend,
    onClose
  } = _ref;
  const {
    alert
  } = useAlert();
  const {
    STRINGS
  } = useLocalization();
  const {
    recorderService,
    playerService,
    fileService
  } = usePlatformService();
  const [status, setStatus] = useState('idle');
  const [recordingTime, setRecordingTime] = useState({
    currentTime: 0,
    minDuration: recorderService.options.minDuration,
    maxDuration: recorderService.options.maxDuration
  });
  const [playingTime, setPlayingTime] = useState({
    currentTime: 0,
    duration: 0
  });
  const recordingPath = useRef();
  const getVoiceMessageRecordingPath = () => {
    if (!recordingPath.current) throw new Error('No recording path');
    return recordingPath.current;
  };
  const setVoiceMessageRecordingPath = path => {
    recordingPath.current = path;
  };
  const clear = async () => {
    recordingPath.current = undefined;
    await playerService.reset();
    await recorderService.reset();
    setRecordingTime({
      currentTime: 0,
      minDuration: recorderService.options.minDuration,
      maxDuration: recorderService.options.maxDuration
    });
    setPlayingTime({
      currentTime: 0,
      duration: 0
    });
    setStatus('idle');
  };
  return {
    state: {
      status,
      recordingTime,
      playingTime
    },
    actions: {
      async cancel() {
        await clear();
      },
      async startRecording() {
        const granted = await recorderService.requestPermission();
        if (!granted) {
          await onClose();
          alert({
            title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
            message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_MICROPHONE, STRINGS.LABELS.PERMISSION_APP_NAME),
            buttons: [{
              text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
              onPress: () => SBUUtils.openSettings()
            }]
          });
          Logger.error('Failed to request permission for recorder');
          return;
        }
        if (matchesOneOf(status, ['idle'])) {
          // Before start recording, if player is not idle, reset it.
          if (playerService.state !== 'idle') {
            await playerService.reset();
          }
          const unsubscribeRecording = recorderService.addRecordingListener(_ref2 => {
            let {
              currentTime
            } = _ref2;
            setRecordingTime({
              currentTime,
              maxDuration: recorderService.options.maxDuration,
              minDuration: recorderService.options.minDuration
            });
            setPlayingTime(prev => ({
              ...prev,
              duration: currentTime
            }));
          });
          const unsubscribeState = recorderService.addStateListener(state => {
            switch (state) {
              case 'recording':
                setStatus('recording');
                break;
              case 'completed':
                setStatus('recording_completed');
                unsubscribeRecording();
                unsubscribeState();
                break;
            }
          });
          if (SBUUtils.isExpo()) {
            await recorderService.record();
            if (recorderService.uri) {
              setVoiceMessageRecordingPath({
                recordFilePath: recorderService.uri,
                uri: recorderService.uri
              });
            }
          } else {
            setVoiceMessageRecordingPath(fileService.createRecordFilePath(recorderService.options.extension));
            await recorderService.record(getVoiceMessageRecordingPath().recordFilePath);
          }
        }
      },
      async stopRecording() {
        if (matchesOneOf(status, ['recording'])) {
          await recorderService.stop();
        }
      },
      async playPlayer() {
        const granted = await playerService.requestPermission();
        if (!granted) {
          alert({
            title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
            message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
            buttons: [{
              text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
              onPress: () => SBUUtils.openSettings()
            }]
          });
          Logger.error('Failed to request permission for player');
          return;
        }
        if (matchesOneOf(status, ['recording_completed', 'playing_paused'])) {
          const unsubscribePlayback = playerService.addPlaybackListener(_ref3 => {
            let {
              currentTime,
              duration
            } = _ref3;
            setPlayingTime({
              currentTime,
              duration
            });
          });
          const unsubscribeState = playerService.addStateListener(state => {
            switch (state) {
              case 'playing':
                setStatus('playing');
                break;
              case 'paused':
                {
                  setStatus('playing_paused');
                  unsubscribeState();
                  unsubscribePlayback();
                  break;
                }
              case 'stopped':
                {
                  setStatus('playing_paused');
                  unsubscribeState();
                  unsubscribePlayback();
                  setPlayingTime(prev => ({
                    ...prev,
                    currentTime: 0
                  }));
                  break;
                }
            }
          });
          await playerService.play(getVoiceMessageRecordingPath().recordFilePath);
        }
      },
      async pausePlayer() {
        if (matchesOneOf(status, ['playing'])) {
          await playerService.pause();
        }
      },
      async send() {
        if (matchesOneOf(status, ['recording', 'recording_completed', 'playing', 'playing_paused']) && recordingPath.current) {
          const voiceFile = getVoiceMessageFileObject(recordingPath.current.uri, recorderService.options.extension);
          onSend(voiceFile, Math.floor(recordingTime.currentTime));
          await clear();
        }
      }
    }
  };
};
export default useVoiceMessageInput;
//# sourceMappingURL=useVoiceMessageInput.js.map