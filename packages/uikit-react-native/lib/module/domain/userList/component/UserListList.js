import React, { useCallback, useContext } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getUserUniqId } from '@sendbird/uikit-utils';
import { UserListContexts } from '../module/moduleContext';
const UserListList = _ref => {
  let {
    users,
    onRefresh,
    refreshing,
    renderUser,
    onLoadNext,
    ListEmptyComponent
  } = _ref;
  const context = useContext(UserListContexts.List);
  const renderItem = useCallback(_ref2 => {
    let {
      item
    } = _ref2;
    return renderUser === null || renderUser === void 0 ? void 0 : renderUser(item, context.selectedUsers, context.setSelectedUsers);
  }, [renderUser, context.selectedUsers, context.setSelectedUsers]);
  const {
    left,
    right
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(FlatList, {
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
    keyExtractor: getUserUniqId
  });
};
export default UserListList;
//# sourceMappingURL=UserListList.js.map