import React from 'react';
import type { SendbirdFileMessage } from '@sendbird/uikit-utils';
import type { GroupChannelMessageProps } from './index';
export type VoiceFileMessageState = {
    status: 'preparing' | 'playing' | 'paused';
    currentTime: number;
    duration: number;
};
type Props = GroupChannelMessageProps<SendbirdFileMessage, {
    durationMetaArrayKey?: string;
    onUnmount: () => void;
}>;
declare const VoiceFileMessage: (props: Props) => React.JSX.Element;
export default VoiceFileMessage;
