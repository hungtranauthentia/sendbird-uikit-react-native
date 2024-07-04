import 'react-native';
export declare const PromisePolyfill: {
    allSettled<T extends [] | readonly unknown[]>(values: T): Promise<{ -readonly [P in keyof T]: PromiseSettledResult<Awaited<T[P]>>; }>;
    race<T_1>(values: Iterable<T_1 | PromiseLike<T_1>>): Promise<Awaited<T_1>>;
    any<T_2>(values: Iterable<T_2 | PromiseLike<T_2>>): Promise<Awaited<T_2>>;
    apply(): void;
};
