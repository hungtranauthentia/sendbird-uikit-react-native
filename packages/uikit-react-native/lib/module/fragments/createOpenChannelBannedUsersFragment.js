import React from 'react';
import { useUserList } from '@sendbird/uikit-chat-hooks';
import { useActionMenu } from '@sendbird/uikit-react-native-foundation';
import { useFreshCallback } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserActionBar from '../components/UserActionBar';
import { createOpenChannelBannedUsersModule } from '../domain/openChannelBannedUsers';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createOpenChannelBannedUsersFragment = initModule => {
  const OpenChannelBannedUsersModule = createOpenChannelBannedUsersModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft,
      channel,
      renderUser,
      queryCreator = () => channel.createBannedUserListQuery({
        limit: 20
      })
    } = _ref;
    const {
      STRINGS
    } = useLocalization();
    const {
      currentUser,
      sdk
    } = useSendbirdChat();
    const {
      openMenu
    } = useActionMenu();
    const {
      users,
      deleteUser,
      loading,
      next,
      refresh,
      error
    } = useUserList(sdk, {
      queryCreator
    });
    const _renderUser = useFreshCallback(props => {
      if (renderUser) return renderUser(props);
      const {
        user
      } = props;
      return /*#__PURE__*/React.createElement(UserActionBar, {
        muted: false,
        uri: user.profileUrl,
        name: (user.nickname || STRINGS.LABELS.USER_NO_NAME) + (user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ? STRINGS.LABELS.USER_BAR_ME_POSTFIX : ''),
        disabled: user.userId === (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId),
        onPressActionMenu: () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNBAN,
              onPress: () => channel.unbanUser(user).then(() => deleteUser(user.userId))
            }]
          });
        }
      });
    });
    return /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.List, {
      renderUser: _renderUser,
      bannedUsers: users,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/React.createElement(OpenChannelBannedUsersModule.StatusEmpty, null)
    })));
  };
};
export default createOpenChannelBannedUsersFragment;
//# sourceMappingURL=createOpenChannelBannedUsersFragment.js.map