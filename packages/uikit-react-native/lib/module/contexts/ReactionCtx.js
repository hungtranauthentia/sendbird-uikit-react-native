function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useCallback, useContext, useReducer, useRef, useState } from 'react';
import { NOOP } from '@sendbird/uikit-utils';
import { ReactionBottomSheets } from '../components/ReactionBottomSheets';
import { LocalizationContext } from '../contexts/LocalizationCtx';
import { SendbirdChatContext } from '../contexts/SendbirdChatCtx';
import { UserProfileContext } from '../contexts/UserProfileCtx';
export const ReactionContext = /*#__PURE__*/React.createContext(null);
export const ReactionProvider = _ref => {
  let {
    children,
    onPressUserProfile
  } = _ref;
  const chatCtx = useContext(SendbirdChatContext);
  const localizationCtx = useContext(LocalizationContext);
  const userProfileCtx = useContext(UserProfileContext);
  if (!chatCtx) throw new Error('SendbirdChatContext is not provided');
  if (!localizationCtx) throw new Error('LocalizationContext is not provided');
  if (!userProfileCtx) throw new Error('UserProfileContext is not provided');
  const [state, setState] = useReducer((prev, next) => ({
    ...prev,
    ...next
  }), {});
  const [reactionListVisible, setReactionListVisible] = useState(false);
  const [reactionUserListVisible, setReactionUserListVisible] = useState(false);
  const [reactionUserListFocusIndex, setReactionUserListFocusIndex] = useState(0);
  const closeResolver = useRef(NOOP);
  const openReactionList = useCallback(params => {
    setState(params);
    setReactionListVisible(true);
  }, []);
  const openReactionUserList = useCallback(_ref2 => {
    let {
      channel,
      message,
      focusIndex = 0
    } = _ref2;
    // NOTE: We don't support reaction user list for supergroup channel
    if (channel.isGroupChannel() && channel.isSuper) return;
    setState({
      channel,
      message
    });
    setReactionUserListFocusIndex(focusIndex);
    setReactionUserListVisible(true);
  }, []);
  const updateReactionFocusedItem = useCallback(params => {
    if (params) setState(params);else setState({});
  }, []);
  const createOnCloseWithResolver = callback => {
    return () => {
      return new Promise(resolve => {
        closeResolver.current = resolve;
        callback();
      });
    };
  };
  const reactionCtx = {
    ...state,
    openReactionList,
    openReactionUserList,
    updateReactionFocusedItem,
    focusIndex: reactionUserListFocusIndex
  };
  const sheetProps = {
    chatCtx,
    reactionCtx,
    localizationCtx,
    onPressUserProfile: onPressUserProfile ?? userProfileCtx.show,
    onDismiss: () => {
      var _closeResolver$curren;
      setState({});
      (_closeResolver$curren = closeResolver.current) === null || _closeResolver$curren === void 0 ? void 0 : _closeResolver$curren.call(closeResolver);
    }
  };
  return /*#__PURE__*/React.createElement(ReactionContext.Provider, {
    value: reactionCtx
  }, children, /*#__PURE__*/React.createElement(ReactionBottomSheets.UserList, _extends({}, sheetProps, {
    visible: reactionUserListVisible,
    onClose: createOnCloseWithResolver(() => setReactionUserListVisible(false))
  })), /*#__PURE__*/React.createElement(ReactionBottomSheets.ReactionList, _extends({}, sheetProps, {
    visible: reactionListVisible,
    onClose: createOnCloseWithResolver(() => setReactionListVisible(false))
  })));
};
//# sourceMappingURL=ReactionCtx.js.map