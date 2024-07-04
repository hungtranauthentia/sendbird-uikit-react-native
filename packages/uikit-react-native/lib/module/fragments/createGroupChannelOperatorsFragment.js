import React from 'react';
import { useChannelHandler, useUserList } from '@sendbird/uikit-chat-hooks';
import { useActionMenu } from '@sendbird/uikit-react-native-foundation';
import { ifOperator, isDifferentChannel, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserActionBar from '../components/UserActionBar';
import { createGroupChannelOperatorsModule } from '../domain/groupChannelOperators';
import { useLocalization, useSendbirdChat, useUserProfile } from '../hooks/useContext';
const createGroupChannelOperatorsFragment = initModule => {
  const GroupChannelOperatorsModule = createGroupChannelOperatorsModule(initModule);
  return _ref => {
    let {
      channel,
      onPressHeaderLeft,
      onPressHeaderRight,
      renderUser,
      queryCreator = () => channel.createOperatorListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = useUniqHandlerId('GroupChannelOperatorsFragment');
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
      deleteUser,
      upsertUser,
      loading,
      refresh,
      next,
      error
    } = useUserList(sdk, {
      queryCreator
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
      onOperatorUpdated(eventChannel, updatedUsers) {
        if (isDifferentChannel(eventChannel, channel)) return;
        const operatorsAdded = users.length < updatedUsers.length;
        if (operatorsAdded) updatedUsers.forEach(upsertUser);
      }
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
        onPressAvatar: () => show(user),
        onPressActionMenu: ifOperator(channel.myRole, () => {
          openMenu({
            title: user.nickname || STRINGS.LABELS.USER_NO_NAME,
            menuItems: [{
              title: STRINGS.LABELS.UNREGISTER_OPERATOR,
              onPress: () => channel.removeOperators([user.userId]).then(() => deleteUser(user.userId))
            }]
          });
        })
      });
    });
    return /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: onPressHeaderRight
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.List, {
      operators: users,
      renderUser: _renderUser,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/React.createElement(GroupChannelOperatorsModule.StatusEmpty, null)
    })));
  };
};
export default createGroupChannelOperatorsFragment;
//# sourceMappingURL=createGroupChannelOperatorsFragment.js.map