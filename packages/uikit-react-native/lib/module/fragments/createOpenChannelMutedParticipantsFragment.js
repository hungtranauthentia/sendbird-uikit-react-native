import React from 'react';
import { useChannelHandler, useUserList } from '@sendbird/uikit-chat-hooks';
import { useActionMenu } from '@sendbird/uikit-react-native-foundation';
import { NOOP, ifThenOr, isDifferentChannel, useFreshCallback, useUniqHandlerId } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import UserActionBar from '../components/UserActionBar';
import { createOpenChannelMutedParticipantsModule } from '../domain/openChannelMutedParticipants';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createOpenChannelMutedParticipantsFragment = initModule => {
  const OpenChannelMutedParticipantsModule = createOpenChannelMutedParticipantsModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      renderUser,
      queryCreator = () => channel.createMutedUserListQuery({
        limit: 20
      })
    } = _ref;
    const handlerId = useUniqHandlerId('OpenChannelMutedParticipants');
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
      }
    }, 'open');
    const _renderUser = useFreshCallback(props => {
      if (renderUser) return renderUser(props);
      const {
        user
      } = props;
      const isUserOperator = channel.isOperator(user.userId);
      return /*#__PURE__*/React.createElement(UserActionBar, {
        muted: true,
        uri: user.profileUrl,
        label: ifThenOr(isUserOperator, STRINGS.LABELS.USER_BAR_OPERATOR, ''),
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
    return /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.List, {
      renderUser: _renderUser,
      mutedParticipants: users,
      onLoadNext: next,
      ListEmptyComponent: /*#__PURE__*/React.createElement(OpenChannelMutedParticipantsModule.StatusEmpty, null)
    })));
  };
};
export default createOpenChannelMutedParticipantsFragment;
//# sourceMappingURL=createOpenChannelMutedParticipantsFragment.js.map