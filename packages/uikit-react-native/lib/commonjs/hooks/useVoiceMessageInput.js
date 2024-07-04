"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _SBUUtils = _interopRequireDefault(require("../libs/SBUUtils"));
var _useContext = require("./useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const useVoiceMessageInput = _ref => {
  let {
    onSend,
    onClose
  } = _ref;
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    recorderService,
    playerService,
    fileService
  } = (0, _useContext.usePlatformService)();
  const [status, setStatus] = (0, _react.useState)('idle');
  const [recordingTime, setRecordingTime] = (0, _react.useState)({
    currentTime: 0,
    minDuration: recorderService.options.minDuration,
    maxDuration: recorderService.options.maxDuration
  });
  const [playingTime, setPlayingTime] = (0, _react.useState)({
    currentTime: 0,
    duration: 0
  });
  const recordingPath = (0, _react.useRef)();
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
              onPress: () => _SBUUtils.default.openSettings()
            }]
          });
          _uikitUtils.Logger.error('Failed to request permission for recorder');
          return;
        }
        if ((0, _uikitUtils.matchesOneOf)(status, ['idle'])) {
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
          if (_SBUUtils.default.isExpo()) {
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
        if ((0, _uikitUtils.matchesOneOf)(status, ['recording'])) {
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
              onPress: () => _SBUUtils.default.openSettings()
            }]
          });
          _uikitUtils.Logger.error('Failed to request permission for player');
          return;
        }
        if ((0, _uikitUtils.matchesOneOf)(status, ['recording_completed', 'playing_paused'])) {
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
        if ((0, _uikitUtils.matchesOneOf)(status, ['playing'])) {
          await playerService.pause();
        }
      },
      async send() {
        if ((0, _uikitUtils.matchesOneOf)(status, ['recording', 'recording_completed', 'playing', 'playing_paused']) && recordingPath.current) {
          const voiceFile = (0, _uikitUtils.getVoiceMessageFileObject)(recordingPath.current.uri, recorderService.options.extension);
          onSend(voiceFile, Math.floor(recordingTime.currentTime));
          await clear();
        }
      }
    }
  };
};
var _default = useVoiceMessageInput;
exports.default = _default;
//# sourceMappingURL=useVoiceMessageInput.js.map