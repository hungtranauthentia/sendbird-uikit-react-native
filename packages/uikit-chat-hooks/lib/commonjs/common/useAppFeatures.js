"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppFeatures = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
const useAppFeatures = sdk => {
  const {
    premiumFeatureList = [],
    applicationAttributes = []
  } = sdk.appInfo ?? {};
  return {
    deliveryReceiptEnabled: premiumFeatureList.includes(_uikitUtils.PremiumFeatures.delivery_receipt),
    broadcastChannelEnabled: applicationAttributes.includes(_uikitUtils.ApplicationAttributes.allow_broadcast_channel),
    superGroupChannelEnabled: applicationAttributes.includes(_uikitUtils.ApplicationAttributes.allow_super_group_channel),
    reactionEnabled: applicationAttributes.includes(_uikitUtils.ApplicationAttributes.reactions)
  };
};
exports.useAppFeatures = useAppFeatures;
//# sourceMappingURL=useAppFeatures.js.map