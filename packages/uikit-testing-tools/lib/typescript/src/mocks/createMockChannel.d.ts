/// <reference types="jest" />
import { BannedUserListQuery, ChannelType, FileUploadResult, MetaCounter, MetaData, MutedInfo, MutedUserListQuery, OperatorListQuery, PushTriggerOption, Role } from '@sendbird/chat';
import { CountPreference, HiddenState, MemberListQuery, MemberListQueryParams, MemberState, MessageCollectionParams, MutedState, ReadStatus } from '@sendbird/chat/groupChannel';
import { BaseListQueryParams, DeliveryStatus, MultipleFilesMessageCreateParams, MultipleFilesMessageRequestHandler, PinnedMessageListQuery, PinnedMessageListQueryParams } from '@sendbird/chat/lib/__definition';
import { FileCompat } from '@sendbird/chat/lib/__definition';
import { MessageChangelogs, MessageRequestHandler, PreviousMessageListQuery, PreviousMessageListQueryParams, ReactionEvent } from '@sendbird/chat/message';
import type { ParticipantListQuery } from '@sendbird/chat/openChannel';
import type { Poll, PollChangelogs, PollListQuery, PollVoteEvent, PollVoterListQuery } from '@sendbird/chat/poll';
import type { SendbirdBaseChannel, SendbirdBaseMessage, SendbirdFeedChannel, SendbirdFileMessage, SendbirdGroupChannel, SendbirdMember, SendbirdMultipleFilesMessage, SendbirdOpenChannel, SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { GetMockParams, GetMockProps } from '../types';
type Params = GetMockParams<SendbirdOpenChannel & SendbirdGroupChannel>;
export declare const createMockChannel: (params: Params) => MockChannel;
declare class MockChannel implements GetMockProps<Params, SendbirdBaseChannel & SendbirdOpenChannel & SendbirdGroupChannel> {
    params: Params;
    constructor(params: Params);
    channelType: ChannelType;
    url: string;
    name: string;
    coverUrl: string;
    isFrozen: boolean;
    isEphemeral: boolean;
    customType: string;
    data: string;
    creator: {
        params: Partial<import("@sendbird/chat/message").Sender & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat").Participant & import("@sendbird/chat/groupChannel").Member & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>;
        userId: string;
        requireAuth: boolean;
        nickname: string;
        plainProfileUrl: string;
        metaData: object;
        connectionStatus: import("@sendbird/chat").UserOnlineState;
        isActive: boolean;
        lastSeenAt: number;
        preferredLanguages: string[];
        friendDiscoveryKey: string;
        friendName: string;
        readonly profileUrl: string;
        serialize(): object;
        createMetaData(): Promise<object>;
        updateMetaData(): Promise<object>;
        deleteMetaData(): Promise<object>;
        deleteAllMetaData(): Promise<void>;
        asParticipant(): import("@sendbird/chat").Participant;
        asMember(): import("@sendbird/chat/groupChannel").Member;
        asAdminMessage(): import("@sendbird/chat/message").AdminMessage;
        asSender(): import("@sendbird/chat/message").Sender;
    };
    createdAt: number;
    participantCount: number;
    operators: never[];
    hiddenState: HiddenState;
    invitedAt: number;
    inviter: {
        params: Partial<import("@sendbird/chat/message").Sender & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat").Participant & import("@sendbird/chat/groupChannel").Member & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>;
        userId: string;
        requireAuth: boolean;
        nickname: string;
        plainProfileUrl: string;
        metaData: object;
        connectionStatus: import("@sendbird/chat").UserOnlineState;
        isActive: boolean;
        lastSeenAt: number;
        preferredLanguages: string[];
        friendDiscoveryKey: string;
        friendName: string;
        readonly profileUrl: string;
        serialize(): object;
        createMetaData(): Promise<object>;
        updateMetaData(): Promise<object>;
        deleteMetaData(): Promise<object>;
        deleteAllMetaData(): Promise<void>;
        asParticipant(): import("@sendbird/chat").Participant;
        asMember(): import("@sendbird/chat/groupChannel").Member;
        asAdminMessage(): import("@sendbird/chat/message").AdminMessage;
        asSender(): import("@sendbird/chat/message").Sender;
    };
    readonly isAccessCodeRequired = false;
    readonly isBroadcast = false;
    readonly isDiscoverable = true;
    readonly isDistinct = false;
    readonly isExclusive = false;
    readonly isPublic = true;
    readonly isSuper = false;
    readonly isPushEnabled = true;
    readonly isChatNotification = false;
    joinedAt: number;
    joinedMemberCount: number;
    lastMessage: {
        params: Partial<import("@sendbird/chat/message").FileMessage & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat/message").AdminMessage & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>;
        __updateIdsBySendingStatus(params: Partial<import("@sendbird/chat/message").FileMessage & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat/message").AdminMessage & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>): void;
        channelType: ChannelType;
        channelUrl: string;
        createdAt: number;
        updatedAt: number;
        messageId: number;
        messageType: import("@sendbird/chat/message").MessageType;
        parentMessageId: number;
        parentMessage: null;
        silent: boolean;
        isOperatorMessage: boolean;
        data: string;
        customType: string;
        mentionType: null;
        mentionedUsers: null;
        mentionedUserIds: null;
        mentionedMessageTemplate: string;
        threadInfo: null;
        reactions: never[];
        metaArrays: never[];
        ogMetaData: null;
        appleCriticalAlertOptions: null;
        scheduledInfo: null;
        extendedMessage: {};
        notificationData: import("@sendbird/chat/lib/__definition").NotificationData | null;
        forms: import("@sendbird/chat/message").Form[] | null;
        myFeedback: import("@sendbird/chat/message").Feedback | null;
        myFeedbackStatus: import("@sendbird/chat/message").FeedbackStatus;
        suggestedReplies: string[] | null;
        isFileMessage(): this is import("@sendbird/chat/message").FileMessage;
        isMultipleFilesMessage(): this is import("@sendbird/chat/message").MultipleFilesMessage;
        isUserMessage(): this is import("@sendbird/chat/message").UserMessage;
        isAdminMessage(): this is import("@sendbird/chat/message").AdminMessage;
        applyParentMessage(): boolean;
        applyReactionEvent(): void;
        applyThreadInfoUpdateEvent(): boolean;
        getMetaArraysByKeys(): never[];
        isEqual(): boolean;
        isIdentical(): boolean;
        serialize(): object;
        deleteFeedback(_: number): Promise<void>;
        hasForm(): this is import("@sendbird/chat/message").AdminMessage;
        submitFeedback(_: Pick<import("@sendbird/chat/message").Feedback, "rating" | "comment">): Promise<void>;
        submitForm(_: {
            formId?: string | undefined;
            answers?: Record<string, string> | undefined;
        }): Promise<void>;
        updateFeedback(_: import("@sendbird/chat/message").Feedback): Promise<void>;
        markThreadAsRead(): Promise<void>;
        setPushNotificationEnabled(_: boolean): Promise<void>;
        asFileMessage(): import("@sendbird/chat/message").FileMessage;
        asUserMessage(): import("@sendbird/chat/message").UserMessage;
        asAdminMessage(): import("@sendbird/chat/message").AdminMessage;
        asSendableMessage(): import("@sendbird/chat/lib/__definition").SendableMessage;
        asBaseMessage(): import("@sendbird/chat/message").BaseMessage;
    };
    lastPinnedMessage: {
        params: Partial<import("@sendbird/chat/message").FileMessage & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat/message").AdminMessage & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>;
        __updateIdsBySendingStatus(params: Partial<import("@sendbird/chat/message").FileMessage & import("@sendbird/chat/message").UserMessage & import("@sendbird/chat/message").AdminMessage & {
            sdk: import("./createMockSendbirdSDK").MockSendbirdChatSDK;
        }>): void;
        channelType: ChannelType;
        channelUrl: string;
        createdAt: number;
        updatedAt: number;
        messageId: number;
        messageType: import("@sendbird/chat/message").MessageType;
        parentMessageId: number;
        parentMessage: null;
        silent: boolean;
        isOperatorMessage: boolean;
        data: string;
        customType: string;
        mentionType: null;
        mentionedUsers: null;
        mentionedUserIds: null;
        mentionedMessageTemplate: string;
        threadInfo: null;
        reactions: never[];
        metaArrays: never[];
        ogMetaData: null;
        appleCriticalAlertOptions: null;
        scheduledInfo: null;
        extendedMessage: {};
        notificationData: import("@sendbird/chat/lib/__definition").NotificationData | null;
        forms: import("@sendbird/chat/message").Form[] | null;
        myFeedback: import("@sendbird/chat/message").Feedback | null;
        myFeedbackStatus: import("@sendbird/chat/message").FeedbackStatus;
        suggestedReplies: string[] | null;
        isFileMessage(): this is import("@sendbird/chat/message").FileMessage;
        isMultipleFilesMessage(): this is import("@sendbird/chat/message").MultipleFilesMessage;
        isUserMessage(): this is import("@sendbird/chat/message").UserMessage;
        isAdminMessage(): this is import("@sendbird/chat/message").AdminMessage;
        applyParentMessage(): boolean;
        applyReactionEvent(): void;
        applyThreadInfoUpdateEvent(): boolean;
        getMetaArraysByKeys(): never[];
        isEqual(): boolean;
        isIdentical(): boolean;
        serialize(): object;
        deleteFeedback(_: number): Promise<void>;
        hasForm(): this is import("@sendbird/chat/message").AdminMessage;
        submitFeedback(_: Pick<import("@sendbird/chat/message").Feedback, "rating" | "comment">): Promise<void>;
        submitForm(_: {
            formId?: string | undefined;
            answers?: Record<string, string> | undefined;
        }): Promise<void>;
        updateFeedback(_: import("@sendbird/chat/message").Feedback): Promise<void>;
        markThreadAsRead(): Promise<void>;
        setPushNotificationEnabled(_: boolean): Promise<void>;
        asFileMessage(): import("@sendbird/chat/message").FileMessage;
        asUserMessage(): import("@sendbird/chat/message").UserMessage;
        asAdminMessage(): import("@sendbird/chat/message").AdminMessage;
        asSendableMessage(): import("@sendbird/chat/lib/__definition").SendableMessage;
        asBaseMessage(): import("@sendbird/chat/message").BaseMessage;
    };
    memberCount: number;
    members: never[];
    messageOffsetTimestamp: number;
    messageSurvivalSeconds: number;
    myCountPreference: CountPreference;
    myLastRead: number;
    myMemberState: MemberState;
    myMutedState: MutedState;
    myPushTriggerOption: PushTriggerOption;
    myRole: Role;
    pinnedMessageIds: never[];
    unreadMentionCount: number;
    unreadMessageCount: number;
    totalUnreadReplyCount: number;
    serialize(): object;
    isOperator(): boolean;
    refresh: jest.Mock<Promise<this>, [], any>;
    enter: jest.Mock<Promise<void>, [], any>;
    exit: jest.Mock<Promise<void>, [], any>;
    delete: jest.Mock<Promise<void>, [], any>;
    updateChannel: jest.Mock<any, any, any>;
    updateChannelWithOperatorUserIds: jest.Mock<any, any, any>;
    get cachedMetaData(): object;
    isIdentical(channel: SendbirdBaseChannel): boolean;
    isEqual(channel: SendbirdBaseChannel): boolean;
    createOperatorListQuery: jest.Mock<OperatorListQuery, [params?: BaseListQueryParams | undefined], any>;
    createMutedUserListQuery: jest.Mock<MutedUserListQuery, [params?: BaseListQueryParams | undefined], any>;
    createBannedUserListQuery: jest.Mock<BannedUserListQuery, [params?: BaseListQueryParams | undefined], any>;
    createParticipantListQuery: jest.Mock<ParticipantListQuery, [params: BaseListQueryParams], any>;
    createMemberListQuery: jest.Mock<MemberListQuery, [params?: MemberListQueryParams | undefined], any>;
    createPreviousMessageListQuery: jest.Mock<PreviousMessageListQuery, [params?: PreviousMessageListQueryParams | undefined], any>;
    createMessageCollection: jest.Mock<import("@sendbird/chat/groupChannel").MessageCollection, [params?: MessageCollectionParams | undefined], any>;
    addOperators(): Promise<void>;
    removeOperators(): Promise<void>;
    getMyMutedInfo(): Promise<MutedInfo>;
    getMetaData(): Promise<MetaData>;
    getAllMetaData(): Promise<MetaData>;
    createMetaData(): Promise<MetaData>;
    updateMetaData(): Promise<MetaData>;
    deleteMetaData(): Promise<void>;
    deleteAllMetaData(): Promise<void>;
    getMetaCounters(): Promise<MetaCounter>;
    getAllMetaCounters(): Promise<MetaCounter>;
    createMetaCounters(): Promise<MetaCounter>;
    updateMetaCounters(): Promise<MetaCounter>;
    increaseMetaCounters(): Promise<MetaCounter>;
    decreaseMetaCounters(): Promise<MetaCounter>;
    deleteMetaCounter(): Promise<void>;
    deleteAllMetaCounters(): Promise<void>;
    muteUser(): Promise<void>;
    muteUserWithUserId(): Promise<void>;
    unmuteUser(): Promise<void>;
    unmuteUserWithUserId(): Promise<void>;
    banUser(): Promise<void>;
    banUserWithUserId(): Promise<void>;
    unbanUser(): Promise<void>;
    unbanUserWithUserId(): Promise<void>;
    freeze(): Promise<void>;
    unfreeze(): Promise<void>;
    getMessagesByMessageId(): Promise<SendbirdBaseMessage[]>;
    getMessagesByTimestamp(): Promise<SendbirdBaseMessage[]>;
    getMessageChangeLogsSinceTimestamp(): Promise<MessageChangelogs>;
    getMessageChangeLogsSinceToken(): Promise<MessageChangelogs>;
    resendMessage(failedMessage: SendbirdMultipleFilesMessage): MultipleFilesMessageRequestHandler<SendbirdMultipleFilesMessage>;
    resendMessage(failedMessage: SendbirdFileMessage, file?: FileCompat): MessageRequestHandler<SendbirdFileMessage>;
    resendMessage(failedMessage: SendbirdUserMessage): MessageRequestHandler<SendbirdUserMessage>;
    copyMessage(channel: SendbirdGroupChannel, message: SendbirdMultipleFilesMessage): MessageRequestHandler<SendbirdMultipleFilesMessage>;
    copyMessage(channel: SendbirdBaseChannel, message: SendbirdFileMessage): MessageRequestHandler<SendbirdFileMessage>;
    copyMessage(channel: SendbirdBaseChannel, message: SendbirdUserMessage): MessageRequestHandler<SendbirdUserMessage>;
    sendUserMessage(): MessageRequestHandler;
    resendUserMessage(): Promise<SendbirdUserMessage>;
    updateUserMessage(): Promise<SendbirdUserMessage>;
    copyUserMessage(): Promise<SendbirdUserMessage>;
    translateUserMessage(): Promise<SendbirdUserMessage>;
    sendFileMessage(): MessageRequestHandler;
    sendFileMessages(): MessageRequestHandler;
    resendFileMessage(): Promise<SendbirdFileMessage>;
    updateFileMessage(): Promise<SendbirdFileMessage>;
    cancelUploadingFileMessage(): Promise<boolean>;
    copyFileMessage(): Promise<SendbirdFileMessage>;
    deleteMessage(): Promise<void>;
    addReaction(): Promise<ReactionEvent>;
    deleteReaction(): Promise<ReactionEvent>;
    createMessageMetaArrayKeys(): Promise<SendbirdBaseMessage>;
    deleteMessageMetaArrayKeys(): Promise<SendbirdBaseMessage>;
    addMessageMetaArrayValues(): Promise<SendbirdBaseMessage>;
    removeMessageMetaArrayValues(): Promise<SendbirdBaseMessage>;
    report(): Promise<void>;
    reportUser(): Promise<void>;
    reportMessage(): Promise<void>;
    isOpenChannel(): this is SendbirdOpenChannel;
    isGroupChannel(): this is SendbirdGroupChannel;
    isFeedChannel(): this is SendbirdFeedChannel;
    asOpenChannel(): SendbirdOpenChannel;
    asGroupChannel(): SendbirdGroupChannel;
    acceptInvitation: jest.Mock<any, any, any>;
    addMember: jest.Mock<any, any, any>;
    addPollOption: jest.Mock<any, any, any>;
    get cachedUndeliveredMemberState(): object;
    get cachedUnreadMemberState(): object;
    cancelScheduledMessage: jest.Mock<any, any, any>;
    closePoll: jest.Mock<any, any, any>;
    createPollListQuery(): PollListQuery;
    createPollVoterListQuery(): PollVoterListQuery;
    deletePoll(): Promise<void>;
    deletePollOption(): Promise<void>;
    endTyping(): Promise<void>;
    getMyPushTriggerOption(): Promise<PushTriggerOption>;
    getPollChangeLogsSinceTimestamp(): Promise<PollChangelogs>;
    getPollChangeLogsSinceToken(): Promise<PollChangelogs>;
    getReadMembers(): SendbirdMember[];
    getReadStatus(): {
        [p: string]: ReadStatus;
    };
    getTypingUsers(): SendbirdMember[];
    getDeliveryStatus(): {
        [p: string]: DeliveryStatus;
    };
    getUndeliveredMemberCount: jest.Mock<number, [], any>;
    getUnreadMemberCount: jest.Mock<number, [], any>;
    getUnreadMembers: jest.Mock<never[], [], any>;
    hide(): Promise<SendbirdGroupChannel>;
    invalidateTypingStatus(): boolean;
    invite(): Promise<SendbirdGroupChannel>;
    inviteWithUserIds(): Promise<SendbirdGroupChannel>;
    get isHidden(): boolean;
    isReadMessage(): boolean;
    get isTyping(): boolean;
    join(): Promise<SendbirdGroupChannel>;
    leave(): Promise<void>;
    markAsDelivered(): Promise<void>;
    markAsRead(): Promise<void>;
    pinMessage(): Promise<void>;
    removeMember(): boolean;
    resetMyHistory(): Promise<SendbirdGroupChannel>;
    sendScheduledMessageNow(): Promise<void>;
    setMyCountPreference(): Promise<CountPreference>;
    setMyPushTriggerOption(): Promise<PushTriggerOption>;
    startTyping(): Promise<void>;
    unhide(): Promise<SendbirdGroupChannel>;
    unpinMessage(): Promise<void>;
    updatePoll(): Promise<Poll>;
    updatePollOption(): Promise<Poll>;
    updateScheduledFileMessage(): Promise<SendbirdFileMessage>;
    updateScheduledUserMessage(): Promise<SendbirdUserMessage>;
    votePoll(): Promise<PollVoteEvent>;
    createScheduledFileMessage(): MessageRequestHandler;
    createScheduledUserMessage(): MessageRequestHandler;
    declineInvitation(): Promise<SendbirdGroupChannel>;
    get messageCollectionLastAccessedAt(): number;
    createThreadedParentMessageListQuery(): PreviousMessageListQuery;
    createPinnedMessageListQuery(_params?: PinnedMessageListQueryParams | undefined): PinnedMessageListQuery;
    sendMultipleFilesMessage(_params: MultipleFilesMessageCreateParams): MultipleFilesMessageRequestHandler;
    uploadFile(): Promise<FileUploadResult>;
}
export {};
