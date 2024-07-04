import type * as ExpoAV from 'expo-av';
import type { PlayerServiceInterface } from './types';
type Modules = {
    avModule: typeof ExpoAV;
};
declare const createExpoPlayerService: ({ avModule }: Modules) => PlayerServiceInterface;
export default createExpoPlayerService;
