import type { ImageContentFit, ImageProps } from 'expo-image';
import React from 'react';
import { Image } from 'react-native';

import ExpoInternal from './ExpoInternal';
import type { SendbirdImageComponent, SendbirdImageProps } from './index';

function convertSource(source: SendbirdImageProps['source']): ImageProps['source'] {
  if (Array.isArray(source)) {
    return convertSource(source[0]);
  }

  if (typeof source === 'number') {
    return source;
  }

  return {
    uri: source?.uri,
    headers: source?.headers,
  };
}
function convertDefaultSource(source?: SendbirdImageProps['defaultSource']): ImageProps['placeholder'] {
  if (typeof source === 'number') {
    return source;
  }

  return undefined;
}

function convertResizeMode(mode?: SendbirdImageProps['resizeMode']): ImageContentFit | undefined {
  switch (mode) {
    case 'center':
      return 'cover';
    case 'contain':
      return 'contain';
    case 'cover':
      return 'cover';
    case 'stretch':
      return 'fill';
    default:
      return undefined;
  }
}

const Image_FastImage: SendbirdImageComponent = ({
  source,
  defaultSource,
  resizeMode,
  onLoad,
  onError,
  style,
  tintColor,
  disableFastImage = false,
  ...props
}) => {
  if (disableFastImage) {
    return (
      <Image
        {...props}
        source={source}
        style={[style, { tintColor }]}
        onError={onError && ((e) => onError(e.nativeEvent))}
        onLoad={onLoad && ((e) => onLoad(e.nativeEvent.source))}
      />
    );
  }
  return (
    <ExpoInternal
      {...(props as ImageProps)}
      onLoad={onLoad && ((e) => onLoad(e.source))}
      onError={onError && (() => onError({}))}
      style={style as ImageProps['style']}
      source={convertSource(source)}
      placeholder={convertDefaultSource(defaultSource)}
      contentFit={convertResizeMode(resizeMode)}
    />
  );
};

export default Image_FastImage;
