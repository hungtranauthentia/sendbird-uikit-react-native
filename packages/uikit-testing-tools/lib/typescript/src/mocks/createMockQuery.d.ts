/// <reference types="jest" />
import type { GetMockParams } from '../types';
type QueryType = 'message' | 'user' | 'openChannel' | 'groupChannel';
type Params = GetMockParams<{
    type: QueryType;
    dataLength?: number;
    limit?: number;
}>;
export declare const createMockQuery: <T>(params: Params) => {
    readonly context: {
        data: T[];
        limit: number;
        cursor: number;
        loading: boolean;
    };
    readonly limit: number;
    readonly isLoading: boolean;
    readonly hasNext: boolean;
    next: jest.Mock<Promise<T[]>, [], any>;
};
export {};
