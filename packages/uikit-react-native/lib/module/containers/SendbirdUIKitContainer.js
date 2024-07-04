function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SendbirdChat, { DeviceOsPlatform, SendbirdPlatform, SendbirdProduct } from '@sendbird/chat';
import { GroupChannelModule } from '@sendbird/chat/groupChannel';
import { OpenChannelModule } from '@sendbird/chat/openChannel';
import { DialogProvider, Header, HeaderStyleProvider, LightUIKitTheme, ToastProvider, UIKitThemeProvider } from '@sendbird/uikit-react-native-foundation';
import { UIKitConfigProvider } from '@sendbird/uikit-tools';
import { NOOP, useIsFirstMount } from '@sendbird/uikit-utils';
import { LocalizationContext, LocalizationProvider } from '../contexts/LocalizationCtx';
import { PlatformServiceProvider } from '../contexts/PlatformServiceCtx';
import { ReactionProvider } from '../contexts/ReactionCtx';
import { SendbirdChatProvider } from '../contexts/SendbirdChatCtx';
import { UserProfileProvider } from '../contexts/UserProfileCtx';
import EmojiManager from '../libs/EmojiManager';
import ImageCompressionConfig from '../libs/ImageCompressionConfig';
import InternalLocalCacheStorage from '../libs/InternalLocalCacheStorage';
import MentionConfig from '../libs/MentionConfig';
import MentionManager from '../libs/MentionManager';
import VoiceMessageConfig from '../libs/VoiceMessageConfig';
import StringSetEn from '../localization/StringSet.en';
import SBUDynamicModule from '../platform/dynamicModule';
import VERSION from '../version';
import InternalErrorBoundaryContainer from './InternalErrorBoundaryContainer';
const NetInfo = SBUDynamicModule.get('@react-native-community/netinfo', 'warn');
export const SendbirdUIKit = Object.freeze({
  VERSION,
  PLATFORM: Platform.OS.toLowerCase(),
  DEFAULT: {
    AUTO_PUSH_TOKEN_REGISTRATION: true,
    USE_USER_ID_FOR_NICKNAME: false,
    IMAGE_COMPRESSION: true
  }
});
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
  const defaultStringSet = (localization === null || localization === void 0 ? void 0 : localization.stringSet) ?? StringSetEn;
  const isFirstMount = useIsFirstMount();
  const unsubscribes = useRef([]);
  const [internalStorage] = useState(() => new InternalLocalCacheStorage(chatOptions.localCacheStorage));
  const [sdkInstance, setSdkInstance] = useState(() => {
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
  const emojiManager = useMemo(() => new EmojiManager(internalStorage), [internalStorage]);
  const mentionManager = useMemo(() => new MentionManager(mentionConfig), [mentionConfig]);
  useLayoutEffect(() => {
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
      return /*#__PURE__*/React.createElement(InternalErrorBoundaryContainer, errorBoundary, children);
    }
  };
  return /*#__PURE__*/React.createElement(SafeAreaProvider, null, /*#__PURE__*/React.createElement(UIKitConfigProvider, {
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
  }, /*#__PURE__*/React.createElement(SendbirdChatProvider, {
    sdkInstance: sdkInstance,
    emojiManager: emojiManager,
    mentionManager: mentionManager,
    imageCompressionConfig: imageCompressionConfig,
    voiceMessageConfig: voiceMessageConfig,
    enableAutoPushTokenRegistration: chatOptions.enableAutoPushTokenRegistration ?? SendbirdUIKit.DEFAULT.AUTO_PUSH_TOKEN_REGISTRATION,
    enableUseUserIdForNickname: chatOptions.enableUseUserIdForNickname ?? SendbirdUIKit.DEFAULT.USE_USER_ID_FOR_NICKNAME,
    enableImageCompression: chatOptions.enableImageCompression ?? SendbirdUIKit.DEFAULT.IMAGE_COMPRESSION
  }, /*#__PURE__*/React.createElement(LocalizationProvider, {
    stringSet: defaultStringSet
  }, /*#__PURE__*/React.createElement(PlatformServiceProvider, {
    fileService: platformServices.file,
    notificationService: platformServices.notification,
    clipboardService: platformServices.clipboard,
    mediaService: platformServices.media,
    playerService: platformServices.player,
    recorderService: platformServices.recorder,
    voiceMessageConfig: voiceMessageConfig
  }, /*#__PURE__*/React.createElement(UIKitThemeProvider, {
    theme: (styles === null || styles === void 0 ? void 0 : styles.theme) ?? LightUIKitTheme
  }, /*#__PURE__*/React.createElement(HeaderStyleProvider, {
    HeaderComponent: (styles === null || styles === void 0 ? void 0 : styles.HeaderComponent) ?? Header,
    defaultTitleAlign: (styles === null || styles === void 0 ? void 0 : styles.defaultHeaderTitleAlign) ?? 'left',
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }, /*#__PURE__*/React.createElement(ToastProvider, {
    dismissTimeout: toast === null || toast === void 0 ? void 0 : toast.dismissTimeout
  }, /*#__PURE__*/React.createElement(UserProfileProvider, _extends({}, userProfile, {
    statusBarTranslucent: (styles === null || styles === void 0 ? void 0 : styles.statusBarTranslucent) ?? true
  }), /*#__PURE__*/React.createElement(ReactionProvider, reaction, /*#__PURE__*/React.createElement(LocalizationContext.Consumer, null, value => {
    const STRINGS = (value === null || value === void 0 ? void 0 : value.STRINGS) || defaultStringSet;
    return /*#__PURE__*/React.createElement(DialogProvider, {
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
  chatSDK = SendbirdChat.init({
    ...chatInitParams,
    appId,
    newInstance: true,
    modules: [new GroupChannelModule(), new OpenChannelModule()],
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
      version: String(Platform.Version)
    };
    const customData = {
      platform_version: getReactNativeVersion()
    };
    const uikitExtension = {
      product: SendbirdProduct.UIKIT_CHAT,
      version: SendbirdUIKit.VERSION,
      platform: SendbirdPlatform.REACT_NATIVE
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
      NetInfo.addEventListener(NOOP)();
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
  switch (Platform.OS) {
    case 'android':
      return DeviceOsPlatform.ANDROID;
    case 'ios':
      return DeviceOsPlatform.IOS;
    case 'web':
      return DeviceOsPlatform.WEB;
    case 'windows':
      return DeviceOsPlatform.WINDOWS;
    default:
      return undefined;
  }
}
function getReactNativeVersion() {
  const {
    major,
    minor,
    patch
  } = Platform.constants.reactNativeVersion;
  return `${major}.${minor}.${patch}`;
}
const useConfigInstance = _ref => {
  var _voiceMessage$recorde3, _voiceMessage$recorde4;
  let {
    imageCompression,
    userMention,
    voiceMessage
  } = _ref;
  const mentionConfig = useMemo(() => {
    return new MentionConfig({
      mentionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit) || MentionConfig.DEFAULT.MENTION_LIMIT,
      suggestionLimit: (userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit) || MentionConfig.DEFAULT.SUGGESTION_LIMIT,
      debounceMills: (userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills) ?? MentionConfig.DEFAULT.DEBOUNCE_MILLS,
      delimiter: MentionConfig.DEFAULT.DELIMITER,
      trigger: MentionConfig.DEFAULT.TRIGGER
    });
  }, [userMention === null || userMention === void 0 ? void 0 : userMention.mentionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.suggestionLimit, userMention === null || userMention === void 0 ? void 0 : userMention.debounceMills]);
  const imageCompressionConfig = useMemo(() => {
    return new ImageCompressionConfig({
      compressionRate: (imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate) || ImageCompressionConfig.DEFAULT.COMPRESSION_RATE,
      width: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width,
      height: imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height
    });
  }, [imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.compressionRate, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.width, imageCompression === null || imageCompression === void 0 ? void 0 : imageCompression.height]);
  const voiceMessageConfig = useMemo(() => {
    var _voiceMessage$recorde, _voiceMessage$recorde2;
    return new VoiceMessageConfig({
      recorder: {
        minDuration: (voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde = voiceMessage.recorder) === null || _voiceMessage$recorde === void 0 ? void 0 : _voiceMessage$recorde.minDuration) ?? VoiceMessageConfig.DEFAULT.RECORDER.MIN_DURATION,
        maxDuration: (voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde2 = voiceMessage.recorder) === null || _voiceMessage$recorde2 === void 0 ? void 0 : _voiceMessage$recorde2.maxDuration) ?? VoiceMessageConfig.DEFAULT.RECORDER.MAX_DURATION
      }
    });
  }, [voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde3 = voiceMessage.recorder) === null || _voiceMessage$recorde3 === void 0 ? void 0 : _voiceMessage$recorde3.minDuration, voiceMessage === null || voiceMessage === void 0 ? void 0 : (_voiceMessage$recorde4 = voiceMessage.recorder) === null || _voiceMessage$recorde4 === void 0 ? void 0 : _voiceMessage$recorde4.maxDuration]);
  return {
    mentionConfig,
    imageCompressionConfig,
    voiceMessageConfig
  };
};
export default SendbirdUIKitContainer;
//# sourceMappingURL=SendbirdUIKitContainer.js.map