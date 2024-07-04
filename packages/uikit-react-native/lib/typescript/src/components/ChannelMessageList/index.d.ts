import React, { Ref } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import { BottomSheetItem } from '@sendbird/uikit-react-native-foundation';
import { SendbirdFileMessage, SendbirdGroupChannel, SendbirdMessage, SendbirdOpenChannel, SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { UserProfileContextType } from '../../contexts/UserProfileCtx';
type HandleableMessage = SendbirdUserMessage | SendbirdFileMessage;
export type ChannelMessageListProps<T extends SendbirdGroupChannel | SendbirdOpenChannel> = {
    enableMessageGrouping: boolean;
    currentUserId?: string;
    channel: T;
    messages: SendbirdMessage[];
    newMessages: SendbirdMessage[];
    searchItem?: {
        startingPoint: number;
    };
    scrolledAwayFromBottom: boolean;
    onScrolledAwayFromBottom: (value: boolean) => void;
    onTopReached: () => void;
    onBottomReached: () => void;
    hasNext: () => boolean;
    onPressNewMessagesButton: (animated?: boolean) => void;
    onPressScrollToBottomButton: (animated?: boolean) => void;
    onEditMessage: (message: HandleableMessage) => void;
    onReplyMessage?: (message: HandleableMessage) => void;
    onDeleteMessage: (message: HandleableMessage) => Promise<void>;
    onResendFailedMessage: (failedMessage: HandleableMessage) => Promise<HandleableMessage | void>;
    onPressParentMessage?: (parentMessage: SendbirdMessage) => void;
    onPressMediaMessage?: (message: SendbirdFileMessage, deleteMessage: () => Promise<void>, uri: string) => void;
    renderMessage: (props: {
        focused: boolean;
        message: SendbirdMessage;
        prevMessage?: SendbirdMessage;
        nextMessage?: SendbirdMessage;
        onPress?: () => void;
        onLongPress?: () => void;
        onPressParentMessage?: ChannelMessageListProps<T>['onPressParentMessage'];
        onShowUserProfile?: UserProfileContextType['show'];
        channel: T;
        currentUserId?: ChannelMessageListProps<T>['currentUserId'];
        enableMessageGrouping: ChannelMessageListProps<T>['enableMessageGrouping'];
        bottomSheetItem?: BottomSheetItem;
        isFirstItem: boolean;
    }) => React.ReactElement | null;
    renderNewMessagesButton: null | ((props: {
        visible: boolean;
        onPress: () => void;
        newMessages: SendbirdMessage[];
    }) => React.ReactElement | null);
    renderScrollToBottomButton: null | ((props: {
        visible: boolean;
        onPress: () => void;
    }) => React.ReactElement | null);
    flatListProps?: Omit<FlatListProps<SendbirdMessage>, 'data' | 'renderItem'>;
} & {
    ref?: Ref<FlatList<SendbirdMessage>> | undefined;
};
declare const _default: <T extends import("@sendbird/chat/openChannel").OpenChannel | import("@sendbird/chat/groupChannel").GroupChannel>({ searchItem, hasNext, channel, onEditMessage, onReplyMessage, onDeleteMessage, onResendFailedMessage, onPressMediaMessage, onPressParentMessage, currentUserId, renderNewMessagesButton, renderScrollToBottomButton, renderMessage, messages, newMessages, enableMessageGrouping, onScrolledAwayFromBottom, scrolledAwayFromBottom, onBottomReached, onTopReached, flatListProps, onPressNewMessagesButton, onPressScrollToBottomButton, }: ChannelMessageListProps<T>, ref: React.ForwardedRef<FlatList<SendbirdMessage>>) => React.JSX.Element;
export default _default;
