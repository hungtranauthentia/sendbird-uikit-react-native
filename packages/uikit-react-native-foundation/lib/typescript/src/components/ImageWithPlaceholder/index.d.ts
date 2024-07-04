import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    source: number | {
        uri: string;
    };
    width?: number | string;
    height?: number | string;
    style?: StyleProp<ViewStyle>;
};
declare const ImageWithPlaceholder: (props: Props) => React.JSX.Element;
export default ImageWithPlaceholder;
