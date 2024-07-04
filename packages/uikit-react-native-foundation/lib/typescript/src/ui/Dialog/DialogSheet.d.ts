import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import Icon from '../../components/Icon';
type Props = React.PropsWithChildren<{
    style?: StyleProp<ViewStyle>;
}>;
declare const DialogSheet: ((props: Props) => ReactNode) & {
    Item: typeof SheetItem;
};
export type SheetItemProps = {
    icon?: keyof typeof Icon.Assets;
    iconColor?: string;
    title: string;
    titleColor?: string;
    disabled?: boolean;
};
declare const SheetItem: ({ icon, title, iconColor, titleColor, disabled }: SheetItemProps) => React.JSX.Element;
export default DialogSheet;
