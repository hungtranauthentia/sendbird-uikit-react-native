import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { TextProps } from '../../components/Text';
import type { BaseHeaderProps, HeaderElement } from '../../index';
export type HeaderProps = BaseHeaderProps<{
    title?: HeaderElement;
    left?: HeaderElement;
    right?: HeaderElement;
    onPressLeft?: () => void;
    onPressRight?: () => void;
}, {
    clearTitleMargin?: boolean;
    clearStatusBarTopInset?: boolean;
    statusBarTopInsetAs?: 'padding' | 'margin';
}>;
declare const _default: (({ children, titleAlign, title, left, right, onPressLeft, onPressRight, clearTitleMargin, clearStatusBarTopInset, statusBarTopInsetAs, }: HeaderProps) => React.JSX.Element) & {
    Button: ({ children, disabled, onPress, color, ...props }: TouchableOpacityProps & {
        color?: string | undefined;
    }) => React.JSX.Element;
    Title: ({ children, style, ...props }: TextProps) => React.JSX.Element;
    Subtitle: ({ children, style, ...props }: TextProps) => React.JSX.Element;
};
export default _default;
