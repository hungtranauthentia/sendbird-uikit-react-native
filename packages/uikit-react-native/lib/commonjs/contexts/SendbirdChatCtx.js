"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendbirdChatProvider = exports.SendbirdChatContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitTools = require("@sendbird/uikit-tools");
var _uikitUtils = require("@sendbird/uikit-utils");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SendbirdChatContext = /*#__PURE__*/_react.default.createContext(null);
exports.SendbirdChatContext = SendbirdChatContext;
const SendbirdChatProvider = _ref => {
  let {
    children,
    sdkInstance,
    emojiManager,
    mentionManager,
    imageCompressionConfig,
    voiceMessageConfig,
    enableAutoPushTokenRegistration,
    enableUseUserIdForNickname,
    enableImageCompression
  } = _ref;
  const [currentUser, _setCurrentUser] = (0, _react.useState)();
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const appFeatures = (0, _uikitChatHooks.useAppFeatures)(sdkInstance);
  const {
    configs,
    configsWithAppAttr
  } = (0, _uikitTools.useUIKitConfig)();
  const setCurrentUser = (0, _react.useCallback)(user => {
    // NOTE: Sendbird SDK handle User object is always same object, so force update after setCurrentUser
    _setCurrentUser(user);
    forceUpdate();
  }, []);
  const updateCurrentUserInfo = (0, _react.useCallback)(async (nickname, profile) => {
    let user = currentUser;
    if (!user) throw new Error('Current user is not defined, please connect using `useConnection()` hook first');
    const params = {};
    if (!nickname) {
      params.nickname = user.nickname;
    } else {
      params.nickname = nickname;
    }
    if (!profile) {
      params.profileUrl = user.profileUrl;
    } else if (typeof profile === 'string') {
      params.profileUrl = profile;
    } else if (typeof profile === 'object') {
      params.profileImage = profile;
    } else {
      throw new Error(`Cannot update profile, not supported profile type(${typeof profile})`);
    }
    user = await sdkInstance.updateCurrentUserInfo(params);
    setCurrentUser(user);
    return user;
  }, [sdkInstance, currentUser, setCurrentUser]);
  const markAsDeliveredWithChannel = (0, _react.useCallback)(channel => {
    if (appFeatures.deliveryReceiptEnabled) (0, _uikitUtils.confirmAndMarkAsDelivered)([channel]);
  }, [sdkInstance, appFeatures.deliveryReceiptEnabled]);
  (0, _uikitUtils.useAppState)('change', status => {
    // 'active' | 'background' | 'inactive' | 'unknown' | 'extension';
    if (status === 'active') sdkInstance.connectionState === 'CLOSED' && sdkInstance.setForegroundState();else if (status === 'background') sdkInstance.connectionState === 'OPEN' && sdkInstance.setBackgroundState();
  });
  (0, _react.useEffect)(() => {
    return () => {
      sdkInstance.disconnect().then(() => _setCurrentUser(undefined));
    };
  }, [sdkInstance]);
  const value = {
    sdk: sdkInstance,
    emojiManager,
    mentionManager,
    imageCompressionConfig,
    voiceMessageConfig,
    currentUser,
    setCurrentUser,
    updateCurrentUserInfo,
    markAsDeliveredWithChannel,
    // TODO: Options should be moved to the common area at the higher level to be passed to the context of each product.
    //  For example, common -> chat context, common -> calls context
    sbOptions: {
      appInfo: appFeatures,
      uikit: configs,
      uikitWithAppInfo: configsWithAppAttr(sdkInstance),
      chat: {
        autoPushTokenRegistrationEnabled: enableAutoPushTokenRegistration,
        useUserIdForNicknameEnabled: enableUseUserIdForNickname,
        imageCompressionEnabled: enableImageCompression
      }
    }
  };
  return /*#__PURE__*/_react.default.createElement(SendbirdChatContext.Provider, {
    value: value
  }, children);
};
exports.SendbirdChatProvider = SendbirdChatProvider;
//# sourceMappingURL=SendbirdChatCtx.js.map