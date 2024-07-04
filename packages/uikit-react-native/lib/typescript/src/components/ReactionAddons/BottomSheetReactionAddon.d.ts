import React from 'react';
import { SendbirdBaseChannel, SendbirdBaseMessage } from '@sendbird/uikit-utils';
type Props = {
    onClose: () => Promise<void>;
    channel: SendbirdBaseChannel;
    message: SendbirdBaseMessage;
};
declare const BottomSheetReactionAddon: ({ onClose, message, channel }: Props) => React.JSX.Element;
export default BottomSheetReactionAddon;
