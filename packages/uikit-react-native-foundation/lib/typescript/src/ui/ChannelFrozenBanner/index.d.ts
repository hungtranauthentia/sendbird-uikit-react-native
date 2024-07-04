import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    style?: StyleProp<ViewStyle>;
    text?: string;
    textColor?: string;
    backgroundColor?: string;
};
declare const ChannelFrozenBanner: ({ text, backgroundColor, textColor, style }: Props) => React.JSX.Element;
export default ChannelFrozenBanner;
