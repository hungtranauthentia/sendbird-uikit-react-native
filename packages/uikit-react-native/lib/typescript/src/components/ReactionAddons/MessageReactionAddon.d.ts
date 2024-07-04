import React from 'react';
import type { SendbirdBaseChannel, SendbirdBaseMessage } from '@sendbird/uikit-utils';
declare const MessageReactionAddon: ({ channel, message }: {
    channel: SendbirdBaseChannel;
    message: SendbirdBaseMessage;
}) => React.JSX.Element | null;
export default MessageReactionAddon;
