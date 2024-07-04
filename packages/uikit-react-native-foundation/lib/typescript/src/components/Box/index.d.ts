import React from 'react';
import { ViewProps, ViewStyle } from 'react-native';
import type { UIKitColors, UIKitPalette } from '../../types';
type BaseBoxProps = Pick<ViewStyle, 'flex' | 'flexShrink' | 'flexGrow' | 'flexDirection' | 'alignItems' | 'justifyContent' | 'borderRadius' | 'borderWidth' | 'borderColor' | 'borderBottomColor' | 'borderBottomWidth' | 'margin' | 'marginHorizontal' | 'marginVertical' | 'marginLeft' | 'marginRight' | 'marginTop' | 'marginBottom' | 'padding' | 'paddingHorizontal' | 'paddingVertical' | 'paddingLeft' | 'paddingRight' | 'paddingTop' | 'paddingBottom' | 'overflow' | 'width' | 'height'> & {
    backgroundColor?: string | ((theme: {
        colors: UIKitColors;
        palette: UIKitPalette;
    }) => string);
};
type BoxProps = BaseBoxProps & ViewProps;
declare const Box: ({ style, children, ...props }: BoxProps) => React.JSX.Element;
export default Box;
