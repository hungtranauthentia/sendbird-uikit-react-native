type FixtureContext = {
    get date(): number;
    get increment(): number;
    increaseIncrement(): void;
    getHash(): string;
    getRandom(): number;
};
export declare const createTestContext: <T>(additionalContext?: T | undefined) => FixtureContext & T;
export {};
