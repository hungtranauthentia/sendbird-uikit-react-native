function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { Platform } from 'react-native';
import { matchesOneOf, sleep } from '@sendbird/uikit-utils';
import VoiceMessageConfig from '../libs/VoiceMessageConfig';
import nativePermissionGranted from '../utils/nativePermissionGranted';
const createNativeRecorderService = _ref => {
  let {
    audioRecorderModule,
    permissionModule
  } = _ref;
  const module = new audioRecorderModule.default();
  class VoiceRecorder {
    constructor() {
      _defineProperty(this, "uri", undefined);
      _defineProperty(this, "state", 'idle');
      _defineProperty(this, "options", {
        minDuration: VoiceMessageConfig.DEFAULT.RECORDER.MIN_DURATION,
        maxDuration: VoiceMessageConfig.DEFAULT.RECORDER.MAX_DURATION,
        extension: VoiceMessageConfig.DEFAULT.RECORDER.EXTENSION
      });
      // NOTE: In Android, even when startRecorder() is awaited, if stop() is executed immediately afterward, an error occurs
      _defineProperty(this, "_recordStartedAt", 0);
      _defineProperty(this, "_getRecorderStopSafeBuffer", () => {
        const minWaitingTime = 500;
        const elapsedTime = Date.now() - this._recordStartedAt;
        if (elapsedTime > minWaitingTime) return 0;else return minWaitingTime - elapsedTime;
      });
      _defineProperty(this, "recordingSubscribers", new Set());
      _defineProperty(this, "stateSubscribers", new Set());
      _defineProperty(this, "audioSettings", {
        sampleRate: VoiceMessageConfig.DEFAULT.RECORDER.SAMPLE_RATE,
        bitRate: VoiceMessageConfig.DEFAULT.RECORDER.BIT_RATE,
        audioChannels: VoiceMessageConfig.DEFAULT.RECORDER.CHANNELS
        // encoding: mpeg4_aac
      });
      _defineProperty(this, "audioOptions", Platform.select({
        android: {
          AudioEncodingBitRateAndroid: this.audioSettings.bitRate,
          AudioChannelsAndroid: this.audioSettings.audioChannels,
          AudioSamplingRateAndroid: this.audioSettings.sampleRate,
          AudioEncoderAndroid: audioRecorderModule.AudioEncoderAndroidType.AAC,
          OutputFormatAndroid: audioRecorderModule.OutputFormatAndroidType.MPEG_4,
          AudioSourceAndroid: audioRecorderModule.AudioSourceAndroidType.VOICE_RECOGNITION
        },
        ios: {
          AVEncoderBitRateKeyIOS: this.audioSettings.bitRate,
          AVNumberOfChannelsKeyIOS: this.audioSettings.audioChannels,
          AVSampleRateKeyIOS: this.audioSettings.sampleRate,
          AVFormatIDKeyIOS: audioRecorderModule.AVEncodingOption.mp4,
          // same with aac
          AVEncoderAudioQualityKeyIOS: audioRecorderModule.AVEncoderAudioQualityIOSType.high
        },
        default: {}
      }));
      _defineProperty(this, "setState", state => {
        this.state = state;
        this.stateSubscribers.forEach(callback => {
          callback(state);
        });
      });
      _defineProperty(this, "requestPermission", async () => {
        const permission = Platform.select({
          android: [permissionModule.PERMISSIONS.ANDROID.RECORD_AUDIO],
          ios: [permissionModule.PERMISSIONS.IOS.MICROPHONE],
          windows: [permissionModule.PERMISSIONS.WINDOWS.MICROPHONE],
          default: undefined
        });
        if (Platform.OS === 'android' && Platform.Version <= 28) {
          permission === null || permission === void 0 ? void 0 : permission.push(permissionModule.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        }
        if (permission) {
          const status = await permissionModule.checkMultiple(permission);
          if (nativePermissionGranted(status)) {
            return true;
          } else {
            const status = await permissionModule.requestMultiple(permission);
            return nativePermissionGranted(status);
          }
        } else {
          return true;
        }
      });
      _defineProperty(this, "addRecordingListener", callback => {
        this.recordingSubscribers.add(callback);
        return () => {
          this.recordingSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "addStateListener", callback => {
        this.stateSubscribers.add(callback);
        return () => {
          this.stateSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "record", async uri => {
        if (matchesOneOf(this.state, ['idle', 'completed'])) {
          try {
            this.setState('preparing');
            await module.startRecorder(uri, {
              ...this.audioOptions
            });
            if (Platform.OS === 'android') {
              this._recordStartedAt = Date.now();
            }
            this.uri = uri;
            this.setState('recording');
          } catch (e) {
            this.setState('idle');
            throw e;
          }
        }
      });
      _defineProperty(this, "stop", async () => {
        if (matchesOneOf(this.state, ['recording'])) {
          if (Platform.OS === 'android') {
            const buffer = this._getRecorderStopSafeBuffer();
            if (buffer > 0) await sleep(buffer);
          }
          await module.stopRecorder();
          this.setState('completed');
        }
      });
      _defineProperty(this, "reset", async () => {
        await this.stop();
        this.uri = undefined;
        this.recordingSubscribers.clear();
        this.setState('idle');
      });
      module.setSubscriptionDuration(0.1);
      module.addRecordBackListener(data => {
        const completed = data.currentPosition >= this.options.maxDuration;
        if (completed) this.stop();
        if (this.state === 'recording') {
          this.recordingSubscribers.forEach(callback => {
            callback({
              currentTime: data.currentPosition,
              completed
            });
          });
        }
      });
    }
  }
  return new VoiceRecorder();
};
export default createNativeRecorderService;
//# sourceMappingURL=createRecorderService.native.js.map