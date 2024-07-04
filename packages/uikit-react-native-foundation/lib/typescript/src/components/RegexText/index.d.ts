import React, { ReactNode } from 'react';
import { TextProps } from '../Text';
export interface RegexTextPattern {
    regex: RegExp;
    replacer(params: {
        match: string;
        groups: string[];
        index: number;
        keyPrefix: string;
        parentProps?: TextProps;
    }): string | ReactNode;
}
type Props = {
    patterns: RegexTextPattern[];
} & TextProps;
declare const RegexText: ({ children, patterns, ...props }: Props) => React.JSX.Element;
export default RegexText;
