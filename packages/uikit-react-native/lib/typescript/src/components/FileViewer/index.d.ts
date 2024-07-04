import React from 'react';
import type { SendbirdFileMessage } from '@sendbird/uikit-utils';
type Props = {
    fileMessage: SendbirdFileMessage;
    deleteMessage: () => Promise<void>;
    onClose: () => void;
    onPressDownload?: (message: SendbirdFileMessage) => void;
    onPressDelete?: (message: SendbirdFileMessage) => void;
    headerShown?: boolean;
    headerTopInset?: number;
    /** This prop is only available on the Image viewer */
    minZoom?: number;
    /** This prop is only available on the Image viewer */
    maxZoom?: number;
};
declare const FileViewer: ({ headerShown, maxZoom, minZoom, headerTopInset, fileMessage, onClose, onPressDownload, onPressDelete, deleteMessage, }: Props) => React.JSX.Element;
export default FileViewer;
