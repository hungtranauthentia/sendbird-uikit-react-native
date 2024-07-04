import React from 'react';
import { SendbirdMessage } from '@sendbird/uikit-utils';
export declare const GroupChannelTypingIndicatorBubble: () => React.JSX.Element | null;
declare const _default: React.MemoExoticComponent<(props: {
    focused: boolean;
    message: SendbirdMessage;
    prevMessage?: SendbirdMessage | undefined;
    nextMessage?: SendbirdMessage | undefined;
    onPress?: (() => void) | undefined;
    onLongPress?: (() => void) | undefined;
    onPressParentMessage?: ((parentMessage: SendbirdMessage) => void) | undefined;
    onShowUserProfile?: ((user: import("@sendbird/chat/groupChannel").Member | import("@sendbird/chat").User, options?: {
        hideMessageButton?: boolean | undefined;
    } | undefined) => void) | undefined;
    channel: import("@sendbird/chat/groupChannel").GroupChannel;
    currentUserId?: string | undefined;
    enableMessageGrouping: boolean;
    bottomSheetItem?: import("@sendbird/uikit-react-native-foundation").BottomSheetItem | undefined;
    isFirstItem: boolean;
}) => React.ReactElement<any, string | React.JSXElementConstructor<any>> | null>;
export default _default;
