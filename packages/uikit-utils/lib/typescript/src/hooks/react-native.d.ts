/// <reference types="react" />
import { AppStateEvent, AppStateStatus } from 'react-native';
import { EdgeInsets } from 'react-native-safe-area-context';
type EdgePaddingMap = {
    left: 'paddingLeft';
    right: 'paddingRight';
    top: 'paddingTop';
    bottom: 'paddingBottom';
};
export declare const useSafeAreaPadding: <T extends keyof EdgeInsets, Result extends { [key in EdgePaddingMap[T]]: EdgeInsets[T]; }>(edges: T[]) => Result;
type AppStateListener = (status: AppStateStatus) => void;
export declare const useAppState: (type: AppStateEvent, listener: AppStateListener) => void;
/**
 * To display a new modal in React-Native, you should ensure that a new modal is opened only after the existing modal has been dismissed to avoid conflicts.
 * To achieve this, you can use a deferred onClose that can be awaited until the onDismiss is called.
 * */
export declare const useDeferredModalState: () => {
    onClose: () => Promise<void>;
    onDismiss: () => void;
    visible: boolean;
    setVisible: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
export {};
