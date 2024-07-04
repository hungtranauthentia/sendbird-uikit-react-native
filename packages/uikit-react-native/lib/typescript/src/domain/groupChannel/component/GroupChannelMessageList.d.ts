import React from 'react';
declare const _default: React.MemoExoticComponent<(props: Pick<import("../../../components/ChannelMessageList").ChannelMessageListProps<import("@sendbird/chat/groupChannel").GroupChannel>, "channel" | "onTopReached" | "onBottomReached" | "onScrolledAwayFromBottom" | "currentUserId" | "enableMessageGrouping" | "searchItem" | "hasNext" | "onDeleteMessage" | "onResendFailedMessage" | "onPressMediaMessage" | "renderNewMessagesButton" | "renderScrollToBottomButton" | "renderMessage" | "messages" | "newMessages" | "scrolledAwayFromBottom" | "flatListProps"> & {
    onResetMessageList: () => Promise<void>;
    onResetMessageListWithStartingPoint: (startingPoint: number) => Promise<void>;
    onUpdateSearchItem: (searchItem?: {
        startingPoint: number;
    } | undefined) => void;
}) => React.JSX.Element>;
export default _default;
