import { ComponentType } from 'react';
import type { ImageProps as NativeImageProps } from 'react-native';
export interface SendbirdImageProps extends Omit<NativeImageProps, 'onLoad' | 'onError'> {
    disableFastImage?: boolean;
    onLoad?: (event: {
        width: number;
        height: number;
    }) => void;
    onError?: (event: {
        error?: unknown;
    }) => void;
    tintColor?: string;
}
export type SendbirdImageComponent = ComponentType<SendbirdImageProps>;
declare const Image: SendbirdImageComponent;
export default Image;
