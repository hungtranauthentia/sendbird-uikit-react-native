/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback, useEffect, useLayoutEffect, useReducer, useRef, useState } from 'react';
const idPool = {};
export const useUniqId = key => {
  return useState(() => {
    if (!idPool[key]) idPool[key] = 1;
    return idPool[key]++;
  })[0];
};
export const useUniqHandlerId = name => {
  const id = useUniqId(name);
  return `${name}_${id}`;
};
export const useForceUpdate = () => {
  const [, updater] = useState(0);
  return useCallback(() => updater(prev => prev + 1), []);
};
export const useAsyncEffect = (asyncEffect, deps) => {
  useEffect(createAsyncEffectCallback(asyncEffect), deps);
};
export const useAsyncLayoutEffect = (asyncEffect, deps) => {
  useLayoutEffect(createAsyncEffectCallback(asyncEffect), deps);
};
export const useIIFE = callback => {
  return iife(callback);
};
const iife = callback => callback();
const createAsyncEffectCallback = asyncEffect => () => {
  const destructor = iife(asyncEffect);
  return () => {
    if (!destructor) return;
    if (destructor instanceof Promise) {
      iife(async () => {
        const awaitedDestructor = await destructor;
        if (awaitedDestructor) awaitedDestructor();
      });
    } else {
      iife(destructor);
    }
  };
};
export const useIsMountedRef = () => {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
export const useIsFirstMount = () => {
  const isFirstMount = useRef(true);
  if (isFirstMount.current) {
    isFirstMount.current = false;
    return true;
  }
  return isFirstMount.current;
};
export const useFreshCallback = callback => {
  const ref = useRef(callback);
  ref.current = callback;
  return useCallback(function () {
    return ref.current(...arguments);
  }, []);
};
export const useDebounceEffect = function (action, delay) {
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const timeoutRef = useRef();
  useEffect(() => {
    timeoutRef.current = setTimeout(async () => {
      try {
        await action();
      } finally {
        timeoutRef.current = undefined;
      }
    }, delay);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = undefined;
      }
    };
  }, [delay, ...deps]);
};
export const usePartialState = initialState => {
  return useReducer((prev, state) => ({
    ...prev,
    ...state
  }), initialState);
};
export const useRefTracker = target => {
  const ref = useRef(target);
  useLayoutEffect(() => {
    ref.current = target;
  });
  return ref;
};
//# sourceMappingURL=index.js.map