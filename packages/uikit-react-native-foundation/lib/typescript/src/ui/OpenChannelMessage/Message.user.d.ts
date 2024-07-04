import React from 'react';
import type { SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { OpenChannelMessageProps } from './index';
type Props = {};
declare const UserMessage: (props: OpenChannelMessageProps<SendbirdUserMessage, Props>) => React.JSX.Element;
export default UserMessage;
