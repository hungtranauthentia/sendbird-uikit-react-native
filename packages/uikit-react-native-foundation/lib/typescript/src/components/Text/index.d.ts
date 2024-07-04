import React from 'react';
import { TextProps as RNTextProps } from 'react-native';
import type { TypoName, UIKitTheme } from '../../types';
type TypographyProps = Partial<Record<TypoName, boolean>>;
export type TextProps = RNTextProps & TypographyProps & {
    color?: ((colors: UIKitTheme['colors']) => string) | string;
};
declare const Text: ({ children, color, style, ...props }: TextProps) => React.JSX.Element;
export default Text;
