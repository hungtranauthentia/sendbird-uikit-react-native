"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSafeAreaPadding = exports.useDeferredModalState = exports.useAppState = void 0;
var _react = require("react");
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
const edgePaddingMap = {
  left: 'paddingLeft',
  right: 'paddingRight',
  top: 'paddingTop',
  bottom: 'paddingBottom'
};
const useSafeAreaPadding = edges => {
  const safeAreaInsets = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return edges.reduce((map, edge) => {
    const paddingKey = edgePaddingMap[edge];
    map[paddingKey] = safeAreaInsets[edge];
    return map;
  }, {});
};
exports.useSafeAreaPadding = useSafeAreaPadding;
const useAppState = (type, listener) => {
  const callbackRef = (0, _react.useRef)(listener);
  callbackRef.current = listener;
  (0, _react.useEffect)(() => {
    const eventListener = state => callbackRef.current(state);
    const subscriber = _reactNative.AppState.addEventListener(type, eventListener);
    return () => {
      if (subscriber !== null && subscriber !== void 0 && subscriber.remove) subscriber.remove();
    };
  }, []);
};

/**
 * To display a new modal in React-Native, you should ensure that a new modal is opened only after the existing modal has been dismissed to avoid conflicts.
 * To achieve this, you can use a deferred onClose that can be awaited until the onDismiss is called.
 * */
exports.useAppState = useAppState;
const useDeferredModalState = () => {
  const resolveRef = (0, _react.useRef)();
  const [visible, setVisible] = (0, _react.useState)(false);
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
exports.useDeferredModalState = useDeferredModalState;
//# sourceMappingURL=react-native.js.map