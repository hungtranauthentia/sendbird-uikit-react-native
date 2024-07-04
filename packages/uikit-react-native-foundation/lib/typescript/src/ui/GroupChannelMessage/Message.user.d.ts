import React from 'react';
import type { SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { RegexTextPattern } from '../../components/RegexText';
import type { GroupChannelMessageProps } from './index';
type Props = GroupChannelMessageProps<SendbirdUserMessage, {
    regexTextPatterns?: RegexTextPattern[];
    renderRegexTextChildren?: (message: SendbirdUserMessage) => string;
}>;
declare const UserMessage: (props: Props) => React.JSX.Element;
export default UserMessage;
