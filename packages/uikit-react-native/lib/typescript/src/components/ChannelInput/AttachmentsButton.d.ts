import React from 'react';
export type AttachmentsButtonProps = {
    onPress: () => void;
    disabled: boolean;
};
declare const AttachmentsButton: ({ onPress, disabled }: AttachmentsButtonProps) => React.JSX.Element;
export default AttachmentsButton;
