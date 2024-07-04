function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useFreshCallback } from '@sendbird/uikit-utils';
import ChannelMessageList from '../../../components/ChannelMessageList';
import { OpenChannelContexts } from '../module/moduleContext';
const OpenChannelMessageList = props => {
  const {
    setMessageToEdit
  } = useContext(OpenChannelContexts.Fragment);
  const {
    subscribe
  } = useContext(OpenChannelContexts.PubSub);
  const ref = useRef(null);
  const [scrolledAwayFromBottom, setScrolledAwayFromBottom] = useState(false);
  const scrollToBottom = useFreshCallback(function () {
    let animated = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    // FIXME: Workaround, should run after data has been applied to UI.
    setTimeout(() => {
      var _ref$current;
      (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollToOffset({
        offset: 0,
        animated
      });
    }, 0);
  });
  useEffect(() => {
    return subscribe(_ref => {
      let {
        type
      } = _ref;
      switch (type) {
        case 'MESSAGES_RECEIVED':
          {
            scrollToBottom(false);
            break;
          }
        case 'MESSAGE_SENT_SUCCESS':
        case 'MESSAGE_SENT_PENDING':
          {
            scrollToBottom(false);
            break;
          }
      }
    });
  }, []);
  return /*#__PURE__*/React.createElement(ChannelMessageList, _extends({}, props, {
    ref: ref,
    onPressScrollToBottomButton: scrollToBottom,
    onPressNewMessagesButton: scrollToBottom,
    scrolledAwayFromBottom: scrolledAwayFromBottom,
    onScrolledAwayFromBottom: setScrolledAwayFromBottom,
    onEditMessage: setMessageToEdit
  }));
};
export default /*#__PURE__*/React.memo(OpenChannelMessageList);
//# sourceMappingURL=OpenChannelMessageList.js.map