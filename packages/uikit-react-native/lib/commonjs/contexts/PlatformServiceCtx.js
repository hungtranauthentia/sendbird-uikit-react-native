"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlatformServiceProvider = exports.PlatformServiceContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const PlatformServiceContext = /*#__PURE__*/_react.default.createContext(null);
exports.PlatformServiceContext = PlatformServiceContext;
const PlatformServiceProvider = _ref => {
  let {
    children,
    voiceMessageConfig,
    ...services
  } = _ref;
  (0, _react.useEffect)(() => {
    services.recorderService.options.minDuration = voiceMessageConfig.recorder.minDuration;
    services.recorderService.options.maxDuration = voiceMessageConfig.recorder.maxDuration;
  }, [voiceMessageConfig]);
  (0, _uikitUtils.useAppState)('change', state => {
    if (state !== 'active') {
      Promise.allSettled([services.playerService.reset(), services.recorderService.reset()]);
    }
  });
  return /*#__PURE__*/_react.default.createElement(PlatformServiceContext.Provider, {
    value: services
  }, children);
};
exports.PlatformServiceProvider = PlatformServiceProvider;
//# sourceMappingURL=PlatformServiceCtx.js.map