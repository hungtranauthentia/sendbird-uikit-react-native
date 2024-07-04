import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserUniqId, useFreshCallback } from '@sendbird/uikit-utils';
const GroupChannelMutedMembersList = _ref => {
  let {
    renderUser,
    mutedMembers,
    ListEmptyComponent,
    onLoadNext
  } = _ref;
  const renderItem = useFreshCallback(_ref2 => {
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
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(FlatList, {
    data: mutedMembers,
    renderItem: renderItem,
    contentContainerStyle: {
      paddingLeft: left,
      paddingRight: right,
      flexGrow: 1
    },
    ListEmptyComponent: ListEmptyComponent,
    bounces: false,
    keyExtractor: getUserUniqId,
    onEndReached: onLoadNext
  });
};
export default GroupChannelMutedMembersList;
//# sourceMappingURL=GroupChannelMutedMembersList.js.map