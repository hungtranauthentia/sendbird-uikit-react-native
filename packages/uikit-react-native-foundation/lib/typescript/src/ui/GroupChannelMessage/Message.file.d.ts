import React from 'react';
import { SendbirdFileMessage } from '@sendbird/uikit-utils';
import type { GroupChannelMessageProps } from './index';
type Props = GroupChannelMessageProps<SendbirdFileMessage>;
declare const FileMessage: (props: Props) => React.JSX.Element;
export default FileMessage;
