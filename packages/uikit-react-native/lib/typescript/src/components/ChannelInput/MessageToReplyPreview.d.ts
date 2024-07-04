import React from 'react';
import { SendbirdFileMessage, SendbirdUserMessage } from '@sendbird/uikit-utils';
export type MessageToReplyPreviewProps = {
    messageToReply?: SendbirdFileMessage | SendbirdUserMessage;
    setMessageToReply?: (message?: undefined | SendbirdFileMessage | SendbirdUserMessage) => void;
};
export declare const MessageToReplyPreview: ({ messageToReply, setMessageToReply }: MessageToReplyPreviewProps) => React.JSX.Element | null;
