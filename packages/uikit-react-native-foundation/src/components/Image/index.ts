import { ComponentType } from 'react';
import type { ImageProps as NativeImageProps } from 'react-native';
import { NativeModules } from 'react-native';

export interface SendbirdImageProps extends Omit<NativeImageProps, 'onLoad' | 'onError'> {
  disableFastImage?: boolean;
  onLoad?: (event: { width: number; height: number }) => void;
  onError?: (event: { error?: unknown }) => void;
  tintColor?: string;
}

export type SendbirdImageComponent = ComponentType<SendbirdImageProps>;
function getImageModule(): SendbirdImageComponent {
  const hasFastImage = Boolean(NativeModules.FastImageView);
  if (hasFastImage) {
    try {
      return require('./Image.fastimage').default;
    } catch (e) {
      return require('./Image.reactnative').default;
    }
  } else {
    return require('./Image.reactnative').default;
  }
}

const Image = getImageModule();

export default Image;
