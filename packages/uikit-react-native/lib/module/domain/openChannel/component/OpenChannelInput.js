function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { getOpenChannelChatAvailableState, useUniqHandlerId } from '@sendbird/uikit-utils';
import ChannelInput from '../../../components/ChannelInput';
import { UNKNOWN_USER_ID } from '../../../constants';
import { useSendbirdChat } from '../../../hooks/useContext';
import { OpenChannelContexts } from '../module/moduleContext';
const OpenChannelInput = _ref => {
  let {
    inputDisabled = false,
    ...props
  } = _ref;
  const {
    sdk,
    currentUser
  } = useSendbirdChat();
  const {
    channel,
    messageToEdit,
    setMessageToEdit,
    keyboardAvoidOffset = 0
  } = useContext(OpenChannelContexts.Fragment);
  const [chatAvailableState, setChatAvailableState] = useState({
    frozen: false,
    muted: false,
    disabled: false
  });
  const updateChatAvailableState = useCallback(baseChannel => {
    if (baseChannel.isOpenChannel()) {
      const userId = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? UNKNOWN_USER_ID;
      getOpenChannelChatAvailableState(baseChannel, userId).then(setChatAvailableState);
    }
  }, [currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId]);
  useEffect(() => {
    updateChatAvailableState(channel);
  }, [channel, updateChatAvailableState]);
  const handlerId = useUniqHandlerId('OpenChannelInput');
  useChannelHandler(sdk, handlerId, {
    onChannelFrozen(channel) {
      updateChatAvailableState(channel);
    },
    onChannelUnfrozen(channel) {
      updateChatAvailableState(channel);
    },
    onUserMuted(channel) {
      updateChatAvailableState(channel);
    },
    onUserUnmuted(channel) {
      updateChatAvailableState(channel);
    },
    onOperatorUpdated(channel) {
      updateChatAvailableState(channel);
    }
  }, 'open');
  return /*#__PURE__*/React.createElement(ChannelInput, _extends({
    channel: channel,
    messageToEdit: messageToEdit,
    setMessageToEdit: setMessageToEdit,
    keyboardAvoidOffset: keyboardAvoidOffset,
    inputMuted: chatAvailableState.muted,
    inputFrozen: chatAvailableState.frozen,
    inputDisabled: chatAvailableState.disabled ? true : inputDisabled
  }, props));
};
export default /*#__PURE__*/React.memo(OpenChannelInput);
//# sourceMappingURL=OpenChannelInput.js.map