import React from 'react';
import { NOOP } from '@sendbird/uikit-utils';
import { createGroupChannelNotificationsModule } from '../domain/groupChannelNotifications';
const createGroupChannelNotificationsFragment = initModule => {
  const GroupChannelNotificationsModule = createGroupChannelNotificationsModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel
    } = _ref;
    return /*#__PURE__*/React.createElement(GroupChannelNotificationsModule.Provider, {
      channel: channel
    }, /*#__PURE__*/React.createElement(GroupChannelNotificationsModule.Header, {
      onPressHeaderLeft: onPressHeaderLeft
    }), /*#__PURE__*/React.createElement(GroupChannelNotificationsModule.View, null));
  };
};
export default createGroupChannelNotificationsFragment;
//# sourceMappingURL=createGroupChannelNotificationsFragment.js.map