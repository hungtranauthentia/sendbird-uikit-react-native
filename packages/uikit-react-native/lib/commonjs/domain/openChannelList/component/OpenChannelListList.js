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
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenChanelListList = _ref => {
  let {
    onPressChannel,
    openChannels,
    onLoadNext,
    flatListProps,
    renderOpenChannelPreview,
    refreshing,
    onRefresh
  } = _ref;
  const renderItem = (0, _uikitUtils.useFreshCallback)(_ref2 => {
    let {
      item
    } = _ref2;
    return renderOpenChannelPreview === null || renderOpenChannelPreview === void 0 ? void 0 : renderOpenChannelPreview({
      channel: item,
      onPress: () => onPressChannel(item)
    });
  });
  const {
    left,
    right
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, _extends({
    refreshing: refreshing,
    data: openChannels,
    renderItem: renderItem,
    onEndReached: onLoadNext,
    onRefresh: onRefresh
  }, flatListProps, {
    contentContainerStyle: [flatListProps === null || flatListProps === void 0 ? void 0 : flatListProps.contentContainerStyle, {
      paddingLeft: left,
      paddingRight: right
    }],
    keyExtractor: _uikitUtils.getChannelUniqId
  }));
};
var _default = OpenChanelListList;
exports.default = _default;
//# sourceMappingURL=OpenChannelListList.js.map