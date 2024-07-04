import React, { useContext } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { PushTriggerOption } from '@sendbird/chat';
import { Divider, Icon, Switch, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useForceUpdate } from '@sendbird/uikit-utils';
import { useLocalization } from '../../../hooks/useContext';
import { GroupChannelNotificationsContexts } from '../module/moduleContext';
const GroupChannelNotificationsView = () => {
  const {
    channel
  } = useContext(GroupChannelNotificationsContexts.Fragment);
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  const forceUpdate = useForceUpdate();
  const turnedOnNotifications = channel.myPushTriggerOption !== PushTriggerOption.OFF;
  const turnedOnNotificationsOptionAll = [PushTriggerOption.ALL, PushTriggerOption.DEFAULT].some(it => it === channel.myPushTriggerOption);
  const turnedOnNotificationsOptionMentionsOnly = channel.myPushTriggerOption === PushTriggerOption.MENTION_ONLY;
  const toggleNotificationSwitch = async val => {
    if (val) {
      await channel.setMyPushTriggerOption(PushTriggerOption.ALL);
    } else {
      await channel.setMyPushTriggerOption(PushTriggerOption.OFF);
    }
    forceUpdate();
  };
  const onPressNotificationsOption = async option => {
    await channel.setMyPushTriggerOption(option);
    forceUpdate();
  };
  return /*#__PURE__*/React.createElement(ScrollView, {
    bounces: false,
    contentContainerStyle: styles.container
  }, /*#__PURE__*/React.createElement(Bar, {
    subtitle2: true,
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS,
    description: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_DESC,
    component: /*#__PURE__*/React.createElement(Switch, {
      value: turnedOnNotifications,
      onChangeValue: toggleNotificationSwitch
    })
  }), /*#__PURE__*/React.createElement(Divider, null), turnedOnNotifications && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Bar, {
    body3: true,
    onPress: () => onPressNotificationsOption(PushTriggerOption.ALL),
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_OPTION_ALL,
    component: /*#__PURE__*/React.createElement(Icon, {
      color: turnedOnNotificationsOptionAll ? colors.primary : colors.onBackground03,
      icon: turnedOnNotificationsOptionAll ? 'radio-on' : 'radio-off',
      size: 24
    })
  }), /*#__PURE__*/React.createElement(Divider, null), /*#__PURE__*/React.createElement(Bar, {
    body3: true,
    onPress: () => onPressNotificationsOption(PushTriggerOption.MENTION_ONLY),
    title: STRINGS.GROUP_CHANNEL_NOTIFICATIONS.MENU_NOTIFICATIONS_OPTION_MENTION_ONLY,
    component: /*#__PURE__*/React.createElement(Icon, {
      color: turnedOnNotificationsOptionMentionsOnly ? colors.primary : colors.onBackground03,
      icon: turnedOnNotificationsOptionMentionsOnly ? 'radio-on' : 'radio-off',
      size: 24
    })
  }), /*#__PURE__*/React.createElement(Divider, null)));
};
const Bar = _ref => {
  let {
    title,
    onPress,
    description,
    component,
    subtitle2,
    body3
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Pressable, {
    onPress: onPress,
    style: styles.barContainer
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.titleContainer
  }, /*#__PURE__*/React.createElement(Text, {
    body3: body3,
    subtitle2: subtitle2,
    numberOfLines: 1,
    color: colors.onBackground01,
    style: styles.title
  }, title), /*#__PURE__*/React.createElement(View, null, component)), Boolean(description) && /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: colors.onBackground02,
    style: styles.desc
  }, description));
};
const styles = createStyleSheet({
  container: {
    paddingHorizontal: 16
  },
  barContainer: {
    paddingVertical: 16
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    marginRight: 8
  },
  desc: {
    marginTop: 8,
    flex: 1
  }
});
export default GroupChannelNotificationsView;
//# sourceMappingURL=GroupChannelNotificationsView.js.map