"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ChannelInput = _interopRequireDefault(require("../../../components/ChannelInput"));
var _constants = require("../../../constants");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenChannelInput = _ref => {
  let {
    inputDisabled = false,
    ...props
  } = _ref;
  const {
    sdk,
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const {
    channel,
    messageToEdit,
    setMessageToEdit,
    keyboardAvoidOffset = 0
  } = (0, _react.useContext)(_moduleContext.OpenChannelContexts.Fragment);
  const [chatAvailableState, setChatAvailableState] = (0, _react.useState)({
    frozen: false,
    muted: false,
    disabled: false
  });
  const updateChatAvailableState = (0, _react.useCallback)(baseChannel => {
    if (baseChannel.isOpenChannel()) {
      const userId = (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? _constants.UNKNOWN_USER_ID;
      (0, _uikitUtils.getOpenChannelChatAvailableState)(baseChannel, userId).then(setChatAvailableState);
    }
  }, [currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId]);
  (0, _react.useEffect)(() => {
    updateChatAvailableState(channel);
  }, [channel, updateChatAvailableState]);
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('OpenChannelInput');
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onChannelFrozen(channel) {
      updateChatAvailableState(channel);
    },
    onChannelUnfrozen(channel) {
      updateChatAvailableState(channel);
    },
    onUserMuted(channel) {
      updateChatAvailableState(channel);
    },
    onUserUnmuted(channel) {
      updateChatAvailableState(channel);
    },
    onOperatorUpdated(channel) {
      updateChatAvailableState(channel);
    }
  }, 'open');
  return /*#__PURE__*/_react.default.createElement(_ChannelInput.default, _extends({
    channel: channel,
    messageToEdit: messageToEdit,
    setMessageToEdit: setMessageToEdit,
    keyboardAvoidOffset: keyboardAvoidOffset,
    inputMuted: chatAvailableState.muted,
    inputFrozen: chatAvailableState.frozen,
    inputDisabled: chatAvailableState.disabled ? true : inputDisabled
  }, props));
};
var _default = /*#__PURE__*/_react.default.memo(OpenChannelInput);
exports.default = _default;
//# sourceMappingURL=OpenChannelInput.js.map