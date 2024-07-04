function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PushTriggerOption } from '@sendbird/chat';
import { useActionMenu, useToast } from '@sendbird/uikit-react-native-foundation';
import { NOOP, PASS, getChannelUniqId, useFreshCallback } from '@sendbird/uikit-utils';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
const GroupChannelListList = _ref => {
  let {
    onPressChannel,
    renderGroupChannelPreview,
    groupChannels,
    onLoadNext,
    flatListProps,
    menuItemCreator = PASS
  } = _ref;
  const toast = useToast();
  const {
    openMenu
  } = useActionMenu();
  const {
    STRINGS
  } = useLocalization();
  const {
    sdk,
    currentUser
  } = useSendbirdChat();
  const onLongPress = useFreshCallback(channel => {
    const action = channel.myPushTriggerOption === 'off' ? 'on' : 'off';
    const menuItem = menuItemCreator({
      title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_TITLE((currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) ?? '', channel),
      menuItems: [{
        title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_NOTIFICATION(channel),
        onPress: async () => {
          if (action === 'on') {
            await channel.setMyPushTriggerOption(PushTriggerOption.DEFAULT);
          } else {
            await channel.setMyPushTriggerOption(PushTriggerOption.OFF);
          }
        },
        onError: () => {
          toast.show(action === 'on' ? STRINGS.TOAST.TURN_ON_NOTIFICATIONS_ERROR : STRINGS.TOAST.TURN_OFF_NOTIFICATIONS_ERROR, 'error');
        }
      }, {
        title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_LEAVE,
        onPress: async () => {
          channel.leave().then(() => sdk.clearCachedMessages([channel.url]).catch(NOOP));
        },
        onError: () => toast.show(STRINGS.TOAST.LEAVE_CHANNEL_ERROR, 'error')
      }]
    });
    openMenu(menuItem);
  });
  const renderItem = useFreshCallback(_ref2 => {
    let {
      item
    } = _ref2;
    return renderGroupChannelPreview === null || renderGroupChannelPreview === void 0 ? void 0 : renderGroupChannelPreview({
      channel: item,
      onPress: () => onPressChannel(item),
      onLongPress: () => onLongPress(item)
    });
  });
  const {
    left,
    right
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(FlatList, _extends({
    bounces: false,
    data: groupChannels,
    renderItem: renderItem,
    onEndReached: onLoadNext
  }, flatListProps, {
    contentContainerStyle: [flatListProps === null || flatListProps === void 0 ? void 0 : flatListProps.contentContainerStyle, {
      paddingLeft: left,
      paddingRight: right
    }],
    keyExtractor: getChannelUniqId
  }));
};
export default GroupChannelListList;
//# sourceMappingURL=GroupChannelListList.js.map