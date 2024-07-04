import React from 'react';
import { GroupChannelFilter } from '@sendbird/chat/groupChannel';
import { useGroupChannelList } from '@sendbird/uikit-tools';
import { PASS, confirmAndMarkAsDelivered, useAppState, useFreshCallback } from '@sendbird/uikit-utils';
import StatusComposition from '../components/StatusComposition';
import GroupChannelPreviewContainer from '../containers/GroupChannelPreviewContainer';
import createGroupChannelListModule from '../domain/groupChannelList/module/createGroupChannelListModule';
import { useSendbirdChat } from '../hooks/useContext';
const createGroupChannelListFragment = initModule => {
  const GroupChannelListModule = createGroupChannelListModule(initModule);
  return _ref => {
    let {
      onPressChannel,
      onPressCreateChannel,
      renderGroupChannelPreview,
      skipTypeSelection = false,
      flatListProps = {},
      menuItemCreator = PASS,
      channelListQueryParams,
      collectionCreator
    } = _ref;
    const {
      sdk,
      sbOptions,
      markAsDeliveredWithChannel
    } = useSendbirdChat();
    const {
      groupChannels,
      loadMore,
      initialized
    } = useGroupChannelList(sdk, {
      collectionCreator: getCollectionCreator(sdk, channelListQueryParams, collectionCreator),
      markAsDelivered: confirmAndMarkAsDelivered
    });
    useAppState('change', status => {
      if (sbOptions.appInfo.deliveryReceiptEnabled) {
        if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
      }
    });
    const _renderGroupChannelPreview = useFreshCallback(props => {
      if (renderGroupChannelPreview) return renderGroupChannelPreview(props);
      return /*#__PURE__*/React.createElement(GroupChannelPreviewContainer, props);
    });
    const isChannelTypeAvailable = sbOptions.appInfo.broadcastChannelEnabled || sbOptions.appInfo.superGroupChannelEnabled;
    return /*#__PURE__*/React.createElement(GroupChannelListModule.Provider, null, /*#__PURE__*/React.createElement(GroupChannelListModule.Header, null), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: !initialized,
      LoadingComponent: /*#__PURE__*/React.createElement(GroupChannelListModule.StatusLoading, null)
    }, /*#__PURE__*/React.createElement(GroupChannelListModule.List, {
      onPressChannel: onPressChannel,
      menuItemCreator: menuItemCreator,
      renderGroupChannelPreview: _renderGroupChannelPreview,
      groupChannels: groupChannels,
      onLoadNext: loadMore,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/React.createElement(GroupChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })), /*#__PURE__*/React.createElement(GroupChannelListModule.TypeSelector, {
      skipTypeSelection: isChannelTypeAvailable ? skipTypeSelection : true,
      onSelectType: onPressCreateChannel
    }));
  };
};
function getCollectionCreator(sdk, channelListQueryParams, deprecatedCreatorProp) {
  if (!channelListQueryParams && deprecatedCreatorProp) return deprecatedCreatorProp;
  return defaultParams => {
    const params = {
      ...defaultParams,
      ...channelListQueryParams
    };
    return sdk.groupChannel.createGroupChannelCollection({
      ...params,
      filter: new GroupChannelFilter(params)
    });
  };
}
export default createGroupChannelListFragment;
//# sourceMappingURL=createGroupChannelListFragment.js.map