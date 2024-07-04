import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    uri: string;
    username: string;
    button?: ReactNode;
    bodyLabel: string;
    body: string;
    containerStyle?: StyleProp<ViewStyle>;
};
declare const ProfileCard: ({ uri, username, bodyLabel, body, button, containerStyle }: Props) => React.JSX.Element;
export default ProfileCard;
