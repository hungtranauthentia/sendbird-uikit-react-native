import type * as RNAudioRecorder from 'react-native-audio-recorder-player';
import * as Permissions from 'react-native-permissions';
import type { PlayerServiceInterface } from './types';
type Modules = {
    audioRecorderModule: typeof RNAudioRecorder;
    permissionModule: typeof Permissions;
};
declare const createNativePlayerService: ({ audioRecorderModule, permissionModule }: Modules) => PlayerServiceInterface;
export default createNativePlayerService;
