export interface VoiceMessageConfigInterface {
    recorder: {
        minDuration: number;
        maxDuration: number;
    };
}
declare class VoiceMessageConfig {
    private _config;
    static DEFAULT: {
        RECORDER: {
            MIN_DURATION: number;
            MAX_DURATION: number;
            EXTENSION: string;
            BIT_RATE: number;
            SAMPLE_RATE: number;
            CHANNELS: number;
        };
    };
    constructor(_config: VoiceMessageConfigInterface);
    get recorder(): {
        minDuration: number;
        maxDuration: number;
    };
}
export default VoiceMessageConfig;
