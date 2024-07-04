import React, { useContext, useEffect } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { Icon, Modal, Text, createStyleSheet, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization, useSendbirdChat } from '../../../hooks/useContext';
import { GroupChannelListContexts } from '../module/moduleContext';
const TYPES = ['GROUP', 'SUPER_GROUP', 'BROADCAST'];
const TYPE_ICONS = {
  'GROUP': 'chat',
  'SUPER_GROUP': 'supergroup',
  'BROADCAST': 'broadcast'
};
const STATUS_BAR_TOP_INSET_AS = Platform.select({
  android: 'margin',
  default: 'padding'
});
const GroupChannelListTypeSelector = _ref => {
  let {
    skipTypeSelection,
    onSelectType
  } = _ref;
  const {
    statusBarTranslucent,
    HeaderComponent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const {
    sbOptions
  } = useSendbirdChat();
  const typeSelector = useContext(GroupChannelListContexts.TypeSelector);
  const {
    visible,
    hide
  } = typeSelector;
  const createOnPressType = type => () => {
    hide();
    onSelectType(type);
  };
  useEffect(() => {
    if (skipTypeSelection && visible) createOnPressType('GROUP')();
  }, [skipTypeSelection, visible]);
  if (skipTypeSelection) return null;
  return /*#__PURE__*/React.createElement(Modal, {
    visible: visible,
    onClose: hide,
    statusBarTranslucent: statusBarTranslucent
  }, /*#__PURE__*/React.createElement(HeaderComponent, {
    title: typeSelector.headerTitle,
    right: /*#__PURE__*/React.createElement(Icon, {
      icon: 'close',
      color: colors.onBackground01
    }),
    onPressRight: typeSelector.hide,
    statusBarTopInsetAs: STATUS_BAR_TOP_INSET_AS
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.buttonArea
  }, TYPES.map(type => {
    if (type === 'SUPER_GROUP' && !sbOptions.appInfo.superGroupChannelEnabled) {
      return null;
    }
    if (type === 'BROADCAST' && !sbOptions.appInfo.broadcastChannelEnabled) {
      return null;
    }
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      key: type,
      activeOpacity: 0.6,
      onPress: createOnPressType(type),
      style: styles.typeButton
    }, /*#__PURE__*/React.createElement(DefaultTypeIcon, {
      type: type
    }), /*#__PURE__*/React.createElement(DefaultTypeText, {
      type: type
    }));
  }))));
};
const DefaultTypeIcon = _ref2 => {
  let {
    type
  } = _ref2;
  return /*#__PURE__*/React.createElement(Icon, {
    size: 24,
    icon: TYPE_ICONS[type],
    containerStyle: styles.icon
  });
};
const DefaultTypeText = _ref3 => {
  let {
    type
  } = _ref3;
  const {
    STRINGS
  } = useLocalization();
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: colors.onBackground01
  }, STRINGS.GROUP_CHANNEL_LIST[`TYPE_SELECTOR_${type}`]);
};
const styles = createStyleSheet({
  buttonArea: {
    flexDirection: 'row'
  },
  typeButton: {
    paddingVertical: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginBottom: 8
  }
});
export default GroupChannelListTypeSelector;
//# sourceMappingURL=GroupChannelListTypeSelector.js.map