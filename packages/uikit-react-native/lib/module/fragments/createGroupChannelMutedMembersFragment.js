import React from 'react';
import { useChannelHandler, useUserList } from '@sendbird/uikit-chat-hooks';
import { useActionMenu } from '@sendbird/uikit-react-native-foundation';
import { NOOP, isDifferentChannel, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserActionBar from '../components/UserActionBar';
import { createGroupChannelMutedMembersModule } from '../domain/groupChannelMutedMembers';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createGroupChannelMutedMembersFragment = initModule => {
  const GroupChannelMutedMembersModule = createGroupChannelMutedMembersModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      renderUser,
      queryCreator = () => channel.createMutedUserListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = useUniqHandlerId('GroupChannelMutedMembersFragment');
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
      users,
      deleteUser,
      upsertUser,
      loading,
      refresh,
      error,
      next
    } = useUserList(sdk, {
      queryCreator
    });
    useChannelHandler(sdk, handlerId, {
      onUserMuted(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        upsertUser(user);
      },
      onUserUnmuted(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserLeft(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        deleteUser(user.userId);
      },
      onUserBanned(eventChannel, user) {
        if (isDifferentChannel(eventChannel, channel)) return;
        deleteUser(user.userId);
      }
    });
    const _renderUser = useFreshCallback(props => {
      if (renderUser) return renderUser(props);
      const {
        user
      } = props;
      return /*#__PURE__*/React.createElement(UserActionBar, {
        muted: true,
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNMUTE,
              onPress: () => channel.unmuteUser(user).then(() => deleteUser(user.userId))
            }]
          });
        }
      });
    });
    return /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.List, {
      mutedMembers: users,
      onLoadNext: next,
      renderUser: _renderUser,
      ListEmptyComponent: /*#__PURE__*/React.createElement(GroupChannelMutedMembersModule.StatusEmpty, null)
    })));
  };
};
export default createGroupChannelMutedMembersFragment;
//# sourceMappingURL=createGroupChannelMutedMembersFragment.js.map