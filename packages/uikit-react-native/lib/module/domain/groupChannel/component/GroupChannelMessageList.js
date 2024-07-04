function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect } from 'react';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { useToast } from '@sendbird/uikit-react-native-foundation';
import { isDifferentChannel, useFreshCallback, useIsFirstMount, useUniqHandlerId } from '@sendbird/uikit-utils';
import ChannelMessageList from '../../../components/ChannelMessageList';
import { MESSAGE_FOCUS_ANIMATION_DELAY, MESSAGE_SEARCH_SAFE_SCROLL_DELAY } from '../../../constants';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
import { GroupChannelContexts } from '../module/moduleContext';
const GroupChannelMessageList = props => {
  const toast = useToast();
  const {
    STRINGS
  } = useLocalization();
  const {
    sdk
  } = useSendbirdChat();
  const {
    setMessageToEdit,
    setMessageToReply
  } = useContext(GroupChannelContexts.Fragment);
  const {
    subscribe
  } = useContext(GroupChannelContexts.PubSub);
  const {
    flatListRef,
    lazyScrollToBottom,
    lazyScrollToIndex
  } = useContext(GroupChannelContexts.MessageList);
  const id = useUniqHandlerId('GroupChannelMessageList');
  const isFirstMount = useIsFirstMount();
  const scrollToMessageWithCreatedAt = useFreshCallback((createdAt, focusAnimated, timeout) => {
    const foundMessageIndex = props.messages.findIndex(it => it.createdAt === createdAt);
    const isIncludedInList = foundMessageIndex > -1;
    if (isIncludedInList) {
      if (focusAnimated) {
        setTimeout(() => props.onUpdateSearchItem({
          startingPoint: createdAt
        }), MESSAGE_FOCUS_ANIMATION_DELAY);
      }
      lazyScrollToIndex({
        index: foundMessageIndex,
        animated: true,
        timeout
      });
    } else {
      if (props.channel.messageOffsetTimestamp <= createdAt) {
        if (focusAnimated) {
          props.onUpdateSearchItem({
            startingPoint: createdAt
          });
        }
        props.onResetMessageListWithStartingPoint(createdAt);
      } else {
        return false;
      }
    }
    return true;
  });
  const scrollToBottom = useFreshCallback(async function () {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (props.hasNext()) {
      props.onUpdateSearchItem(undefined);
      props.onScrolledAwayFromBottom(false);
      await props.onResetMessageList();
      props.onScrolledAwayFromBottom(false);
      lazyScrollToBottom({
        animated
      });
    } else {
      lazyScrollToBottom({
        animated
      });
    }
  });
  useChannelHandler(sdk, id, {
    onReactionUpdated(channel, event) {
      if (isDifferentChannel(channel, props.channel)) return;
      const recentMessage = props.messages[0];
      const isRecentMessage = recentMessage && recentMessage.messageId === event.messageId;
      const scrollReachedBottomAndCanScroll = !props.scrolledAwayFromBottom && !props.hasNext();
      if (isRecentMessage && scrollReachedBottomAndCanScroll) {
        lazyScrollToBottom({
          animated: true,
          timeout: 250
        });
      }
    }
  });
  useEffect(() => {
    return subscribe(_ref => {
      let {
        type
      } = _ref;
      switch (type) {
        case 'TYPING_BUBBLE_RENDERED':
        case 'MESSAGES_RECEIVED':
          {
            if (!props.scrolledAwayFromBottom) {
              scrollToBottom(true);
            }
            break;
          }
        case 'MESSAGE_SENT_SUCCESS':
        case 'MESSAGE_SENT_PENDING':
          {
            scrollToBottom(false);
            break;
          }
      }
    });
  }, [props.scrolledAwayFromBottom]);
  useEffect(() => {
    // Only trigger once when message list mount with initial props.searchItem
    // - Search screen + searchItem > mount message list
    // - Reset message list + searchItem > re-mount message list
    if (isFirstMount && props.searchItem) {
      scrollToMessageWithCreatedAt(props.searchItem.startingPoint, false, MESSAGE_SEARCH_SAFE_SCROLL_DELAY);
    }
  }, [isFirstMount]);
  const onPressParentMessage = useFreshCallback(message => {
    const canScrollToParent = scrollToMessageWithCreatedAt(message.createdAt, true, 0);
    if (!canScrollToParent) toast.show(STRINGS.TOAST.FIND_PARENT_MSG_ERROR, 'error');
  });
  return /*#__PURE__*/React.createElement(ChannelMessageList, _extends({}, props, {
    ref: flatListRef,
    onReplyMessage: setMessageToReply,
    onEditMessage: setMessageToEdit,
    onPressParentMessage: onPressParentMessage,
    onPressNewMessagesButton: scrollToBottom,
    onPressScrollToBottomButton: scrollToBottom
  }));
};
export default /*#__PURE__*/React.memo(GroupChannelMessageList);
//# sourceMappingURL=GroupChannelMessageList.js.map