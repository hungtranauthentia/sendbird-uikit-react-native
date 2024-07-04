import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = React.PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;
declare const DialogBox: ({ style, children }: Props) => React.JSX.Element;
export default DialogBox;
