import * as RNAudioRecorder from 'react-native-audio-recorder-player';
import * as Permissions from 'react-native-permissions';
import type { RecorderServiceInterface } from './types';
type Modules = {
    audioRecorderModule: typeof RNAudioRecorder;
    permissionModule: typeof Permissions;
};
declare const createNativeRecorderService: ({ audioRecorderModule, permissionModule }: Modules) => RecorderServiceInterface;
export default createNativeRecorderService;
