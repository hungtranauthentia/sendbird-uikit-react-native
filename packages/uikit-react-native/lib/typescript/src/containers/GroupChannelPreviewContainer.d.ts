import React from 'react';
import { SendbirdGroupChannel } from '@sendbird/uikit-utils';
type Props = {
    channel: SendbirdGroupChannel;
    onPress: () => void;
    onLongPress: () => void;
};
declare const GroupChannelPreviewContainer: ({ onPress, onLongPress, channel }: Props) => React.JSX.Element;
export default GroupChannelPreviewContainer;
