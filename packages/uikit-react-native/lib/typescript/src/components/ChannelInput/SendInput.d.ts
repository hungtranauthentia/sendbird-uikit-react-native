import React from 'react';
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputSelectionChangeEventData } from 'react-native';
import type { MentionedUser } from '../../types';
import type { ChannelInputProps } from './index';
interface SendInputProps extends ChannelInputProps {
    text: string;
    onChangeText: (val: string) => void;
    onSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
    mentionedUsers: MentionedUser[];
}
declare const SendInput: React.ForwardRefExoticComponent<SendInputProps & React.RefAttributes<RNTextInput>>;
export default SendInput;
