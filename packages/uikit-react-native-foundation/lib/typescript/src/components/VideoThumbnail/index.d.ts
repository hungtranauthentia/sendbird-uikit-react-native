import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
type Props = {
    source: string;
    fetchThumbnailFromVideoSource: (uri: string) => Promise<{
        path: string;
    } | null>;
    style?: StyleProp<ViewStyle>;
    iconSize?: number;
    /** @deprecated please use `source` prop **/
    videoSource?: string;
};
export declare const VideoThumbnail: ({ fetchThumbnailFromVideoSource, style, source, videoSource, iconSize }: Props) => React.JSX.Element;
export {};
