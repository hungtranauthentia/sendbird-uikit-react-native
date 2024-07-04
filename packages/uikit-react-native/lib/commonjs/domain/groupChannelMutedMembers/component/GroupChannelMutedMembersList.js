"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const GroupChannelMutedMembersList = _ref => {
  let {
    renderUser,
    mutedMembers,
    ListEmptyComponent,
    onLoadNext
  } = _ref;
  const renderItem = (0, _uikitUtils.useFreshCallback)(_ref2 => {
    let {
      item
    } = _ref2;
    return renderUser === null || renderUser === void 0 ? void 0 : renderUser({
      user: item
    });
  });
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    data: mutedMembers,
    renderItem: renderItem,
    contentContainerStyle: {
      paddingLeft: left,
      paddingRight: right,
      flexGrow: 1
    },
    ListEmptyComponent: ListEmptyComponent,
    bounces: false,
    keyExtractor: _uikitUtils.getUserUniqId,
    onEndReached: onLoadNext
  });
};
var _default = GroupChannelMutedMembersList;
exports.default = _default;
//# sourceMappingURL=GroupChannelMutedMembersList.js.map