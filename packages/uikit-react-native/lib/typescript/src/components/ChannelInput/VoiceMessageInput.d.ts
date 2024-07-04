import React from 'react';
import type { FileType } from '../../platform/types';
export type VoiceMessageInputProps = {
    onClose: () => Promise<void>;
    onSend: (params: {
        file: FileType;
        duration: number;
    }) => void;
};
declare const VoiceMessageInput: ({ onClose, onSend }: VoiceMessageInputProps) => React.JSX.Element;
export default VoiceMessageInput;
