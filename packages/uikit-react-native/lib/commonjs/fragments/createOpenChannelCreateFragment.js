"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _openChannelCreate = require("../domain/openChannelCreate");
var _useContext = require("../hooks/useContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const createOpenChannelCreateFragment = initModule => {
  const OpenChannelCreateModule = (0, _openChannelCreate.createOpenChannelCreateModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      onBeforeCreateChannel = _uikitUtils.PASS,
      onCreateChannel
    } = _ref;
    const {
      sdk,
      currentUser
    } = (0, _useContext.useSendbirdChat)();
    const {
      palette
    } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
    const [loading, setLoading] = (0, _react.useState)(false);
    const [channelName, setChannelName] = (0, _react.useState)('');
    const [channelCoverFile, setChannelCoverFile] = (0, _react.useState)(undefined);
    const shouldActivateHeaderRight = () => {
      return Boolean(currentUser) && channelName.trim() !== '';
    };
    const onPressHeaderRight = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          const params = {
            name: channelName,
            operatorUserIds: [currentUser.userId]
          };
          if (channelCoverFile) params.coverUrlOrImage = channelCoverFile;
          const processedParams = await onBeforeCreateChannel(params);
          const channel = await sdk.openChannel.createChannel(processedParams);
          setLoading(false);
          onCreateChannel(channel);
        } catch {
          setLoading(false);
        }
      }
    };
    return /*#__PURE__*/_react.default.createElement(OpenChannelCreateModule.Provider, null, /*#__PURE__*/_react.default.createElement(OpenChannelCreateModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: onPressHeaderRight,
      shouldActivateHeaderRight: shouldActivateHeaderRight
    }), /*#__PURE__*/_react.default.createElement(OpenChannelCreateModule.ProfileInput, {
      channelName: channelName,
      onChangeChannelName: setChannelName,
      channelCoverFile: channelCoverFile,
      onChangeChannelCoverFile: setChannelCoverFile
    }), loading && /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Box, {
      backgroundColor: palette.transparent,
      style: _reactNative.StyleSheet.absoluteFill,
      alignItems: 'center',
      justifyContent: 'center'
    }, /*#__PURE__*/_react.default.createElement(OpenChannelCreateModule.StatusLoading, null)));
  };
};
var _default = createOpenChannelCreateFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelCreateFragment.js.map