"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserEventHandler = void 0;
var _react = require("react");
var _chat = require("@sendbird/chat");
var _uikitUtils = require("@sendbird/uikit-utils");
const useUserEventHandler = (sdk, handlerId, hookHandler) => {
  const handlerRef = (0, _react.useRef)(hookHandler);
  (0, _react.useLayoutEffect)(() => {
    handlerRef.current = hookHandler;
  });
  (0, _react.useEffect)(() => {
    _uikitUtils.Logger.debug('[useUserEventHandler] hook called by', handlerId);
    const handler = new _chat.UserEventHandler();
    const handlerKeys = Object.keys(handler);
    handlerKeys.forEach(key => {
      handler[key] = function () {
        var _handlerRef$current$k, _handlerRef$current;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        // @ts-ignore
        (_handlerRef$current$k = (_handlerRef$current = handlerRef.current)[key]) === null || _handlerRef$current$k === void 0 ? void 0 : _handlerRef$current$k.call(_handlerRef$current, ...args);
      };
    });
    sdk.addUserEventHandler(handlerId, handler);
    return () => sdk.removeUserEventHandler(handlerId);
  }, [sdk, handlerId]);
};
exports.useUserEventHandler = useUserEventHandler;
//# sourceMappingURL=useUserEventHandler.js.map