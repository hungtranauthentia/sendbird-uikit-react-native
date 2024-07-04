import React from 'react';
type Props = {
    bottomInset: number;
    deleteShown: boolean;
    onPressDelete: () => void;
    onPressDownload: () => void;
};
declare const FileViewerFooter: ({ bottomInset, deleteShown, onPressDelete, onPressDownload }: Props) => React.JSX.Element;
export default FileViewerFooter;
