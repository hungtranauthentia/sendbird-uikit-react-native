"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactionProvider = exports.ReactionContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _ReactionBottomSheets = require("../components/ReactionBottomSheets");
var _LocalizationCtx = require("../contexts/LocalizationCtx");
var _SendbirdChatCtx = require("../contexts/SendbirdChatCtx");
var _UserProfileCtx = require("../contexts/UserProfileCtx");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const ReactionContext = /*#__PURE__*/_react.default.createContext(null);
exports.ReactionContext = ReactionContext;
const ReactionProvider = _ref => {
  let {
    children,
    onPressUserProfile
  } = _ref;
  const chatCtx = (0, _react.useContext)(_SendbirdChatCtx.SendbirdChatContext);
  const localizationCtx = (0, _react.useContext)(_LocalizationCtx.LocalizationContext);
  const userProfileCtx = (0, _react.useContext)(_UserProfileCtx.UserProfileContext);
  if (!chatCtx) throw new Error('SendbirdChatContext is not provided');
  if (!localizationCtx) throw new Error('LocalizationContext is not provided');
  if (!userProfileCtx) throw new Error('UserProfileContext is not provided');
  const [state, setState] = (0, _react.useReducer)((prev, next) => ({
    ...prev,
    ...next
  }), {});
  const [reactionListVisible, setReactionListVisible] = (0, _react.useState)(false);
  const [reactionUserListVisible, setReactionUserListVisible] = (0, _react.useState)(false);
  const [reactionUserListFocusIndex, setReactionUserListFocusIndex] = (0, _react.useState)(0);
  const closeResolver = (0, _react.useRef)(_uikitUtils.NOOP);
  const openReactionList = (0, _react.useCallback)(params => {
    setState(params);
    setReactionListVisible(true);
  }, []);
  const openReactionUserList = (0, _react.useCallback)(_ref2 => {
    let {
      channel,
      message,
      focusIndex = 0
    } = _ref2;
    // NOTE: We don't support reaction user list for supergroup channel
    if (channel.isGroupChannel() && channel.isSuper) return;
    setState({
      channel,
      message
    });
    setReactionUserListFocusIndex(focusIndex);
    setReactionUserListVisible(true);
  }, []);
  const updateReactionFocusedItem = (0, _react.useCallback)(params => {
    if (params) setState(params);else setState({});
  }, []);
  const createOnCloseWithResolver = callback => {
    return () => {
      return new Promise(resolve => {
        closeResolver.current = resolve;
        callback();
      });
    };
  };
  const reactionCtx = {
    ...state,
    openReactionList,
    openReactionUserList,
    updateReactionFocusedItem,
    focusIndex: reactionUserListFocusIndex
  };
  const sheetProps = {
    chatCtx,
    reactionCtx,
    localizationCtx,
    onPressUserProfile: onPressUserProfile ?? userProfileCtx.show,
    onDismiss: () => {
      var _closeResolver$curren;
      setState({});
      (_closeResolver$curren = closeResolver.current) === null || _closeResolver$curren === void 0 ? void 0 : _closeResolver$curren.call(closeResolver);
    }
  };
  return /*#__PURE__*/_react.default.createElement(ReactionContext.Provider, {
    value: reactionCtx
  }, children, /*#__PURE__*/_react.default.createElement(_ReactionBottomSheets.ReactionBottomSheets.UserList, _extends({}, sheetProps, {
    visible: reactionUserListVisible,
    onClose: createOnCloseWithResolver(() => setReactionUserListVisible(false))
  })), /*#__PURE__*/_react.default.createElement(_ReactionBottomSheets.ReactionBottomSheets.ReactionList, _extends({}, sheetProps, {
    visible: reactionListVisible,
    onClose: createOnCloseWithResolver(() => setReactionListVisible(false))
  })));
};
exports.ReactionProvider = ReactionProvider;
//# sourceMappingURL=ReactionCtx.js.map