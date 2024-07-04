function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { FlatList } from 'react-native';
import { getMessageUniqId, useFreshCallback } from '@sendbird/uikit-utils';
const MessageSearchList = _ref => {
  let {
    messages,
    renderSearchResultItem,
    flatListProps,
    onPressSearchResultItem,
    channel
  } = _ref;
  const renderItem = useFreshCallback(_ref2 => {
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
  return /*#__PURE__*/React.createElement(FlatList, _extends({}, flatListProps, {
    data: messages,
    renderItem: renderItem,
    keyExtractor: getMessageUniqId
  }));
};
export default MessageSearchList;
//# sourceMappingURL=MessageSearchList.js.map