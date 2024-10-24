import { ComponentType } from 'react';
import type { ImageProps as NativeImageProps } from 'react-native';
import { NativeModules } from 'react-native';

export interface SendbirdImageProps extends Omit<NativeImageProps, 'onLoad' | 'onError'> {
  disableFastImage?: boolean;
  onLoad?: (event: { width: number; height: number }) => void;
  onError?: (event: { error?: unknown }) => void;
  tintColor?: string;
  /**
   * Changing this prop resets the image view content to blank or a placeholder before loading and rendering the final image.
   * This is especially useful for any kinds of recycling views like [FlashList](https://github.com/shopify/flash-list)
   * to prevent showing the previous source before the new one fully loads.
   * @default null
   * @platform android
   * @platform ios
   */
  recyclingKey?: string | null;
}

export type SendbirdImageComponent = ComponentType<SendbirdImageProps>;
function getImageModule(): SendbirdImageComponent {
  const expoImage = require('expo-image')?.Image;
  const hasExpoImage = expoImage !== undefined && expoImage !== null;
  const hasFastImage = Boolean(NativeModules.FastImageView);

  if (hasExpoImage) {
    try {
      return require('./Image.expoimage').default;
    } catch (e) {
      return require('./Image.reactnative').default;
    }
  } else if (hasFastImage) {
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
