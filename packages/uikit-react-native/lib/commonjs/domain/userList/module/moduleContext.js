"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserListContextsProvider = exports.UserListContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable @typescript-eslint/no-explicit-any */

const UserListContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    headerTitle: '',
    headerRight: ''
  }),
  List: /*#__PURE__*/(0, _react.createContext)({
    selectedUsers: [],
    setSelectedUsers: _uikitUtils.NOOP
  })
};
exports.UserListContexts = UserListContexts;
const UserListContextsProvider = _ref => {
  let {
    children,
    headerTitle,
    headerRight
  } = _ref;
  const [selectedUsers, setSelectedUsers] = (0, _react.useState)([]);
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(UserListContexts.Fragment.Provider, {
    value: {
      headerTitle,
      headerRight: headerRight(selectedUsers)
    }
  }, /*#__PURE__*/_react.default.createElement(UserListContexts.List.Provider, {
    value: {
      selectedUsers,
      setSelectedUsers
    }
  }, children)));
};
exports.UserListContextsProvider = UserListContextsProvider;
//# sourceMappingURL=moduleContext.js.map