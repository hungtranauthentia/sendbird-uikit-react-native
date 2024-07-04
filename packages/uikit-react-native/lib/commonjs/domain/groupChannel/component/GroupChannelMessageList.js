"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ChannelMessageList = _interopRequireDefault(require("../../../components/ChannelMessageList"));
var _constants = require("../../../constants");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const GroupChannelMessageList = props => {
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const {
    setMessageToEdit,
    setMessageToReply
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.Fragment);
  const {
    subscribe
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.PubSub);
  const {
    flatListRef,
    lazyScrollToBottom,
    lazyScrollToIndex
  } = (0, _react.useContext)(_moduleContext.GroupChannelContexts.MessageList);
  const id = (0, _uikitUtils.useUniqHandlerId)('GroupChannelMessageList');
  const isFirstMount = (0, _uikitUtils.useIsFirstMount)();
  const scrollToMessageWithCreatedAt = (0, _uikitUtils.useFreshCallback)((createdAt, focusAnimated, timeout) => {
    const foundMessageIndex = props.messages.findIndex(it => it.createdAt === createdAt);
    const isIncludedInList = foundMessageIndex > -1;
    if (isIncludedInList) {
      if (focusAnimated) {
        setTimeout(() => props.onUpdateSearchItem({
          startingPoint: createdAt
        }), _constants.MESSAGE_FOCUS_ANIMATION_DELAY);
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
  const scrollToBottom = (0, _uikitUtils.useFreshCallback)(async function () {
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
  (0, _uikitChatHooks.useChannelHandler)(sdk, id, {
    onReactionUpdated(channel, event) {
      if ((0, _uikitUtils.isDifferentChannel)(channel, props.channel)) return;
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
  (0, _react.useEffect)(() => {
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
  (0, _react.useEffect)(() => {
    // Only trigger once when message list mount with initial props.searchItem
    // - Search screen + searchItem > mount message list
    // - Reset message list + searchItem > re-mount message list
    if (isFirstMount && props.searchItem) {
      scrollToMessageWithCreatedAt(props.searchItem.startingPoint, false, _constants.MESSAGE_SEARCH_SAFE_SCROLL_DELAY);
    }
  }, [isFirstMount]);
  const onPressParentMessage = (0, _uikitUtils.useFreshCallback)(message => {
    const canScrollToParent = scrollToMessageWithCreatedAt(message.createdAt, true, 0);
    if (!canScrollToParent) toast.show(STRINGS.TOAST.FIND_PARENT_MSG_ERROR, 'error');
  });
  return /*#__PURE__*/_react.default.createElement(_ChannelMessageList.default, _extends({}, props, {
    ref: flatListRef,
    onReplyMessage: setMessageToReply,
    onEditMessage: setMessageToEdit,
    onPressParentMessage: onPressParentMessage,
    onPressNewMessagesButton: scrollToBottom,
    onPressScrollToBottomButton: scrollToBottom
  }));
};
var _default = /*#__PURE__*/_react.default.memo(GroupChannelMessageList);
exports.default = _default;
//# sourceMappingURL=GroupChannelMessageList.js.map