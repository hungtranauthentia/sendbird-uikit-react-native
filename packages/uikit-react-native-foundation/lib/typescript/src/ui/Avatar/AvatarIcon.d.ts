import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from '../../components/Icon';
type Props = {
    icon: keyof typeof Icon.Assets;
    size?: number;
    backgroundColor?: string;
    containerStyle?: StyleProp<ViewStyle>;
};
declare const AvatarIcon: ({ size, icon, containerStyle, backgroundColor }: Props) => React.JSX.Element;
export default AvatarIcon;
