function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext } from 'react';
import { getGroupChannelChatAvailableState } from '@sendbird/uikit-utils';
import ChannelInput from '../../../components/ChannelInput';
import { GroupChannelContexts } from '../module/moduleContext';
const GroupChannelInput = _ref => {
  let {
    inputDisabled = false,
    ...props
  } = _ref;
  const {
    channel,
    keyboardAvoidOffset = 0,
    messageToEdit,
    setMessageToEdit,
    messageToReply,
    setMessageToReply
  } = useContext(GroupChannelContexts.Fragment);
  const chatAvailableState = getGroupChannelChatAvailableState(channel);
  return /*#__PURE__*/React.createElement(ChannelInput, _extends({
    channel: channel,
    messageToEdit: messageToEdit,
    setMessageToEdit: setMessageToEdit,
    messageToReply: messageToReply,
    setMessageToReply: setMessageToReply,
    keyboardAvoidOffset: keyboardAvoidOffset,
    inputMuted: chatAvailableState.muted,
    inputFrozen: chatAvailableState.frozen,
    inputDisabled: chatAvailableState.disabled ? true : inputDisabled
  }, props));
};
export default /*#__PURE__*/React.memo(GroupChannelInput);
//# sourceMappingURL=GroupChannelInput.js.map