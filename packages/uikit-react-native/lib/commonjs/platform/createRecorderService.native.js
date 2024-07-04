"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _VoiceMessageConfig = _interopRequireDefault(require("../libs/VoiceMessageConfig"));
var _nativePermissionGranted = _interopRequireDefault(require("../utils/nativePermissionGranted"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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
        minDuration: _VoiceMessageConfig.default.DEFAULT.RECORDER.MIN_DURATION,
        maxDuration: _VoiceMessageConfig.default.DEFAULT.RECORDER.MAX_DURATION,
        extension: _VoiceMessageConfig.default.DEFAULT.RECORDER.EXTENSION
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
        sampleRate: _VoiceMessageConfig.default.DEFAULT.RECORDER.SAMPLE_RATE,
        bitRate: _VoiceMessageConfig.default.DEFAULT.RECORDER.BIT_RATE,
        audioChannels: _VoiceMessageConfig.default.DEFAULT.RECORDER.CHANNELS
        // encoding: mpeg4_aac
      });
      _defineProperty(this, "audioOptions", _reactNative.Platform.select({
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
        const permission = _reactNative.Platform.select({
          android: [permissionModule.PERMISSIONS.ANDROID.RECORD_AUDIO],
          ios: [permissionModule.PERMISSIONS.IOS.MICROPHONE],
          windows: [permissionModule.PERMISSIONS.WINDOWS.MICROPHONE],
          default: undefined
        });
        if (_reactNative.Platform.OS === 'android' && _reactNative.Platform.Version <= 28) {
          permission === null || permission === void 0 ? void 0 : permission.push(permissionModule.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
        }
        if (permission) {
          const status = await permissionModule.checkMultiple(permission);
          if ((0, _nativePermissionGranted.default)(status)) {
            return true;
          } else {
            const status = await permissionModule.requestMultiple(permission);
            return (0, _nativePermissionGranted.default)(status);
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
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['idle', 'completed'])) {
          try {
            this.setState('preparing');
            await module.startRecorder(uri, {
              ...this.audioOptions
            });
            if (_reactNative.Platform.OS === 'android') {
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
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['recording'])) {
          if (_reactNative.Platform.OS === 'android') {
            const buffer = this._getRecorderStopSafeBuffer();
            if (buffer > 0) await (0, _uikitUtils.sleep)(buffer);
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
var _default = createNativeRecorderService;
exports.default = _default;
//# sourceMappingURL=createRecorderService.native.js.map