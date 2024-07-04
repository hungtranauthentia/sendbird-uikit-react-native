import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    size?: number;
    color?: string;
    style?: StyleProp<ViewStyle>;
};
declare const LoadingSpinner: ({ size, color, style }: Props) => React.JSX.Element;
export default LoadingSpinner;
