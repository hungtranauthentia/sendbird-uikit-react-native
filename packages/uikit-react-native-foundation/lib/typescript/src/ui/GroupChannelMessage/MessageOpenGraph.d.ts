import React from 'react';
import type { SendbirdUserMessage } from '@sendbird/uikit-utils';
declare const MessageOpenGraph: ({ onPressURL, onLongPress, ogMetaData, variant, }: {
    ogMetaData: NonNullable<SendbirdUserMessage['ogMetaData']>;
    variant: 'outgoing' | 'incoming';
    onPressURL?: ((url: string) => void) | undefined;
    onLongPress?: (() => void) | undefined;
}) => React.JSX.Element;
export default MessageOpenGraph;
