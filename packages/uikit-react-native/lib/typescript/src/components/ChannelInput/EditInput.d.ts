import React from 'react';
import { NativeSyntheticEvent, TextInput as RNTextInput, TextInputSelectionChangeEventData } from 'react-native';
import type { SendbirdFileMessage, SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { MentionedUser } from '../../types';
import type { ChannelInputProps } from './index';
interface EditInputProps extends ChannelInputProps {
    text: string;
    onChangeText: (val: string) => void;
    messageToEdit: SendbirdUserMessage | SendbirdFileMessage;
    setMessageToEdit: (msg?: SendbirdUserMessage | SendbirdFileMessage) => void;
    onSelectionChange: (e: NativeSyntheticEvent<TextInputSelectionChangeEventData>) => void;
    autoFocus: boolean;
    mentionedUsers: MentionedUser[];
}
declare const EditInput: React.ForwardRefExoticComponent<EditInputProps & React.RefAttributes<RNTextInput>>;
export default EditInput;
