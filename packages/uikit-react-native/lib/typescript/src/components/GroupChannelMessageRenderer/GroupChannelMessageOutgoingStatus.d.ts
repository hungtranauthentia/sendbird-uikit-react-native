import React from 'react';
import type { ImageStyle, StyleProp } from 'react-native';
import type { SendbirdGroupChannel, SendbirdMessage } from '@sendbird/uikit-utils';
type Props = {
    channel: SendbirdGroupChannel;
    message: SendbirdMessage;
    style?: StyleProp<ImageStyle>;
};
declare const _default: React.MemoExoticComponent<({ channel, message, style }: Props) => React.JSX.Element | null>;
export default _default;
