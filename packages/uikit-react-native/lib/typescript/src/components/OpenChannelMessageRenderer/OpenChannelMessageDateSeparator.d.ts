import React from 'react';
import type { SendbirdMessage } from '@sendbird/uikit-utils';
declare const OpenChannelMessageDateSeparator: ({ message, prevMessage, }: {
    message: SendbirdMessage;
    prevMessage?: SendbirdMessage | undefined;
}) => React.JSX.Element | null;
export default OpenChannelMessageDateSeparator;