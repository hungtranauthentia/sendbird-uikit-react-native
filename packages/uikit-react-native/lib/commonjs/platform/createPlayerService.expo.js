"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
var _expoPermissionGranted = _interopRequireDefault(require("../utils/expoPermissionGranted"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const createExpoPlayerService = _ref => {
  let {
    avModule
  } = _ref;
  const sound = new avModule.Audio.Sound();
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
        sound.setProgressUpdateIntervalAsync(100);
        sound.setOnPlaybackStatusUpdate(status => {
          if (status.isLoaded) {
            if (status.didJustFinish) this.stop();
            if (status.isPlaying) {
              this.playbackSubscribers.forEach(callback => {
                callback({
                  currentTime: status.positionMillis,
                  duration: status.durationMillis ?? 0,
                  stopped: status.didJustFinish
                });
              });
            }
          }
        });
      });
      _defineProperty(this, "removeListener", () => {
        sound.setOnPlaybackStatusUpdate(null);
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
      _defineProperty(this, "prepare", async uri => {
        this.setState('preparing');
        await sound.loadAsync({
          uri
        }, {
          shouldPlay: false
        }, true);
        this.uri = uri;
      });
      _defineProperty(this, "play", async uri => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['idle', 'stopped'])) {
          try {
            await this.prepare(uri);
            this.setListener();
            await sound.playAsync();
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
            await sound.playAsync();
            this.setState('playing');
          } catch (e) {
            this.removeListener();
            throw e;
          }
        }
      });
      _defineProperty(this, "pause", async () => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['playing'])) {
          await sound.pauseAsync();
          this.removeListener();
          this.setState('paused');
        }
      });
      _defineProperty(this, "stop", async () => {
        if ((0, _uikitUtils.matchesOneOf)(this.state, ['playing', 'paused'])) {
          await sound.stopAsync();
          await sound.unloadAsync();
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
          await sound.playFromPositionAsync(time);
        }
      });
    }
  }
  return new VoicePlayer();
};
var _default = createExpoPlayerService;
exports.default = _default;
//# sourceMappingURL=createPlayerService.expo.js.map