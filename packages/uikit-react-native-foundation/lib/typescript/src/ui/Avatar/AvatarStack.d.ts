import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = React.PropsWithChildren<{
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
    maxAvatar?: number;
    avatarGap?: number;
    styles?: {
        borderWidth?: number;
        borderColor?: string;
        remainsTextColor?: string;
        remainsBackgroundColor?: string;
    };
}>;
declare const AvatarStack: ({ children, containerStyle, styles, maxAvatar, size, avatarGap, }: Props) => React.JSX.Element;
export default AvatarStack;
