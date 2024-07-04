"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useChannelHandler = void 0;
var _react = require("react");
var _groupChannel = require("@sendbird/chat/groupChannel");
var _openChannel = require("@sendbird/chat/openChannel");
const useChannelHandler = function (sdk, handlerId, hookHandler) {
  let type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'group';
  const handlerRef = (0, _react.useRef)(hookHandler);
  (0, _react.useLayoutEffect)(() => {
    handlerRef.current = hookHandler;
  });
  (0, _react.useEffect)(() => {
    const handlerMapper = handler => {
      const handlerKeys = Object.keys(handler);
      handlerKeys.forEach(key => {
        // @ts-ignore
        handler[key] = function () {
          var _handlerRef$current, _handlerRef$current$k;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return (_handlerRef$current = handlerRef.current) === null || _handlerRef$current === void 0 ? void 0 : (_handlerRef$current$k = _handlerRef$current[key]) === null || _handlerRef$current$k === void 0 ? void 0 : _handlerRef$current$k.call(_handlerRef$current, ...args);
        };
      });
      return handler;
    };
    if (type === 'group') {
      sdk.groupChannel.addGroupChannelHandler(handlerId, handlerMapper(new _groupChannel.GroupChannelHandler()));
    } else if (type === 'open') {
      sdk.openChannel.addOpenChannelHandler(handlerId, handlerMapper(new _openChannel.OpenChannelHandler()));
    }
    return () => {
      if (type === 'group') {
        sdk.groupChannel.removeGroupChannelHandler(handlerId);
      } else if (type === 'open') {
        sdk.openChannel.removeOpenChannelHandler(handlerId);
      }
    };
  }, [sdk, handlerId]);
};
exports.useChannelHandler = useChannelHandler;
//# sourceMappingURL=useChannelHandler.js.map