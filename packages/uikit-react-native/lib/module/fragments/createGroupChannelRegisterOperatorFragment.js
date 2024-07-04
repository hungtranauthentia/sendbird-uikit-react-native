import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { useUserList } from '@sendbird/uikit-chat-hooks';
import StatusComposition from '../components/StatusComposition';
import UserSelectableBar from '../components/UserSelectableBar';
import createUserListModule from '../domain/userList/module/createUserListModule';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createGroupChannelRegisterOperatorFragment = initModule => {
  const UserListModule = createUserListModule(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      sortComparator,
      renderUser,
      onPressHeaderRight,
      queryCreator = () => channel.createMemberListQuery({
        limit: 20
      })
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
      refresh,
      next,
      error,
      loading
    } = useUserList(sdk, {
      queryCreator,
      sortComparator
    });
    const _renderUser = useCallback((user, selectedUsers, setSelectedUsers) => {
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      const userIdx = selectedUsers.findIndex(u => u.userId === user.userId);
      const isSelected = userIdx > -1;
      const isOperator = user.role === 'operator';
      return /*#__PURE__*/React.createElement(TouchableOpacity, {
        activeOpacity: 0.7,
        disabled: isOperator,
        onPress: () => {
          setSelectedUsers(_ref2 => {
            let [...draft] = _ref2;
            if (isSelected) draft.splice(userIdx, 1);else draft.push(user);
            return draft;
          });
        }
      }, /*#__PURE__*/React.createElement(UserSelectableBar, {
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        selected: isOperator || isSelected,
        disabled: isOperator
      }));
    }, [channel, renderUser]);
    return /*#__PURE__*/React.createElement(UserListModule.Provider, {
      headerRight: selectedUsers => STRINGS.GROUP_CHANNEL_REGISTER_OPERATOR.HEADER_RIGHT({
        selectedUsers
      }),
      headerTitle: STRINGS.GROUP_CHANNEL_REGISTER_OPERATOR.HEADER_TITLE
    }, /*#__PURE__*/React.createElement(UserListModule.Header, {
      shouldActivateHeaderRight: selectedUsers => selectedUsers.length > 0,
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: async users => {
        await channel.addOperators(users.map(it => it.userId));
        onPressHeaderRight(channel);
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
export default createGroupChannelRegisterOperatorFragment;
//# sourceMappingURL=createGroupChannelRegisterOperatorFragment.js.map