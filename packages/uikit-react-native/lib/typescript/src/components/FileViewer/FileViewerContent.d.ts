import React from 'react';
import { FileType } from '@sendbird/uikit-utils';
type Props = {
    type: FileType;
    src: string;
    topInset?: number;
    bottomInset?: number;
    maxZoom?: number;
    minZoom?: number;
    onPress?: () => void;
};
declare const FileViewerContent: ({ type, src, topInset, bottomInset, maxZoom, minZoom, onPress }: Props) => React.JSX.Element;
export default FileViewerContent;
