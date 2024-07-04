"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUniqId = exports.useUniqHandlerId = exports.useRefTracker = exports.usePartialState = exports.useIsMountedRef = exports.useIsFirstMount = exports.useIIFE = exports.useFreshCallback = exports.useForceUpdate = exports.useDebounceEffect = exports.useAsyncLayoutEffect = exports.useAsyncEffect = void 0;
var _react = require("react");
/* eslint-disable @typescript-eslint/no-explicit-any */

const idPool = {};
const useUniqId = key => {
  return (0, _react.useState)(() => {
    if (!idPool[key]) idPool[key] = 1;
    return idPool[key]++;
  })[0];
};
exports.useUniqId = useUniqId;
const useUniqHandlerId = name => {
  const id = useUniqId(name);
  return `${name}_${id}`;
};
exports.useUniqHandlerId = useUniqHandlerId;
const useForceUpdate = () => {
  const [, updater] = (0, _react.useState)(0);
  return (0, _react.useCallback)(() => updater(prev => prev + 1), []);
};
exports.useForceUpdate = useForceUpdate;
const useAsyncEffect = (asyncEffect, deps) => {
  (0, _react.useEffect)(createAsyncEffectCallback(asyncEffect), deps);
};
exports.useAsyncEffect = useAsyncEffect;
const useAsyncLayoutEffect = (asyncEffect, deps) => {
  (0, _react.useLayoutEffect)(createAsyncEffectCallback(asyncEffect), deps);
};
exports.useAsyncLayoutEffect = useAsyncLayoutEffect;
const useIIFE = callback => {
  return iife(callback);
};
exports.useIIFE = useIIFE;
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
const useIsMountedRef = () => {
  const isMounted = (0, _react.useRef)(true);
  (0, _react.useEffect)(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return isMounted;
};
exports.useIsMountedRef = useIsMountedRef;
const useIsFirstMount = () => {
  const isFirstMount = (0, _react.useRef)(true);
  if (isFirstMount.current) {
    isFirstMount.current = false;
    return true;
  }
  return isFirstMount.current;
};
exports.useIsFirstMount = useIsFirstMount;
const useFreshCallback = callback => {
  const ref = (0, _react.useRef)(callback);
  ref.current = callback;
  return (0, _react.useCallback)(function () {
    return ref.current(...arguments);
  }, []);
};
exports.useFreshCallback = useFreshCallback;
const useDebounceEffect = function (action, delay) {
  let deps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  const timeoutRef = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
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
exports.useDebounceEffect = useDebounceEffect;
const usePartialState = initialState => {
  return (0, _react.useReducer)((prev, state) => ({
    ...prev,
    ...state
  }), initialState);
};
exports.usePartialState = usePartialState;
const useRefTracker = target => {
  const ref = (0, _react.useRef)(target);
  (0, _react.useLayoutEffect)(() => {
    ref.current = target;
  });
  return ref;
};
exports.useRefTracker = useRefTracker;
//# sourceMappingURL=index.js.map