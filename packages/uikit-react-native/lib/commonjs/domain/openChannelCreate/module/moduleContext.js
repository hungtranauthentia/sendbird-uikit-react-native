"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenChannelCreateContextsProvider = exports.OpenChannelCreateContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
var _useContext = require("../../../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const OpenChannelCreateContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    headerTitle: '',
    headerRight: ''
  })
};
exports.OpenChannelCreateContexts = OpenChannelCreateContexts;
const OpenChannelCreateContextsProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(OpenChannelCreateContexts.Fragment.Provider, {
    value: {
      headerTitle: STRINGS.OPEN_CHANNEL_CREATE.HEADER_TITLE,
      headerRight: STRINGS.OPEN_CHANNEL_CREATE.HEADER_RIGHT
    }
  }, children));
};
exports.OpenChannelCreateContextsProvider = OpenChannelCreateContextsProvider;
//# sourceMappingURL=moduleContext.js.map