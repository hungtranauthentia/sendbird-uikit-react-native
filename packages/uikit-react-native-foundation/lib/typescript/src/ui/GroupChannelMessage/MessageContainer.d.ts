import React from 'react';
import type { SendbirdMessage } from '@sendbird/uikit-utils';
import type { GroupChannelMessageProps } from './index';
type Props = GroupChannelMessageProps<SendbirdMessage>;
declare const MessageContainer: {
    (props: Props): React.JSX.Element;
    Incoming({ children, groupedWithNext, groupedWithPrev, message, onPressAvatar, strings, parentMessage, }: Props): React.JSX.Element;
    Outgoing({ children, message, groupedWithNext, strings, sendingStatus, parentMessage, }: Props): React.JSX.Element;
};
export default MessageContainer;
