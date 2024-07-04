import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useUserList } from '@sendbird/uikit-chat-hooks';
import { PASS, getDefaultGroupChannelCreateParams, useFreshCallback } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserSelectableBar from '../components/UserSelectableBar';
import createUserListModule from '../domain/userList/module/createUserListModule';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createGroupChannelCreateFragment = initModule => {
  const UserListModule = createUserListModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft,
      onBeforeCreateChannel = PASS,
      onCreateChannel,
      sortComparator,
      queryCreator,
      channelType = 'GROUP',
      renderUser
    } = _ref;
    const {
      sdk,
      currentUser
    } = useSendbirdChat();
    const {
      STRINGS
    } = useLocalization();
    const {
      users,
      refreshing,
      loading,
      error,
      refresh,
      next
    } = useUserList(sdk, {
      queryCreator,
      sortComparator
    });
    const _renderUser = useFreshCallback((user, selectedUsers, setSelectedUsers) => {
      if (queryCreator && !renderUser) {
        const hasRequiredKey = 'profileUrl' in user && 'nickname' in user;
        if (!hasRequiredKey) throw new Error('You should provide "renderUser" when providing "queryCreator"');
      }
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const isMe = user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId);
      if (isMe) return null;
      const userIdx = selectedUsers.findIndex(u => u.userId === user.userId);
      const isSelected = userIdx > -1;
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        activeOpacity: 0.7,
        onPress: () => {
          setSelectedUsers(_ref2 => {
            let [...draft] = _ref2;
            if (isSelected) draft.splice(userIdx, 1);else draft.push(user);
            return draft;
          });
        }
      }, /*#__PURE__*/React.createElement(UserSelectableBar, {
        uri: user.profileUrl,
        name: user.nickname || STRINGS.LABELS.USER_NO_NAME,
        selected: isSelected,
        disabled: false
      }));
    });
    return /*#__PURE__*/React.createElement(UserListModule.Provider, {
      headerRight: selectedUsers => STRINGS.GROUP_CHANNEL_CREATE.HEADER_RIGHT({
        selectedUsers
      }),
      headerTitle: STRINGS.GROUP_CHANNEL_CREATE.HEADER_TITLE
    }, /*#__PURE__*/React.createElement(UserListModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: async users => {
        const params = getDefaultGroupChannelCreateParams({
          invitedUserIds: users.map(it => it.userId),
          currentUserId: currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId
        });
        if (channelType === 'BROADCAST') params.isBroadcast = true;
        if (channelType === 'SUPER_GROUP') params.isSuper = true;
        const processedParams = await onBeforeCreateChannel(params, users);
        const channel = await sdk.groupChannel.createChannel(processedParams);
        onCreateChannel(channel);
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
export default createGroupChannelCreateFragment;
//# sourceMappingURL=createGroupChannelCreateFragment.js.map