"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _ChannelMessageList = _interopRequireDefault(require("../../../components/ChannelMessageList"));
var _moduleContext = require("../module/moduleContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const OpenChannelMessageList = props => {
  const {
    setMessageToEdit
  } = (0, _react.useContext)(_moduleContext.OpenChannelContexts.Fragment);
  const {
    subscribe
  } = (0, _react.useContext)(_moduleContext.OpenChannelContexts.PubSub);
  const ref = (0, _react.useRef)(null);
  const [scrolledAwayFromBottom, setScrolledAwayFromBottom] = (0, _react.useState)(false);
  const scrollToBottom = (0, _uikitUtils.useFreshCallback)(function () {
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
  (0, _react.useEffect)(() => {
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
  return /*#__PURE__*/_react.default.createElement(_ChannelMessageList.default, _extends({}, props, {
    ref: ref,
    onPressScrollToBottomButton: scrollToBottom,
    onPressNewMessagesButton: scrollToBottom,
    scrolledAwayFromBottom: scrolledAwayFromBottom,
    onScrolledAwayFromBottom: setScrolledAwayFromBottom,
    onEditMessage: setMessageToEdit
  }));
};
var _default = /*#__PURE__*/_react.default.memo(OpenChannelMessageList);
exports.default = _default;
//# sourceMappingURL=OpenChannelMessageList.js.map