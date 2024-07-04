import React from 'react';
import Icon from '../../components/Icon';
type Props = {
    customCover?: React.ReactNode;
    coverUrl: string;
    title: string;
    titleCaption: string;
    titleCaptionLeft?: React.ReactNode;
    bodyIcon?: keyof typeof Icon.Assets;
    body: string;
    memberCount?: number;
    badgeCount: number;
    maxBadgeCount?: number;
    frozen?: boolean;
    notificationOff?: boolean;
    broadcast?: boolean;
    mentioned?: boolean;
    mentionTrigger?: string;
};
declare const GroupChannelPreview: ({ customCover, coverUrl, memberCount, badgeCount, maxBadgeCount, body, bodyIcon, title, titleCaption, titleCaptionLeft, frozen, notificationOff, broadcast, mentioned, mentionTrigger, }: Props) => React.JSX.Element;
export default GroupChannelPreview;