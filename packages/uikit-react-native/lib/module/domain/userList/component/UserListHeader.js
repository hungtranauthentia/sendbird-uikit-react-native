import React, { useContext } from 'react';
import { Icon, Text, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { UserListContexts } from '../module/moduleContext';
const UserListHeader = _ref => {
  let {
    onPressHeaderLeft,
    onPressHeaderRight,
    right,
    left,
    shouldActivateHeaderRight = selectedUsers => selectedUsers.length > 0
  } = _ref;
  const {
    headerTitle,
    headerRight
  } = useContext(UserListContexts.Fragment);
  const {
    selectedUsers
  } = useContext(UserListContexts.List);
  const {
    HeaderComponent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const isActive = shouldActivateHeaderRight(selectedUsers);
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    title: headerTitle,
    right: right ?? /*#__PURE__*/React.createElement(Text, {
      button: true,
      color: isActive ? colors.primary : colors.onBackground04
    }, headerRight),
    onPressRight: isActive ? () => onPressHeaderRight(selectedUsers) : undefined,
    left: left ?? /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft
  });
};
export default UserListHeader;
//# sourceMappingURL=UserListHeader.js.map