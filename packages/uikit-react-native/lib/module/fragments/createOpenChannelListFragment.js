import React from 'react';
import { useOpenChannelList } from '@sendbird/uikit-chat-hooks';
import { OpenChannelPreview, PressBox } from '@sendbird/uikit-react-native-foundation';
import { NOOP } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import { createOpenChannelListModule } from '../domain/openChannelList';
import { useLocalization, useSendbirdChat } from '../hooks/useContext';
const createOpenChannelListFragment = initModule => {
  const OpenChannelListModule = createOpenChannelListModule(initModule);
  return _ref => {
    let {
      onPressCreateChannel,
      onPressChannel = NOOP,
      flatListProps,
      renderOpenChannelPreview,
      queryCreator
    } = _ref;
    const {
      sdk,
      currentUser
    } = useSendbirdChat();
    const {
      STRINGS
    } = useLocalization();
    const {
      openChannels,
      next,
      refresh,
      refreshing,
      loading,
      error
    } = useOpenChannelList(sdk, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator
    });
    const _renderOpenChannelPreview = props => {
      if (renderOpenChannelPreview) return renderOpenChannelPreview(props);
      return /*#__PURE__*/React.createElement(PressBox, {
        activeOpacity: 0.8,
        onPress: props.onPress
      }, /*#__PURE__*/React.createElement(OpenChannelPreview, {
        coverUrl: props.channel.coverUrl,
        title: STRINGS.OPEN_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE(props.channel),
        frozen: props.channel.isFrozen,
        participantsCount: props.channel.participantCount
      }));
    };
    return /*#__PURE__*/React.createElement(OpenChannelListModule.Provider, null, /*#__PURE__*/React.createElement(OpenChannelListModule.Header, {
      onPressHeaderRight: onPressCreateChannel
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(OpenChannelListModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(OpenChannelListModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/React.createElement(OpenChannelListModule.List, {
      onPressChannel: onPressChannel,
      renderOpenChannelPreview: _renderOpenChannelPreview,
      openChannels: openChannels,
      onLoadNext: next,
      refreshing: refreshing,
      onRefresh: refresh,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/React.createElement(OpenChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })));
  };
};
export default createOpenChannelListFragment;
//# sourceMappingURL=createOpenChannelListFragment.js.map