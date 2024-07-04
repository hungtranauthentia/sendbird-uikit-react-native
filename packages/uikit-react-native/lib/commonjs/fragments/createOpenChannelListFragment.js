"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _openChannelList = require("../domain/openChannelList");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createOpenChannelListFragment = initModule => {
  const OpenChannelListModule = (0, _openChannelList.createOpenChannelListModule)(initModule);
  return _ref => {
    let {
      onPressCreateChannel,
      onPressChannel = _uikitUtils.NOOP,
      flatListProps,
      renderOpenChannelPreview,
      queryCreator
    } = _ref;
    const {
      sdk,
      currentUser
    } = (0, _useContext.useSendbirdChat)();
    const {
      STRINGS
    } = (0, _useContext.useLocalization)();
    const {
      openChannels,
      next,
      refresh,
      refreshing,
      loading,
      error
    } = (0, _uikitChatHooks.useOpenChannelList)(sdk, currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId, {
      queryCreator
    });
    const _renderOpenChannelPreview = props => {
      if (renderOpenChannelPreview) return renderOpenChannelPreview(props);
      return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.PressBox, {
        activeOpacity: 0.8,
        onPress: props.onPress
      }, /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.OpenChannelPreview, {
        coverUrl: props.channel.coverUrl,
        title: STRINGS.OPEN_CHANNEL_LIST.CHANNEL_PREVIEW_TITLE(props.channel),
        frozen: props.channel.isFrozen,
        participantsCount: props.channel.participantCount
      }));
    };
    return /*#__PURE__*/_react.default.createElement(OpenChannelListModule.Provider, null, /*#__PURE__*/_react.default.createElement(OpenChannelListModule.Header, {
      onPressHeaderRight: onPressCreateChannel
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(OpenChannelListModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(OpenChannelListModule.StatusError, {
        onPressRetry: refresh
      })
    }, /*#__PURE__*/_react.default.createElement(OpenChannelListModule.List, {
      onPressChannel: onPressChannel,
      renderOpenChannelPreview: _renderOpenChannelPreview,
      openChannels: openChannels,
      onLoadNext: next,
      refreshing: refreshing,
      onRefresh: refresh,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/_react.default.createElement(OpenChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })));
  };
};
var _default = createOpenChannelListFragment;
exports.default = _default;
//# sourceMappingURL=createOpenChannelListFragment.js.map