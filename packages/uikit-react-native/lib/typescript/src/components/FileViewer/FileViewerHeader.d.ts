import React from 'react';
type Props = {
    headerShown?: boolean;
    topInset: number;
    onClose: () => void;
    title: string;
    subtitle: string;
};
declare const FileViewerHeader: ({ headerShown, topInset, onClose, subtitle, title }: Props) => React.JSX.Element | null;
export default FileViewerHeader;
