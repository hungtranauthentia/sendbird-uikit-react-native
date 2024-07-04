import React from 'react';
import type { UIKitTheme } from '../types';
type Props = React.PropsWithChildren<{
    theme?: UIKitTheme;
}>;
declare const UIKitThemeProvider: ({ children, theme }: Props) => React.JSX.Element;
export default UIKitThemeProvider;
