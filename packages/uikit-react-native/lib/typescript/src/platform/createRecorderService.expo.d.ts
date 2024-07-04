import * as ExpoAV from 'expo-av';
import type { RecorderServiceInterface } from './types';
type Modules = {
    avModule: typeof ExpoAV;
};
declare const createExpoRecorderService: ({ avModule }: Modules) => RecorderServiceInterface;
export default createExpoRecorderService;
