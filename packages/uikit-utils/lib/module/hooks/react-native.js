import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const edgePaddingMap = {
  left: 'paddingLeft',
  right: 'paddingRight',
  top: 'paddingTop',
  bottom: 'paddingBottom'
};
export const useSafeAreaPadding = edges => {
  const safeAreaInsets = useSafeAreaInsets();
  return edges.reduce((map, edge) => {
    const paddingKey = edgePaddingMap[edge];
    map[paddingKey] = safeAreaInsets[edge];
    return map;
  }, {});
};
export const useAppState = (type, listener) => {
  const callbackRef = useRef(listener);
  callbackRef.current = listener;
  useEffect(() => {
    const eventListener = state => callbackRef.current(state);
    const subscriber = AppState.addEventListener(type, eventListener);
    return () => {
      if (subscriber !== null && subscriber !== void 0 && subscriber.remove) subscriber.remove();
    };
  }, []);
};

/**
 * To display a new modal in React-Native, you should ensure that a new modal is opened only after the existing modal has been dismissed to avoid conflicts.
 * To achieve this, you can use a deferred onClose that can be awaited until the onDismiss is called.
 * */
export const useDeferredModalState = () => {
  const resolveRef = useRef();
  const [visible, setVisible] = useState(false);
  return {
    onClose: () => {
      return new Promise(resolve => {
        resolveRef.current = resolve;
        setVisible(false);
      });
    },
    onDismiss: () => {
      var _resolveRef$current;
      (_resolveRef$current = resolveRef.current) === null || _resolveRef$current === void 0 ? void 0 : _resolveRef$current.call(resolveRef);
    },
    visible,
    setVisible
  };
};
//# sourceMappingURL=react-native.js.map