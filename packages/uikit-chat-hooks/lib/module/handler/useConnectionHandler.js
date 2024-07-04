import { useEffect, useLayoutEffect, useRef } from 'react';
import { ConnectionHandler } from '@sendbird/chat';
import { Logger } from '@sendbird/uikit-utils';
export const useConnectionHandler = (sdk, handlerId, hookHandler) => {
  const handlerRef = useRef();
  useLayoutEffect(() => {
    handlerRef.current = hookHandler;
  });
  useEffect(() => {
    Logger.info('[useConnectionHandler]', handlerId);
    const handler = new ConnectionHandler();
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
    sdk.addConnectionHandler(handlerId, handler);
    return () => sdk.removeConnectionHandler(handlerId);
  }, [sdk, handlerId]);
};
//# sourceMappingURL=useConnectionHandler.js.map