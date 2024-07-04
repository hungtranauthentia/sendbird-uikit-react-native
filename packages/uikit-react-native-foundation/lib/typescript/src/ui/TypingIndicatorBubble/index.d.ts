import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import type { SendbirdUser } from '@sendbird/uikit-utils';
type Props = {
    typingUsers: SendbirdUser[];
    containerStyle?: StyleProp<ViewStyle>;
    maxAvatar?: number;
};
declare const TypingIndicatorBubble: ({ typingUsers, containerStyle, maxAvatar }: Props) => React.JSX.Element | null;
export default TypingIndicatorBubble;
