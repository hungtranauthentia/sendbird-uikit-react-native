"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitUtils = require("@sendbird/uikit-utils");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const UserListList = _ref => {
  let {
    users,
    onRefresh,
    refreshing,
    renderUser,
    onLoadNext,
    ListEmptyComponent
  } = _ref;
  const context = (0, _react.useContext)(_moduleContext.UserListContexts.List);
  const renderItem = (0, _react.useCallback)(_ref2 => {
    let {
      item
    } = _ref2;
    return renderUser === null || renderUser === void 0 ? void 0 : renderUser(item, context.selectedUsers, context.setSelectedUsers);
  }, [renderUser, context.selectedUsers, context.setSelectedUsers]);
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: users,
    refreshing: refreshing,
    onRefresh: onRefresh,
    renderItem: renderItem,
    onEndReached: onLoadNext,
    contentContainerStyle: {
      paddingLeft: left,
      paddingRight: right,
      flexGrow: 1
    },
    ListEmptyComponent: ListEmptyComponent,
    keyExtractor: _uikitUtils.getUserUniqId
  });
};
var _default = UserListList;
exports.default = _default;
//# sourceMappingURL=UserListList.js.map