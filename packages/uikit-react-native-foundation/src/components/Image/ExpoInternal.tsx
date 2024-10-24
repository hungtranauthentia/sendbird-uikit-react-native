import type { ImageProps } from 'expo-image';
import type { ReactNode } from 'react';

let ExpoInternal: (props: ImageProps) => ReactNode | null = () => null;

try {
  ExpoInternal = require('expo-image').Image as (props: ImageProps) => ReactNode;
} catch {}

export default ExpoInternal;
