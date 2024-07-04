function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck
import { ChannelType, PushTriggerOption, Role } from '@sendbird/chat';
import { CountPreference, HiddenState, MemberListOrder, MemberState, MemberStateFilter, MutedMemberFilter, MutedState, OperatorFilter } from '@sendbird/chat/groupChannel';
import { MessageTypeFilter, ReplyType } from '@sendbird/chat/message';
import { createTestContext } from '../utils/createTestContext';
import { createMockMessage } from './createMockMessage';
import { createMockMessageCollection } from './createMockMessageCollection';
import { createMockQuery } from './createMockQuery';
import { createMockUser } from './createMockUser';
const tc = createTestContext();
export const createMockChannel = params => {
  return new MockChannel(params);
};
class MockChannel {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "channelType", ChannelType.BASE);
    _defineProperty(this, "url", 'channel_url_' + tc.getHash());
    _defineProperty(this, "name", 'channel_name_' + tc.getHash());
    _defineProperty(this, "coverUrl", 'channel_cover_url_' + tc.getHash());
    _defineProperty(this, "isFrozen", false);
    _defineProperty(this, "isEphemeral", false);
    _defineProperty(this, "customType", '');
    _defineProperty(this, "data", '');
    _defineProperty(this, "creator", createMockUser({
      userId: 'creator-user-id'
    }));
    _defineProperty(this, "createdAt", tc.date + tc.increment);
    _defineProperty(this, "participantCount", 0);
    _defineProperty(this, "operators", []);
    _defineProperty(this, "hiddenState", HiddenState.UNHIDDEN);
    _defineProperty(this, "invitedAt", Date.now());
    _defineProperty(this, "inviter", createMockUser({
      userId: 'inviter-user-id'
    }));
    _defineProperty(this, "isAccessCodeRequired", false);
    _defineProperty(this, "isBroadcast", false);
    _defineProperty(this, "isDiscoverable", true);
    _defineProperty(this, "isDistinct", false);
    _defineProperty(this, "isExclusive", false);
    _defineProperty(this, "isPublic", true);
    _defineProperty(this, "isSuper", false);
    _defineProperty(this, "isPushEnabled", true);
    _defineProperty(this, "isChatNotification", false);
    _defineProperty(this, "joinedAt", Date.now());
    _defineProperty(this, "joinedMemberCount", 0);
    _defineProperty(this, "lastMessage", createMockMessage({}));
    _defineProperty(this, "lastPinnedMessage", createMockMessage({}));
    _defineProperty(this, "memberCount", 0);
    _defineProperty(this, "members", []);
    _defineProperty(this, "messageOffsetTimestamp", 0);
    _defineProperty(this, "messageSurvivalSeconds", 0);
    _defineProperty(this, "myCountPreference", CountPreference.ALL);
    _defineProperty(this, "myLastRead", 0);
    _defineProperty(this, "myMemberState", MemberState.JOINED);
    _defineProperty(this, "myMutedState", MutedState.UNMUTED);
    _defineProperty(this, "myPushTriggerOption", PushTriggerOption.ALL);
    _defineProperty(this, "myRole", Role.NONE);
    _defineProperty(this, "pinnedMessageIds", []);
    _defineProperty(this, "unreadMentionCount", 0);
    _defineProperty(this, "unreadMessageCount", 0);
    _defineProperty(this, "totalUnreadReplyCount", 0);
    // @ts-ignore
    _defineProperty(this, "refresh", jest.fn(async () => {
      var _this$params$sdk;
      (_this$params$sdk = this.params.sdk) === null || _this$params$sdk === void 0 ? void 0 : _this$params$sdk.__throwIfFailureTest();
      return this;
    }));
    _defineProperty(this, "enter", jest.fn(async () => {
      var _this$params$sdk2;
      (_this$params$sdk2 = this.params.sdk) === null || _this$params$sdk2 === void 0 ? void 0 : _this$params$sdk2.__throwIfFailureTest();
    }));
    _defineProperty(this, "exit", jest.fn(async () => {
      var _this$params$sdk3;
      (_this$params$sdk3 = this.params.sdk) === null || _this$params$sdk3 === void 0 ? void 0 : _this$params$sdk3.__throwIfFailureTest();
    }));
    _defineProperty(this, "delete", jest.fn(async () => {
      var _this$params$sdk4;
      (_this$params$sdk4 = this.params.sdk) === null || _this$params$sdk4 === void 0 ? void 0 : _this$params$sdk4.__throwIfFailureTest();
    }));
    _defineProperty(this, "updateChannel", jest.fn());
    _defineProperty(this, "updateChannelWithOperatorUserIds", jest.fn());
    _defineProperty(this, "createOperatorListQuery", jest.fn(params => {
      const query = createMockQuery({
        type: 'user',
        dataLength: 50,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        channelType: ChannelType.BASE,
        channelUrl: 'channel_url_' + tc.getHash(),
        ...query
      };
    }));
    _defineProperty(this, "createMutedUserListQuery", jest.fn(params => {
      const query = createMockQuery({
        type: 'user',
        dataLength: 50,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        channelType: ChannelType.BASE,
        channelUrl: 'channel_url_' + tc.getHash(),
        ...query
      };
    }));
    _defineProperty(this, "createBannedUserListQuery", jest.fn(params => {
      const query = createMockQuery({
        type: 'user',
        dataLength: 50,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        channelType: ChannelType.BASE,
        channelUrl: 'channel_url_' + tc.getHash(),
        ...query
      };
    }));
    _defineProperty(this, "createParticipantListQuery", jest.fn(params => {
      const query = createMockQuery({
        type: 'user',
        dataLength: 50,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        channelType: ChannelType.OPEN,
        channelUrl: 'channel_url_' + tc.getHash(),
        ...query
      };
    }));
    _defineProperty(this, "createMemberListQuery", jest.fn(params => {
      const query = createMockQuery({
        type: 'user',
        dataLength: 50,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        channelType: ChannelType.GROUP,
        memberStateFilter: MemberStateFilter.ALL,
        mutedMemberFilter: MutedMemberFilter.ALL,
        nicknameStartsWithFilter: '',
        operatorFilter: OperatorFilter.ALL,
        order: MemberListOrder.MEMBER_NICKNAME_ALPHABETICAL,
        channelUrl: 'channel_url_' + tc.getHash(),
        ...query
      };
    }));
    _defineProperty(this, "createPreviousMessageListQuery", jest.fn(function (params) {
      const query = createMockQuery({
        type: 'message',
        dataLength: 300,
        limit: params === null || params === void 0 ? void 0 : params.limit,
        sdk: this.params.sdk
      });
      return {
        reverse: false,
        channelType: ChannelType.BASE,
        channelUrl: 'channel_url_' + tc.getHash(),
        customTypesFilter: [],
        includeMetaArray: false,
        includeParentMessageInfo: false,
        includeReactions: false,
        includeThreadInfo: false,
        messageTypeFilter: MessageTypeFilter.ALL,
        replyType: ReplyType.NONE,
        senderUserIdsFilter: [],
        showSubchannelMessagesOnly: false,
        load: query.next,
        ...query
      };
    }));
    _defineProperty(this, "createMessageCollection", jest.fn(params => {
      return createMockMessageCollection({
        ...params,
        sdk: this.params.sdk,
        groupChannel: this.asGroupChannel()
      }).asMessageCollection();
    }));
    _defineProperty(this, "acceptInvitation", jest.fn());
    _defineProperty(this, "addMember", jest.fn());
    _defineProperty(this, "addPollOption", jest.fn());
    _defineProperty(this, "cancelScheduledMessage", jest.fn());
    _defineProperty(this, "closePoll", jest.fn());
    _defineProperty(this, "getUndeliveredMemberCount", jest.fn(() => 0));
    _defineProperty(this, "getUnreadMemberCount", jest.fn(() => 0));
    _defineProperty(this, "getUnreadMembers", jest.fn(() => []));
    tc.increaseIncrement();
    Object.assign(this, params);
  }
  serialize() {
    throw new Error('Method not implemented.');
  }
  isOperator() {
    throw new Error('Method not implemented.');
  }
  get cachedMetaData() {
    throw new Error('Method not implemented.');
  }
  isIdentical(channel) {
    return this.url === channel.url;
  }
  isEqual(channel) {
    return Object.is(channel, this);
  }
  addOperators() {
    throw new Error('Method not implemented.');
  }
  removeOperators() {
    throw new Error('Method not implemented.');
  }
  getMyMutedInfo() {
    throw new Error('Method not implemented.');
  }
  getMetaData() {
    throw new Error('Method not implemented.');
  }
  getAllMetaData() {
    throw new Error('Method not implemented.');
  }
  createMetaData() {
    throw new Error('Method not implemented.');
  }
  updateMetaData() {
    throw new Error('Method not implemented.');
  }
  deleteMetaData() {
    throw new Error('Method not implemented.');
  }
  deleteAllMetaData() {
    throw new Error('Method not implemented.');
  }
  getMetaCounters() {
    throw new Error('Method not implemented.');
  }
  getAllMetaCounters() {
    throw new Error('Method not implemented.');
  }
  createMetaCounters() {
    throw new Error('Method not implemented.');
  }
  updateMetaCounters() {
    throw new Error('Method not implemented.');
  }
  increaseMetaCounters() {
    throw new Error('Method not implemented.');
  }
  decreaseMetaCounters() {
    throw new Error('Method not implemented.');
  }
  deleteMetaCounter() {
    throw new Error('Method not implemented.');
  }
  deleteAllMetaCounters() {
    throw new Error('Method not implemented.');
  }
  muteUser() {
    throw new Error('Method not implemented.');
  }
  muteUserWithUserId() {
    throw new Error('Method not implemented.');
  }
  unmuteUser() {
    throw new Error('Method not implemented.');
  }
  unmuteUserWithUserId() {
    throw new Error('Method not implemented.');
  }
  banUser() {
    throw new Error('Method not implemented.');
  }
  banUserWithUserId() {
    throw new Error('Method not implemented.');
  }
  unbanUser() {
    throw new Error('Method not implemented.');
  }
  unbanUserWithUserId() {
    throw new Error('Method not implemented.');
  }
  freeze() {
    throw new Error('Method not implemented.');
  }
  unfreeze() {
    throw new Error('Method not implemented.');
  }
  getMessagesByMessageId() {
    throw new Error('Method not implemented.');
  }
  getMessagesByTimestamp() {
    throw new Error('Method not implemented.');
  }
  getMessageChangeLogsSinceTimestamp() {
    throw new Error('Method not implemented.');
  }
  getMessageChangeLogsSinceToken() {
    throw new Error('Method not implemented.');
  }
  resendMessage() {
    throw new Error('Method not implemented.');
  }
  copyMessage() {
    throw new Error('Method not implemented.');
  }
  sendUserMessage() {
    throw new Error('Method not implemented.');
  }
  resendUserMessage() {
    throw new Error('Method not implemented.');
  }
  updateUserMessage() {
    throw new Error('Method not implemented.');
  }
  copyUserMessage() {
    throw new Error('Method not implemented.');
  }
  translateUserMessage() {
    throw new Error('Method not implemented.');
  }
  sendFileMessage() {
    throw new Error('Method not implemented.');
  }
  sendFileMessages() {
    throw new Error('Method not implemented.');
  }
  resendFileMessage() {
    throw new Error('Method not implemented.');
  }
  updateFileMessage() {
    throw new Error('Method not implemented.');
  }
  cancelUploadingFileMessage() {
    throw new Error('Method not implemented.');
  }
  copyFileMessage() {
    throw new Error('Method not implemented.');
  }
  deleteMessage() {
    throw new Error('Method not implemented.');
  }
  addReaction() {
    throw new Error('Method not implemented.');
  }
  deleteReaction() {
    throw new Error('Method not implemented.');
  }
  createMessageMetaArrayKeys() {
    throw new Error('Method not implemented.');
  }
  deleteMessageMetaArrayKeys() {
    throw new Error('Method not implemented.');
  }
  addMessageMetaArrayValues() {
    throw new Error('Method not implemented.');
  }
  removeMessageMetaArrayValues() {
    throw new Error('Method not implemented.');
  }
  report() {
    throw new Error('Method not implemented.');
  }
  reportUser() {
    throw new Error('Method not implemented.');
  }
  reportMessage() {
    throw new Error('Method not implemented.');
  }
  isOpenChannel() {
    return this.channelType === ChannelType.OPEN;
  }
  isGroupChannel() {
    return this.channelType === ChannelType.GROUP;
  }
  isFeedChannel() {
    return this.channelType === ChannelType.FEED;
  }
  asOpenChannel() {
    return this;
  }
  asGroupChannel() {
    return this;
  }
  get cachedUndeliveredMemberState() {
    return {};
  }
  get cachedUnreadMemberState() {
    return {};
  }
  createPollListQuery() {
    throw new Error('Method not implemented.');
  }
  createPollVoterListQuery() {
    throw new Error('Method not implemented.');
  }
  deletePoll() {
    throw new Error('Method not implemented.');
  }
  deletePollOption() {
    throw new Error('Method not implemented.');
  }
  endTyping() {
    throw new Error('Method not implemented.');
  }
  getMyPushTriggerOption() {
    throw new Error('Method not implemented.');
  }
  getPollChangeLogsSinceTimestamp() {
    throw new Error('Method not implemented.');
  }
  getPollChangeLogsSinceToken() {
    throw new Error('Method not implemented.');
  }
  getReadMembers() {
    return [];
  }
  getReadStatus() {
    return {};
  }
  getTypingUsers() {
    return [];
  }
  getDeliveryStatus() {
    return {};
  }
  hide() {
    throw new Error('Method not implemented.');
  }
  invalidateTypingStatus() {
    return false;
  }
  invite() {
    throw new Error('Method not implemented.');
  }
  inviteWithUserIds() {
    throw new Error('Method not implemented.');
  }
  get isHidden() {
    return false;
  }
  isReadMessage() {
    return false;
  }
  get isTyping() {
    return false;
  }
  join() {
    throw new Error('Method not implemented.');
  }
  leave() {
    throw new Error('Method not implemented.');
  }
  markAsDelivered() {
    throw new Error('Method not implemented.');
  }
  markAsRead() {
    throw new Error('Method not implemented.');
  }
  pinMessage() {
    throw new Error('Method not implemented.');
  }
  removeMember() {
    throw new Error('Method not implemented.');
  }
  resetMyHistory() {
    throw new Error('Method not implemented.');
  }
  sendScheduledMessageNow() {
    throw new Error('Method not implemented.');
  }
  setMyCountPreference() {
    throw new Error('Method not implemented.');
  }
  setMyPushTriggerOption() {
    throw new Error('Method not implemented.');
  }
  startTyping() {
    throw new Error('Method not implemented.');
  }
  unhide() {
    throw new Error('Method not implemented.');
  }
  unpinMessage() {
    throw new Error('Method not implemented.');
  }
  updatePoll() {
    throw new Error('Method not implemented.');
  }
  updatePollOption() {
    throw new Error('Method not implemented.');
  }
  updateScheduledFileMessage() {
    throw new Error('Method not implemented.');
  }
  updateScheduledUserMessage() {
    throw new Error('Method not implemented.');
  }
  votePoll() {
    throw new Error('Method not implemented.');
  }
  createScheduledFileMessage() {
    throw new Error('Method not implemented.');
  }
  createScheduledUserMessage() {
    throw new Error('Method not implemented.');
  }
  declineInvitation() {
    throw new Error('Method not implemented.');
  }
  get messageCollectionLastAccessedAt() {
    throw new Error('Method not implemented.');
  }
  createThreadedParentMessageListQuery() {
    throw new Error('Method not implemented.');
  }
  createPinnedMessageListQuery(_params) {
    throw new Error('Method not implemented.');
  }
  sendMultipleFilesMessage(_params) {
    throw new Error('Method not implemented.');
  }
  uploadFile() {
    throw new Error('Method not implemented.');
  }
}
//# sourceMappingURL=createMockChannel.js.map