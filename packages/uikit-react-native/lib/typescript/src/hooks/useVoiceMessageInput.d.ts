import { FileType } from '../platform/types';
type State = {
    /**
     * Status
     *
     * idle:
     *   - cancel(): idle
     *   - startRecording(): recording
     * recording:
     *   - cancel(): idle
     *   - stopRecording(): recording_completed
     *   - send(): recording_completed > idle
     * recording_completed:
     *   - cancel(): idle
     *   - playPlayer(): playing
     *   - send(): idle
     * playing:
     *   - cancel(): idle
     *   - pausePlayer(): playing_paused
     *   - send(): idle
     * playing_paused:
     *   - cancel(): idle
     *   - playPlayer(): playing
     *   - send(): idle
     * */
    status: 'idle' | 'recording' | 'recording_completed' | 'playing' | 'playing_paused';
    recordingTime: {
        currentTime: number;
        minDuration: number;
        maxDuration: number;
    };
    playingTime: {
        currentTime: number;
        duration: number;
    };
};
export interface VoiceMessageInputResult {
    actions: {
        cancel: () => Promise<void>;
        startRecording: () => Promise<void>;
        stopRecording: () => Promise<void>;
        playPlayer: () => Promise<void>;
        pausePlayer: () => Promise<void>;
        send: () => Promise<void>;
    };
    state: State;
}
type Props = {
    onClose: () => Promise<void>;
    onSend: (voiceFile: FileType, duration: number) => void;
};
declare const useVoiceMessageInput: ({ onSend, onClose }: Props) => VoiceMessageInputResult;
export default useVoiceMessageInput;
