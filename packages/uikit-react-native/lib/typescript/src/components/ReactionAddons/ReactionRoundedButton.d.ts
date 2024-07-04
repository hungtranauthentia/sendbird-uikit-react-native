import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    url: string;
    count: number;
    reacted: boolean;
    style: StyleProp<ViewStyle>;
};
declare const ReactionRoundedButton: {
    ({ url, count, reacted, style }: Props): React.JSX.Element;
    More({ pressed }: {
        pressed: boolean;
    }): React.JSX.Element;
};
export default ReactionRoundedButton;
