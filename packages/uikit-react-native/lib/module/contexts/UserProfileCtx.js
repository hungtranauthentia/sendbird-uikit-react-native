import React, { useCallback, useContext, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Modal, OutlinedButton, ProfileCard, createStyleSheet } from '@sendbird/uikit-react-native-foundation';
import { Logger, PASS, getDefaultGroupChannelCreateParams, useIIFE } from '@sendbird/uikit-utils';
import { LocalizationContext } from '../contexts/LocalizationCtx';
import { SendbirdChatContext } from '../contexts/SendbirdChatCtx';
let WARN_onCreateChannel = false;
export const UserProfileContext = /*#__PURE__*/React.createContext(null);
export const UserProfileProvider = _ref => {
  let {
    children,
    onCreateChannel,
    onBeforeCreateChannel = PASS,
    statusBarTranslucent = true
  } = _ref;
  const chatContext = useContext(SendbirdChatContext);
  const localizationContext = useContext(LocalizationContext);
  if (!chatContext) throw new Error('SendbirdChatContext is not provided');
  if (!localizationContext) throw new Error('LocalizationContext is not provided');
  if (__DEV__ && !WARN_onCreateChannel && !onCreateChannel) {
    Logger.warn('You should pass `userProfile.onCreateChannel` prop to SendbirdUIKitContainer if want to use message in a user profile');
    WARN_onCreateChannel = true;
  }
  const {
    bottom,
    left,
    right
  } = useSafeAreaInsets();
  const [user, setUser] = useState();
  const [visible, setVisible] = useState(false);
  const [hideMessageButton, setHideMessageButton] = useState(false);
  const show = useCallback((user, options) => {
    if (chatContext.sbOptions.uikit.common.enableUsingDefaultUserProfile) {
      setUser(user);
      setVisible(true);
      setHideMessageButton(Boolean(options === null || options === void 0 ? void 0 : options.hideMessageButton));
    }
  }, [chatContext.sbOptions.uikit.common.enableUsingDefaultUserProfile]);
  const hide = useCallback(() => {
    setVisible(false);
  }, []);
  const onDismiss = () => {
    setUser(undefined);
    setHideMessageButton(false);
  };
  const userProfileButton = useIIFE(() => {
    const isMe = chatContext.currentUser && (user === null || user === void 0 ? void 0 : user.userId) === chatContext.currentUser.userId;
    if (isMe) return undefined;
    if (hideMessageButton) return undefined;
    const onPressMessageButton = async () => {
      if (user) {
        var _chatContext$currentU;
        const params = getDefaultGroupChannelCreateParams({
          invitedUserIds: [user.userId],
          currentUserId: (_chatContext$currentU = chatContext.currentUser) === null || _chatContext$currentU === void 0 ? void 0 : _chatContext$currentU.userId
        });
        const processedParams = await onBeforeCreateChannel(params, [user]);
        hide();
        const channel = await chatContext.sdk.groupChannel.createChannel(processedParams);
        if (onCreateChannel) {
          onCreateChannel(channel);
        } else {
          Logger.warn('Please set `onCreateChannel` before message to user from profile card, see `userProfile` prop in the `SendbirdUIKitContainer` props');
        }
      }
    };
    return /*#__PURE__*/React.createElement(OutlinedButton, {
      onPress: onPressMessageButton
    }, localizationContext.STRINGS.PROFILE_CARD.BUTTON_MESSAGE);
  });
  return /*#__PURE__*/React.createElement(UserProfileContext.Provider, {
    value: {
      show,
      hide
    }
  }, children, /*#__PURE__*/React.createElement(Modal, {
    type: 'slide',
    onClose: hide,
    onDismiss: onDismiss,
    visible: visible && Boolean(user),
    backgroundStyle: styles.modal,
    statusBarTranslucent: statusBarTranslucent
  }, user && /*#__PURE__*/React.createElement(ProfileCard, {
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
const styles = createStyleSheet({
  modal: {
    justifyContent: 'flex-end'
  },
  profileCardContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8
  }
});
//# sourceMappingURL=UserProfileCtx.js.map