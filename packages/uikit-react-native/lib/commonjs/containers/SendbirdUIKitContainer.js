"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SendbirdUIKit = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _chat = _interopRequireWildcard(require("@sendbird/chat"));
var _groupChannel = require("@sendbird/chat/groupChannel");
var _openChannel = require("@sendbird/chat/openChannel");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitTools = require("@sendbird/uikit-tools");
var _uikitUtils = require("@sendbird/uikit-utils");
var _LocalizationCtx = require("../contexts/LocalizationCtx");
var _PlatformServiceCtx = require("../contexts/PlatformServiceCtx");
var _ReactionCtx = require("../contexts/ReactionCtx");
var _SendbirdChatCtx = require("../contexts/SendbirdChatCtx");
var _UserProfileCtx = require("../contexts/UserProfileCtx");
var _EmojiManager = _interopRequireDefault(require("../libs/EmojiManager"));
var _ImageCompressionConfig = _interopRequireDefault(require("../libs/ImageCompressionConfig"));
var _InternalLocalCacheStorage = _interopRequireDefault(require("../libs/InternalLocalCacheStorage"));
var _MentionConfig = _interopRequireDefault(require("../libs/MentionConfig"));
var _MentionManager = _interopRequireDefault(require("../libs/MentionManager"));
var _VoiceMessageConfig = _interopRequireDefault(require("../libs/VoiceMessageConfig"));
var _StringSet = _interopRequireDefault(require("../localization/StringSet.en"));
var _dynamicModule = _interopRequireDefault(require("../platform/dynamicModule"));
var _version = _interopRequireDefault(require("../version"));
var _InternalErrorBoundaryContainer = _interopRequireDefault(require("./InternalErrorBoundaryContainer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const NetInfo = _dynamicModule.default.get('@react-native-community/netinfo', 'warn');
const SendbirdUIKit = Object.freeze({
  VERSION: _version.default,
  PLATFORM: _reactNative.Platform.OS.toLowerCase(),
  DEFAULT: {
    AUTO_PUSH_TOKEN_REGISTRATION: true,
    USE_USER_ID_FOR_NICKNAME: false,
    IMAGE_COMPRESSION: true
  }
});
exports.SendbirdUIKit = SendbirdUIKit;
const chatOmitKeys = ['appId', 'newInstance', 'modules', 'debugMode', 'appVersion', 'localCacheEnabled', 'useAsyncStorageStore'];
function sanitizeChatOptions(chatOptions) {
  const opts = {
    ...chatOptions
  };
  chatOmitKeys.forEach(key => delete opts[key]);
  return opts;
}
const SendbirdUIKitContainer = props => {
  const {
    children,
    appId,
    chatOptions,
    uikitOptions,
    platformServices,
    localization,
    styles,
    errorBoundary,
    toast,
    userProfile,
    reaction
  } = props;
  if (!chatOptions.localCacheStorage) {
    throw new Error('SendbirdUIKitContainer: chatOptions.localCacheStorage is required');
  }
  const defaultStringSet = (localization === null || localization === void 0 ? void 0 : localization.stringSet) ?? _StringSet.default;
  const isFirstMount = (0, _uikitUtils.useIsFirstMount)();
  const unsubscribes = (0, _react.useRef)([]);
  const [internalStorage] = (0, _react.useState)(() => new _InternalLocalCacheStorage.default(chatOptions.localCacheStorage));
  const [sdkInstance, setSdkInstance] = (0, _react.useState)(() => {
    const sendbird = initializeSendbird(appId, {
      internalStorage,
      ...sanitizeChatOptions(chatOptions)
    });
    unsubscribes.current = sendbird.unsubscribes;
    return sendbird.chatSDK;
  });
  const {
    imageCompressionConfig,
    voiceMessageConfig,
    mentionConfig
  } = useConfigInstance(props);
  const emojiManager = (0, _react.useMemo)(() => new _EmojiManager.default(internalStorage), [internalStorage]);
  const mentionManager = (0, _react.useMemo)(() => new _MentionManager.default(mentionConfig), [mentionConfig]);
  (0, _react.useLayoutEffect)(() => {
    if (!isFirstMount) {
      const sendbird = initializeSendbird(appId, {
        internalStorage,
        ...sanitizeChatOptions(chatOptions)
      });
      setSdkInstance(sendbird.chatSDK);
      unsubscribes.current = sendbird.unsubscribes;
    }
    return () => {
      unsubscribes.current.forEach(u => {
        try {
          u();
        } catch {}
      });
    };
  }, [appId, internalStorage]);
  const renderChildren = () => {
    if (errorBoundary !== null && errorBoundary !== void 0 && errorBoundary.disabled) {
      return children;
    } else {
      return /*#__PURE__*/_react.default.createElement(_InternalErrorBoundaryContainer.default, errorBoundary, children);
    }
  };
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaProvider, null, /*#__PURE__*/_react.default.createElement(_uikitTools.UIKitConfigProvider, {
    storage: internalStorage,
    localConfigs: {
      common: uikitOptions === null || uikitOptions === void 0 ? void 0 : uikitOptions.common,
      groupChannel: {
        channel: {
          ...(uikitOptions === null || uikitOptions === void 0 ? void 0 : uikitOptions.groupChannel),
          enableReactionsSupergroup: undefined
        },
        channelList: uikitOptions === null || uikitOptions === void 0 ? void 0 : uikitOptions.groupChannelList,
        setting: uikitOptions === null || uikitOptions === void 0 ? void 0 : uikitOptions.groupChannelSettings
      },
      openChannel: {
        channel: uikitOptions === null || uikitOptions === void 0 ? void 0 : uikitOptions.openChannel
      }
    }
  }, /*#__PURE__*/_react.default.createElement(_SendbirdChatCtx.SendbirdChatProvider, {
    sdkInstance: sdkInstance,
    emojiManager: emojiManager,
    mentionManager: mentionManager,
    imageCompressionConfig: imageCompressionConfig,
    voiceMessageConfig: voiceMessageConfig,
    enableAutoPushTokenRegistration: chatOptions.enableAutoPushTokenRegistration ?? SendbirdUIKit.DEFAULT.AUTO_PUSH_TOKEN_REGISTRATION,
    enableUseUserIdForNickname: chatOptions.enableUseUserIdForNickname ?? SendbirdUIKit.DEFAULT.USE_USER_ID_FOR_NICKNAME,
    enableImageCompression: chatOptions.enableImageCompression ?? SendbirdUIKit.DEFAULT.IMAGE_COMPRESSION
  }, /*#__PURE__*/_react.default.createElement(_LocalizationCtx.LocalizationProvider, {
    stringSet: defaultStringSet
  }, /*#__PURE__*/_react.default.createElement(_PlatformServiceCtx.PlatformServiceProvider, {
    fileService: platformServices.file,
    notificationService: platformServices.notification,
    clipboardService: platformServices.clipboard,
    mediaService: platformServices.media,
    playerService: platformServices.player,
    recorderService: platformServices.recorder,
    voiceMessageConfig: voiceMessageConfig
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.UIKitThemeProvider, {
    theme: (styles === null || styles === void 0 ? void 0 : styles.theme) ?? _uikitReactNativeFoundation.LightUIKitTheme
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.HeaderStyleProvider, {
    HeaderComponent: (styles === null || styles === void 0 ? void 0 : styles.HeaderComponent) ?? _uikitReactNativeFoundation.Header,
    defaultTitleAlign: (styles === null || styles === void 0 ? void 0 : styles.defaultHeaderTitleAlign) ?? 'left',
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ToastProvider, {
    dismissTimeout: toast === null || toast === void 0 ? void 0 : toast.dismissTimeout
  }, /*#__PURE__*/_react.default.createElement(_UserProfileCtx.UserProfileProvider, _extends({}, userProfile, {
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }), /*#__PURE__*/_react.default.createElement(_ReactionCtx.ReactionProvider, reaction, /*#__PURE__*/_react.default.createElement(_LocalizationCtx.LocalizationContext.Consumer, null, value => {
    const STRINGS = (value === null || value === void 0 ? void 0 : value.STRINGS) || defaultStringSet;
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.DialogProvider, {
      defaultLabels: {
        alert: {
          ok: STRINGS.DIALOG.ALERT_DEFAULT_OK
        },
        prompt: {
          ok: STRINGS.DIALOG.PROMPT_DEFAULT_OK,
          cancel: STRINGS.DIALOG.PROMPT_DEFAULT_CANCEL,
          placeholder: STRINGS.DIALOG.PROMPT_DEFAULT_PLACEHOLDER
        }
      }
    }, renderChildren());
  })))))))))));
};
const initializeSendbird = (appId, options) => {
  let chatSDK;
  const unsubscribes = [];
  const {
    internalStorage,
    onInitialized,
    ...chatInitParams
  } = options;
  chatSDK = _chat.default.init({
    ...chatInitParams,
    appId,
    newInstance: true,
    modules: [new _groupChannel.GroupChannelModule(), new _openChannel.OpenChannelModule()],
    localCacheEnabled: true,
    useAsyncStorageStore: internalStorage
  });
  if (onInitialized) {
    chatSDK = onInitialized(chatSDK);
  }
  const platform = getDeviceOSPlatform();
  if (SendbirdUIKit.VERSION && platform) {
    const deviceOSInfo = {
      platform,
      version: String(_reactNative.Platform.Version)
    };
    const customData = {
      platform_version: getReactNativeVersion()
    };
    const uikitExtension = {
      product: _chat.SendbirdProduct.UIKIT_CHAT,
      version: SendbirdUIKit.VERSION,
      platform: _chat.SendbirdPlatform.REACT_NATIVE
    };
    chatSDK.addSendbirdExtensions([uikitExtension], deviceOSInfo, customData);
    chatSDK.addExtension('sb_uikit', SendbirdUIKit.VERSION);
  }
  if (SendbirdUIKit.PLATFORM) {
    chatSDK.addExtension('device-os-platform', SendbirdUIKit.PLATFORM);
  }
  if (NetInfo !== null && NetInfo !== void 0 && NetInfo.addEventListener) {
    var _chatSDK$setOnlineLis, _chatSDK, _chatSDK$setOfflineLi, _chatSDK2;
    try {
      // NOTE: For removing buggy behavior of NetInfo.addEventListener
      //  When you first add an event listener, it is assumed that the initialization of the internal event detector is done simultaneously.
      //  In other words, when you call the first event listener two events are triggered immediately
      //   - the one that is called when adding the event listener
      //   - and the internal initialization event
      NetInfo.addEventListener(_uikitUtils.NOOP)();
    } catch {}
    const listener = (callback, callbackType) => {
      let callCount = 0;
      const unsubscribe = NetInfo.addEventListener(state => {
        const online = Boolean(state.isConnected) || Boolean(state.isInternetReachable);

        // NOTE: When NetInfo.addEventListener is called
        //  the event is immediately triggered regardless of whether the event actually occurred.
        //  This is why it filters the first event.
        if (callCount === 0) {
          callCount++;
          return;
        }
        if (online && callbackType === 'online') callback();
        if (!online && callbackType === 'offline') callback();
      });
      unsubscribes.push(unsubscribe);
      return unsubscribe;
    };
    (_chatSDK$setOnlineLis = (_chatSDK = chatSDK).setOnlineListener) === null || _chatSDK$setOnlineLis === void 0 ? void 0 : _chatSDK$setOnlineLis.call(_chatSDK, onOnline => listener(onOnline, 'online'));
    (_chatSDK$setOfflineLi = (_chatSDK2 = chatSDK).setOfflineListener) === null || _chatSDK$setOfflineLi === void 0 ? void 0 : _chatSDK$setOfflineLi.call(_chatSDK2, onOffline => listener(onOffline, 'offline'));
  }
  return {
    chatSDK,
    unsubscribes
  };
};
function getDeviceOSPlatform() {
  switch (_reactNative.Platform.OS) {
    case 'android':
      return _chat.DeviceOsPlatform.ANDROID;
    case 'ios':
      return _chat.DeviceOsPlatform.IOS;
    case 'web':
      return _chat.DeviceOsPlatform.WEB;
    case 'windows':
      return _chat.DeviceOsPlatform.WINDOWS;
    default:
      return undefined;
  }
}
function getReactNativeVersion() {
  const {
    major,
    minor,
    patch
  } = _reactNative.Platform.constants.reactNativeVersion;
  return `${major}.${minor}.${patch}`;
}
const useConfigInstance = _ref => {
  var _voiceMessage$recorde3, _voiceMessage$recorde4;
  let {
    imageCompression,
    userMention,
    voiceMessage
  } = _ref;
  const mentionConfig = (0, _react.useMemo)(() => {
    return new _MentionConfig.default({
      mentionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit) || _MentionConfig.default.DEFAULT.MENTION_LIMIT,
      suggestionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit) || _MentionConfig.default.DEFAULT.SUGGESTION_LIMIT,
      debounceMills: (userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills) ?? _MentionConfig.default.DEFAULT.DEBOUNCE_MILLS,
      delimiter: _MentionConfig.default.DEFAULT.DELIMITER,
      trigger: _MentionConfig.default.DEFAULT.TRIGGER
    });
  }, [userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills]);
  const imageCompressionConfig = (0, _react.useMemo)(() => {
    return new _ImageCompressionConfig.default({
      compressionRate: (imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate) || _ImageCompressionConfig.default.DEFAULT.COMPRESSION_RATE,
      width: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width,
      height: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height
    });
  }, [imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height]);
  const voiceMessageConfig = (0, _react.useMemo)(() => {
    var _voiceMessage$recorde, _voiceMessage$recorde2;
    return new _VoiceMessageConfig.default({
      recorder: {
        minDuration: (voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde = voiceMessage.recorder) === null || _voiceMessage$recorde === void 0 ? void 0 : _voiceMessage$recorde.minDuration) ?? _VoiceMessageConfig.default.DEFAULT.RECORDER.MIN_DURATION,
        maxDuration: (voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde2 = voiceMessage.recorder) === null || _voiceMessage$recorde2 === void 0 ? void 0 : _voiceMessage$recorde2.maxDuration) ?? _VoiceMessageConfig.default.DEFAULT.RECORDER.MAX_DURATION
      }
    });
  }, [voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde3 = voiceMessage.recorder) === null || _voiceMessage$recorde3 === void 0 ? void 0 : _voiceMessage$recorde3.minDuration, voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde4 = voiceMessage.recorder) === null || _voiceMessage$recorde4 === void 0 ? void 0 : _voiceMessage$recorde4.maxDuration]);
  return {
    mentionConfig,
    imageCompressionConfig,
    voiceMessageConfig
  };
};
var _default = SendbirdUIKitContainer;
exports.default = _default;
//# sourceMappingURL=SendbirdUIKitContainer.js.map