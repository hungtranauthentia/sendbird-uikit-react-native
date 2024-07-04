import React from 'react';
import { SendbirdFileMessage, SendbirdGroupChannel, SendbirdMessage, SendbirdUserMessage } from '@sendbird/uikit-utils';
type Props = {
    variant: 'outgoing' | 'incoming';
    channel: SendbirdGroupChannel;
    message: SendbirdUserMessage | SendbirdFileMessage;
    childMessage: SendbirdUserMessage | SendbirdFileMessage;
    onPress?: (message: SendbirdMessage) => void;
};
declare const GroupChannelMessageParentMessage: ({ variant, channel, message, childMessage, onPress }: Props) => React.JSX.Element;
export default GroupChannelMessageParentMessage;
