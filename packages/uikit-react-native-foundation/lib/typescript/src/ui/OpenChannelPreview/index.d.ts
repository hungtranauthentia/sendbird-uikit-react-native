import React from 'react';
type Props = {
    customCover?: React.ReactNode;
    coverUrl: string;
    title: string;
    participantsCount?: number;
    frozen?: boolean;
};
declare const OpenChannelPreview: ({ customCover, coverUrl, participantsCount, title, frozen }: Props) => React.JSX.Element;
export default OpenChannelPreview;
