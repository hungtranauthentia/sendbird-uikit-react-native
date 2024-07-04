"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenChannelContextsProvider = exports.OpenChannelContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OpenChannelContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    headerTitle: '',
    channel: {},
    setMessageToEdit: _uikitUtils.NOOP
  }),
  PubSub: /*#__PURE__*/(0, _react.createContext)({
    publish: _uikitUtils.NOOP,
    subscribe: () => _uikitUtils.NOOP
  })
};
exports.OpenChannelContexts = OpenChannelContexts;
const OpenChannelContextsProvider = _ref => {
  let {
    children,
    channel,
    keyboardAvoidOffset,
    openChannelPubSub
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const [messageToEdit, setMessageToEdit] = (0, _react.useState)();
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(OpenChannelContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL.HEADER_TITLE(channel),
      channel,
      keyboardAvoidOffset,
      messageToEdit,
      setMessageToEdit
    }
  }, /*#__PURE__*/_react.default.createElement(OpenChannelContexts.PubSub.Provider, {
    value: openChannelPubSub
  }, children)));
};
exports.OpenChannelContextsProvider = OpenChannelContextsProvider;
//# sourceMappingURL=moduleContext.js.map