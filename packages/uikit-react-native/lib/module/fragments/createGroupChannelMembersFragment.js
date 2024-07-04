import React, { useRef } from 'react';
import { useChannelHandler, useUserList } from '@sendbird/uikit-chat-hooks';
import { Icon, useActionMenu } from '@sendbird/uikit-react-native-foundation';
import { ifOperator, ifThenOr, isDifferentChannel, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserActionBar from '../components/UserActionBar';
import createUserListModule from '../domain/userList/module/createUserListModule';
import { useLocalization, useSendbirdChat, useUserProfile } from '../hooks/useContext';
const RETURN_EMPTY_STRING = () => '';
const createGroupChannelMembersFragment = initModule => {
  const UserListModule = createUserListModule(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      onPressHeaderRight,
      renderUser,
      sortComparator,
      queryCreator = () => channel.createMemberListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = useUniqHandlerId('GroupChannelMembersFragment');
    const refreshSchedule = useRef();
    const {
      STRINGS
    } = useLocalization();
    const {
      sdk,
      currentUser
    } = useSendbirdChat();
    const {
      openMenu
    } = useActionMenu();
    const {
      show
    } = useUserProfile();
    const {
      users,
      refresh,
      loading,
      next,
      error,
      upsertUser,
      deleteUser
    } = useUserList(sdk, {
      queryCreator,
      sortComparator
    });
    useChannelHandler(sdk, handlerId, {
      onUserLeft(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserBanned(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onOperatorUpdated(eventChannel) {
        if (isDifferentChannel(eventChannel, channel)) return;
        if (refreshSchedule.current) clearTimeout(refreshSchedule.current);
        refreshSchedule.current = setTimeout(() => refresh(), 500);
      },
      onUserMuted(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel) || !eventChannel.isGroupChannel()) return;
        const memberFromChannel = eventChannel.members.find(it => it.userId === user.userId);
        if (memberFromChannel) return upsertUser(memberFromChannel);
        const memberFromList = users.find(it => it.userId === user.userId);
        if (memberFromList) {
          memberFromList.isMuted = true;
          upsertUser(memberFromList);
        }
      },
      onUserUnmuted(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel) || !eventChannel.isGroupChannel()) return;
        const memberFromChannel = eventChannel.members.find(it => it.userId === user.userId);
        if (memberFromChannel) return upsertUser(memberFromChannel);
        const memberFromList = users.find(it => it.userId === user.userId);
        if (memberFromList) {
          memberFromList.isMuted = false;
          upsertUser(memberFromList);
        }
      }
    });
    const _renderUser = useFreshCallback((user, selectedUsers, setSelectedUsers) => {
      if (renderUser) return renderUser(user, selectedUsers, setSelectedUsers);
      return /*#__PURE__*/React.createElement(UserActionBar, {
        muted: user.isMuted,
        uri: user.profileUrl,
        label: user.role === 'operator' ? STRINGS.LABELS.USER_BAR_OPERATOR : '',
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: ifOperator(channel.myRole, () => {
          const menuItems = [];
          menuItems.push({
            title: ifOperator(user.role, STRINGS.LABELS.UNREGISTER_OPERATOR, STRINGS.LABELS.REGISTER_AS_OPERATOR),
            onPress: ifOperator(user.role, () => channel.removeOperators([user.userId]), () => channel.addOperators([user.userId]))
          });
          if (!channel.isBroadcast) {
            menuItems.push({
              title: ifThenOr(user.isMuted, STRINGS.LABELS.UNMUTE, STRINGS.LABELS.MUTE),
              onPress: ifThenOr(user.isMuted, () => channel.unmuteUser(user), () => channel.muteUser(user))
            });
          }
          menuItems.push({
            title: STRINGS.LABELS.BAN,
            style: 'destructive',
            onPress: () => channel.banUser(user)
          });
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems
          });
        }),
        onPressAvatar: () => show(user)
      });
    });
    return /*#__PURE__*/React.createElement(UserListModule.Provider, {
      headerRight: RETURN_EMPTY_STRING,
      headerTitle: STRINGS.GROUP_CHANNEL_MEMBERS.HEADER_TITLE
    }, /*#__PURE__*/React.createElement(UserListModule.Header, {
      shouldActivateHeaderRight: () => true,
      onPressHeaderLeft: onPressHeaderLeft,
      right: /*#__PURE__*/React.createElement(Icon, {
        icon: 'plus'
      }),
      onPressHeaderRight: async () => onPressHeaderRight()
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(UserListModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(UserListModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(UserListModule.List, {
      users: users,
      renderUser: _renderUser,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/React.createElement(UserListModule.StatusEmpty, null)
    })));
  };
};
export default createGroupChannelMembersFragment;
//# sourceMappingURL=createGroupChannelMembersFragment.js.map