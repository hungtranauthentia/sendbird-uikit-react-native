"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePushTrigger = void 0;
var _react = require("react");
var _chat = require("@sendbird/chat");
var _uikitUtils = require("@sendbird/uikit-utils");
const PushTriggerMap = {
  'all': _chat.PushTriggerOption.ALL,
  'mention_only': _chat.PushTriggerOption.MENTION_ONLY,
  'off': _chat.PushTriggerOption.OFF,
  'default': _chat.PushTriggerOption.DEFAULT
};
const usePushTrigger = sdk => {
  const [option, setOption] = (0, _react.useState)(_chat.PushTriggerOption.DEFAULT);
  const updateOption = (0, _react.useCallback)(async value => {
    try {
      const _option = PushTriggerMap[value];
      await sdk.setPushTriggerOption(_option).then(() => setOption(_option));
    } catch (e) {
      _uikitUtils.Logger.warn('[usePushTrigger]', 'Cannot update push trigger option', e);
    }
  }, [sdk, sdk.currentUser]);
  (0, _uikitUtils.useAsyncEffect)(async () => {
    setOption(await sdk.getPushTriggerOption());
  }, [sdk, sdk.currentUser]);
  return {
    option,
    updateOption
  };
};
exports.usePushTrigger = usePushTrigger;
//# sourceMappingURL=usePushTrigger.js.map