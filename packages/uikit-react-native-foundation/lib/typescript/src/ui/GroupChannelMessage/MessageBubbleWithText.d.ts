import React from 'react';
import { SendbirdUserMessage } from '@sendbird/uikit-utils';
import { RegexTextPattern } from '../../components/RegexText';
import type { GroupChannelMessageProps } from './index';
type Props = GroupChannelMessageProps<SendbirdUserMessage, {
    backgroundColor?: string;
    regexTextPatterns?: RegexTextPattern[];
    renderRegexTextChildren?: (message: SendbirdUserMessage) => string;
}>;
declare const MessageBubbleWithText: ({ backgroundColor, message, onPressURL, onLongPress, strings, variant, regexTextPatterns, renderRegexTextChildren, }: Props) => React.JSX.Element;
export default MessageBubbleWithText;
