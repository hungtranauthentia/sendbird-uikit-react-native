import React from 'react';
import type { SendbirdFileMessage } from '@sendbird/uikit-utils';
import type { GroupChannelMessageProps } from './index';
type Props = GroupChannelMessageProps<SendbirdFileMessage, {
    fetchThumbnailFromVideoSource: (uri: string) => Promise<{
        path: string;
    } | null>;
}>;
declare const VideoFileMessage: (props: Props) => React.JSX.Element;
export default VideoFileMessage;
