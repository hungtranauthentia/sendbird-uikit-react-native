function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getChannelUniqId, useFreshCallback } from '@sendbird/uikit-utils';
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
  const renderItem = useFreshCallback(_ref2 => {
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
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(FlatList, _extends({
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
    keyExtractor: getChannelUniqId
  }));
};
export default OpenChanelListList;
//# sourceMappingURL=OpenChannelListList.js.map