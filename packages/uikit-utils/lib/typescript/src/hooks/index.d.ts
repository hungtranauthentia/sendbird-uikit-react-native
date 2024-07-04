import type { DependencyList } from 'react';
type Destructor = () => void;
type AsyncEffectCallback = () => void | Destructor | Promise<void> | Promise<Destructor>;
export declare const useUniqId: (key: string) => number;
export declare const useUniqHandlerId: (name: string) => string;
export declare const useForceUpdate: () => () => void;
export declare const useAsyncEffect: (asyncEffect: AsyncEffectCallback, deps?: DependencyList) => void;
export declare const useAsyncLayoutEffect: (asyncEffect: AsyncEffectCallback, deps?: DependencyList) => void;
export declare const useIIFE: <T>(callback: () => T) => T;
export declare const useIsMountedRef: () => import("react").MutableRefObject<boolean>;
export declare const useIsFirstMount: () => boolean;
export declare const useFreshCallback: <T extends Function>(callback: T) => T;
export declare const useDebounceEffect: (action: () => void, delay: number, deps?: DependencyList) => void;
export declare const usePartialState: <S>(initialState: S) => [S & Partial<S>, import("react").Dispatch<Partial<S>>];
export declare const useRefTracker: <T>(target: T) => import("react").MutableRefObject<T>;
export {};