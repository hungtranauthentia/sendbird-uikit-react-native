"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const MessageSearchList = _ref => {
  let {
    messages,
    renderSearchResultItem,
    flatListProps,
    onPressSearchResultItem,
    channel
  } = _ref;
  const renderItem = (0, _uikitUtils.useFreshCallback)(_ref2 => {
    let {
      item
    } = _ref2;
    return renderSearchResultItem({
      message: item,
      onPress: () => onPressSearchResultItem({
        message: item,
        channel
      }),
      channel
    });
  });
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({}, flatListProps, {
    data: messages,
    renderItem: renderItem,
    keyExtractor: _uikitUtils.getMessageUniqId
  }));
};
var _default = MessageSearchList;
exports.default = _default;
//# sourceMappingURL=MessageSearchList.js.map