"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createNativePlayerService = _ref => {
  let {
    audioRecorderModule,
    permissionModule
  } = _ref;
  const module = new audioRecorderModule.default();
  class VoicePlayer {
    constructor() {
      _defineProperty(this, "uri", void 0);
      _defineProperty(this, "state", 'idle');
      _defineProperty(this, "playbackSubscribers", new Set());
      _defineProperty(this, "stateSubscribers", new Set());
      _defineProperty(this, "setState", state => {
        this.state = state;
        this.stateSubscribers.forEach(callback => {
          callback(state);
        });
      });
      _defineProperty(this, "setListener", () => {
        module.addPlayBackListener(data => {
          const stopped = data.currentPosition >= data.duration;
          if (stopped) this.stop();
          if (this.state === 'playing') {
            this.playbackSubscribers.forEach(callback => {
              callback({
                currentTime: data.currentPosition,
                duration: data.duration,
                stopped
              });
            });
          }
        });
      });
      _defineProperty(this, "removeListener", () => {
        module.removePlayBackListener();
      });
      _defineProperty(this, "requestPermission", async () => {
        if (_reactNative.Platform.OS === 'android') {
          const {
            READ_MEDIA_AUDIO,
            READ_EXTERNAL_STORAGE
          } = permissionModule.PERMISSIONS.ANDROID;
          const permission = _reactNative.Platform.Version > 32 ? READ_MEDIA_AUDIO : READ_EXTERNAL_STORAGE;
          const status = await permissionModule.check(permission);
          if (status === 'granted') {
            return true;
          } else {
            const status = await permissionModule.request(permission);
            return status === 'granted';
          }
        } else {
          return true;
        }
      });
      _defineProperty(this, "addPlaybackListener", callback => {
        this.playbackSubscribers.add(callback);
        return () => {
          this.playbackSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "addStateListener", callback => {
        this.stateSubscribers.add(callback);
        return () => {
          this.stateSubscribers.delete(callback);
        };
      });
      _defineProperty(this, "play", async uri => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['idle', 'stopped'])) {
          try {
            this.setState('preparing');
            this.uri = uri;
            this.setListener();

            // FIXME: Workaround, `module.startPlayer()` caused a significant frame-drop and prevented the 'preparing' UI transition.
            await (0, _uikitUtils.sleep)(0);
            await module.startPlayer(uri);
            this.setState('playing');
          } catch (e) {
            this.setState('idle');
            this.uri = undefined;
            this.removeListener();
            throw e;
          }
        } else if ((0, _uikitUtils.matchesOneOf)(this.state, ['paused']) && this.uri === uri) {
          try {
            this.setListener();
            await module.resumePlayer();
            this.setState('playing');
          } catch (e) {
            this.removeListener();
            throw e;
          }
        }
      });
      _defineProperty(this, "pause", async () => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['playing'])) {
          await module.pausePlayer();
          this.removeListener();
          this.setState('paused');
        }
      });
      _defineProperty(this, "stop", async () => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['preparing', 'playing', 'paused'])) {
          await module.stopPlayer();
          this.removeListener();
          this.setState('stopped');
        }
      });
      _defineProperty(this, "reset", async () => {
        await this.stop();
        this.setState('idle');
        this.uri = undefined;
        this.playbackSubscribers.clear();
        this.stateSubscribers.clear();
      });
      _defineProperty(this, "seek", async time => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['playing', 'paused'])) {
          await module.seekToPlayer(time);
        }
      });
      module.setSubscriptionDuration(0.1);
    }
  }
  return new VoicePlayer();
};
var _default = createNativePlayerService;
exports.default = _default;
//# sourceMappingURL=createPlayerService.native.js.map