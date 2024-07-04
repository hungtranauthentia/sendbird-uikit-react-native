import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = React.PropsWithChildren<{
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
}>;
declare const AvatarGroup: ({ children, containerStyle, size }: Props) => React.JSX.Element;
export default AvatarGroup;
