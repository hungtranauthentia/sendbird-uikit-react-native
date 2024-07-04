import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
type Props = {
    current: number;
    total: number;
    trackColor?: string;
    barColor?: string;
    overlay?: ReactNode | undefined;
    style?: ViewStyle;
};
declare const ProgressBar: ({ current, total, trackColor, barColor, overlay, style }: Props) => React.JSX.Element;
export default ProgressBar;
