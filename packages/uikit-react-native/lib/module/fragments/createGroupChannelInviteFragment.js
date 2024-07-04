import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useUserList } from '@sendbird/uikit-chat-hooks';
import StatusComposition from '../components/StatusComposition';
import UserSelectableBar from '../components/UserSelectableBar';
import createUserListModule from '../domain/userList/module/createUserListModule';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createGroupChannelInviteFragment = initModule => {
  const UserListModule = createUserListModule(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      onInviteMembers,
      sortComparator,
      queryCreator,
      renderUser
    } = _ref;
    const {
      sdk
    } = useSendbirdChat();
    const {
      STRINGS
    } = useLocalization();
    const {
      users,
      refreshing,
      refresh,
      next,
      error,
      loading
    } = useUserList(sdk, {
      queryCreator,
      sortComparator
    });
    const memberIds = shouldFilterMember(channel) ? channel.members.map(it => it.userId) : [];
    const _renderUser = useCallback((user, selectedUsers, setSelectedUsers) => {
      if (queryCreator && !renderUser) {
        const hasRequiredKey = 'profileUrl' in user && 'nickname' in user;
        if (!hasRequiredKey) throw new Error('You should provide "renderUser" when providing "queryCreator"');
      }
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const userIdxInMembers = memberIds.indexOf(user.userId);
      const userIdxInSelectedUsers = selectedUsers.findIndex(it => it.userId === user.userId);
      const isMember = userIdxInMembers > -1;
      const isSelected = userIdxInSelectedUsers > -1;
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        activeOpacity: 0.7,
        disabled: isMember,
        onPress: () => {
          setSelectedUsers(_ref2 => {
            let [...draft] = _ref2;
            if (isSelected) draft.splice(userIdxInSelectedUsers, 1);else draft.push(user);
            return draft;
          });
        }
      }, /*#__PURE__*/React.createElement(UserSelectableBar, {
        uri: user.profileUrl,
        name: user.nickname || STRINGS.LABELS.USER_NO_NAME,
        selected: isMember || isSelected,
        disabled: isMember
      }));
    }, [channel, renderUser, queryCreator]);
    return /*#__PURE__*/React.createElement(UserListModule.Provider, {
      headerRight: selectedUsers => STRINGS.GROUP_CHANNEL_INVITE.HEADER_RIGHT({
        selectedUsers
      }),
      headerTitle: STRINGS.GROUP_CHANNEL_INVITE.HEADER_TITLE
    }, /*#__PURE__*/React.createElement(UserListModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: async users => {
        const userIds = users.map(it => it.userId);
        const updatedChannel = await channel.inviteWithUserIds(userIds);
        onInviteMembers(updatedChannel);
      }
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      error: Boolean(error),
      LoadingComponent: /*#__PURE__*/React.createElement(UserListModule.StatusLoading, null),
      ErrorComponent: /*#__PURE__*/React.createElement(UserListModule.StatusError, {
        onPressRetry: () => refresh()
      })
    }, /*#__PURE__*/React.createElement(UserListModule.List, {
      onLoadNext: next,
      users: users,
      renderUser: _renderUser,
      onRefresh: refresh,
      refreshing: refreshing,
      ListEmptyComponent: /*#__PURE__*/React.createElement(UserListModule.StatusEmpty, null)
    })));
  };
};
function shouldFilterMember(channel) {
  return !channel.isSuper && !channel.isBroadcast;
}
export default createGroupChannelInviteFragment;
//# sourceMappingURL=createGroupChannelInviteFragment.js.map