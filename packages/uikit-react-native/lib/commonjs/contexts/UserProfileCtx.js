"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserProfileProvider = exports.UserProfileContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _LocalizationCtx = require("../contexts/LocalizationCtx");
var _SendbirdChatCtx = require("../contexts/SendbirdChatCtx");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
let WARN_onCreateChannel = false;
const UserProfileContext = /*#__PURE__*/_react.default.createContext(null);
exports.UserProfileContext = UserProfileContext;
const UserProfileProvider = _ref => {
  let {
    children,
    onCreateChannel,
    onBeforeCreateChannel = _uikitUtils.PASS,
    statusBarTranslucent = true
  } = _ref;
  const chatContext = (0, _react.useContext)(_SendbirdChatCtx.SendbirdChatContext);
  const localizationContext = (0, _react.useContext)(_LocalizationCtx.LocalizationContext);
  if (!chatContext) throw new Error('SendbirdChatContext is not provided');
  if (!localizationContext) throw new Error('LocalizationContext is not provided');
  if (__DEV__ && !WARN_onCreateChannel && !onCreateChannel) {
    _uikitUtils.Logger.warn('You should pass `userProfile.onCreateChannel` prop to SendbirdUIKitContainer if want to use message in a user profile');
    WARN_onCreateChannel = true;
  }
  const {
    bottom,
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const [user, setUser] = (0, _react.useState)();
  const [visible, setVisible] = (0, _react.useState)(false);
  const [hideMessageButton, setHideMessageButton] = (0, _react.useState)(false);
  const show = (0, _react.useCallback)((user, options) => {
    if (chatContext.sbOptions.uikit.common.enableUsingDefaultUserProfile) {
      setUser(user);
      setVisible(true);
      setHideMessageButton(Boolean(options === null || options === void 0 ? void 0 : options.hideMessageButton));
    }
  }, [chatContext.sbOptions.uikit.common.enableUsingDefaultUserProfile]);
  const hide = (0, _react.useCallback)(() => {
    setVisible(false);
  }, []);
  const onDismiss = () => {
    setUser(undefined);
    setHideMessageButton(false);
  };
  const userProfileButton = (0, _uikitUtils.useIIFE)(() => {
    const isMe = chatContext.currentUser && (user === null || user === void 0 ? void 0 : user.userId) === chatContext.currentUser.userId;
    if (isMe) return undefined;
    if (hideMessageButton) return undefined;
    const onPressMessageButton = async () => {
      if (user) {
        var _chatContext$currentU;
        const params = (0, _uikitUtils.getDefaultGroupChannelCreateParams)({
          invitedUserIds: [user.userId],
          currentUserId: (_chatContext$currentU = chatContext.currentUser) === null || _chatContext$currentU === void 0 ? void 0 : _chatContext$currentU.userId
        });
        const processedParams = await onBeforeCreateChannel(params, [user]);
        hide();
        const channel = await chatContext.sdk.groupChannel.createChannel(processedParams);
        if (onCreateChannel) {
          onCreateChannel(channel);
        } else {
          _uikitUtils.Logger.warn('Please set `onCreateChannel` before message to user from profile card, see `userProfile` prop in the `SendbirdUIKitContainer` props');
        }
      }
    };
    return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OutlinedButton, {
      onPress: onPressMessageButton
    }, localizationContext.STRINGS.PROFILE_CARD.BUTTON_MESSAGE);
  });
  return /*#__PURE__*/_react.default.createElement(UserProfileContext.Provider, {
    value: {
      show,
      hide
    }
  }, children, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Modal, {
    type: 'slide',
    onClose: hide,
    onDismiss: onDismiss,
    visible: visible && Boolean(user),
    backgroundStyle: styles.modal,
    statusBarTranslucent: statusBarTranslucent
  }, user && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.ProfileCard, {
    containerStyle: [styles.profileCardContainer, {
      paddingLeft: left,
      paddingRight: right,
      paddingBottom: bottom
    }],
    uri: user.profileUrl,
    username: user.nickname || localizationContext.STRINGS.LABELS.USER_NO_NAME,
    bodyLabel: localizationContext.STRINGS.PROFILE_CARD.BODY_LABEL,
    body: localizationContext.STRINGS.PROFILE_CARD.BODY(user),
    button: userProfileButton
  })));
};
exports.UserProfileProvider = UserProfileProvider;
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  modal: {
    justifyContent: 'flex-end'
  },
  profileCardContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
});
//# sourceMappingURL=UserProfileCtx.js.map