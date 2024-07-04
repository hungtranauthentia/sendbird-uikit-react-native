import React, { useEffect } from 'react';
import { useAppState } from '@sendbird/uikit-utils';
export const PlatformServiceContext = /*#__PURE__*/React.createContext(null);
export const PlatformServiceProvider = _ref => {
  let {
    children,
    voiceMessageConfig,
    ...services
  } = _ref;
  useEffect(() => {
    services.recorderService.options.minDuration = voiceMessageConfig.recorder.minDuration;
    services.recorderService.options.maxDuration = voiceMessageConfig.recorder.maxDuration;
  }, [voiceMessageConfig]);
  useAppState('change', state => {
    if (state !== 'active') {
      Promise.allSettled([services.playerService.reset(), services.recorderService.reset()]);
    }
  });
  return /*#__PURE__*/React.createElement(PlatformServiceContext.Provider, {
    value: services
  }, children);
};
//# sourceMappingURL=PlatformServiceCtx.js.map