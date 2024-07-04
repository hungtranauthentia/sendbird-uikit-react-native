import { useEffect, useLayoutEffect, useRef } from 'react';
import { UserEventHandler } from '@sendbird/chat';
import { Logger } from '@sendbird/uikit-utils';
export const useUserEventHandler = (sdk, handlerId, hookHandler) => {
  const handlerRef = useRef(hookHandler);
  useLayoutEffect(() => {
    handlerRef.current = hookHandler;
  });
  useEffect(() => {
    Logger.debug('[useUserEventHandler] hook called by', handlerId);
    const handler = new UserEventHandler();
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
//# sourceMappingURL=useUserEventHandler.js.map