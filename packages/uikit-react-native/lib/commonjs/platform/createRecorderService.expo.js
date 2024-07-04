"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _VoiceMessageConfig = _interopRequireDefault(require("../libs/VoiceMessageConfig"));
var _expoPermissionGranted = _interopRequireDefault(require("../utils/expoPermissionGranted"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createExpoRecorderService = _ref => {
  let {
    avModule
  } = _ref;
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
      _defineProperty(this, "_recorder", new avModule.Audio.Recording());
      _defineProperty(this, "_recordingSubscribers", new Set());
      _defineProperty(this, "_stateSubscribers", new Set());
      _defineProperty(this, "_audioSettings", {
        sampleRate: _VoiceMessageConfig.default.DEFAULT.RECORDER.SAMPLE_RATE,
        bitRate: _VoiceMessageConfig.default.DEFAULT.RECORDER.BIT_RATE,
        numberOfChannels: _VoiceMessageConfig.default.DEFAULT.RECORDER.CHANNELS
        // encoding: mpeg4_aac
      });
      _defineProperty(this, "_audioOptions", {
        android: {
          ...this._audioSettings,
          extension: `.${this.options.extension}`,
          audioEncoder: avModule.Audio.AndroidAudioEncoder.AAC,
          outputFormat: avModule.Audio.AndroidOutputFormat.MPEG_4
        },
        ios: {
          ...this._audioSettings,
          extension: `.${this.options.extension}`,
          outputFormat: avModule.Audio.IOSOutputFormat.MPEG4AAC,
          audioQuality: avModule.Audio.IOSAudioQuality.HIGH
        },
        web: {}
      });
      _defineProperty(this, "prepare", async () => {
        this.setState('preparing');
        if (_reactNative.Platform.OS === 'ios') {
          await avModule.Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true
          });
        }
        if (this._recorder._isDoneRecording) {
          this._recorder = new avModule.Audio.Recording();
        }
        this._recorder.setProgressUpdateInterval(100);
        this._recorder.setOnRecordingStatusUpdate(status => {
          const completed = status.durationMillis >= this.options.maxDuration;
          if (completed) this.stop();
          if (status.isRecording) {
            this._recordingSubscribers.forEach(callback => {
              callback({
                currentTime: status.durationMillis,
                completed: completed
              });
            });
          }
        });
        await this._recorder.prepareToRecordAsync(this._audioOptions);
      });
      _defineProperty(this, "setState", state => {
        this.state = state;
        this._stateSubscribers.forEach(callback => {
          callback(state);
        });
      });
      _defineProperty(this, "requestPermission", async () => {
        const status = await avModule.Audio.getPermissionsAsync();
        if ((0, _expoPermissionGranted.default)([status])) {
          return true;
        } else {
          const status = await avModule.Audio.requestPermissionsAsync();
          return (0, _expoPermissionGranted.default)([status]);
        }
      });
      _defineProperty(this, "addRecordingListener", callback => {
        this._recordingSubscribers.add(callback);
        return () => {
          this._recordingSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "addStateListener", callback => {
        this._stateSubscribers.add(callback);
        return () => {
          this._stateSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "record", async () => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['idle', 'completed'])) {
          try {
            await this.prepare();
            await this._recorder.startAsync();
            if (_reactNative.Platform.OS === 'android') {
              this._recordStartedAt = Date.now();
            }
            const uri = this._recorder.getURI();
            if (uri) this.uri = uri;
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
          await this._recorder.stopAndUnloadAsync();
          if (_reactNative.Platform.OS === 'ios') {
            await avModule.Audio.setAudioModeAsync({
              allowsRecordingIOS: false,
              playsInSilentModeIOS: false
            });
          }
          this.setState('completed');
        }
      });
      _defineProperty(this, "reset", async () => {
        await this.stop();
        this.uri = undefined;
        this._recordingSubscribers.clear();
        this._recorder = new avModule.Audio.Recording();
        this.setState('idle');
      });
    }
  }
  return new VoiceRecorder();
};
var _default = createExpoRecorderService;
exports.default = _default;
//# sourceMappingURL=createRecorderService.expo.js.map