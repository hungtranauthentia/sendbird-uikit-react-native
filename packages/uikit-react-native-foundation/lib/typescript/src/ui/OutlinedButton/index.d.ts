import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type OutlinedButtonProps = {
    children: string;
    containerStyle?: StyleProp<ViewStyle>;
    onPress?: () => void;
};
declare const OutlinedButton: ({ children, onPress, containerStyle }: OutlinedButtonProps) => React.JSX.Element;
export default OutlinedButton;
