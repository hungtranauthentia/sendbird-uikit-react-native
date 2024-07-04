import React from 'react';
import { SendbirdFileMessage } from '@sendbird/uikit-utils';
import type { OpenChannelMessageProps } from './index';
type Props = {};
declare const FileMessage: (props: OpenChannelMessageProps<SendbirdFileMessage, Props>) => React.JSX.Element;
export default FileMessage;
