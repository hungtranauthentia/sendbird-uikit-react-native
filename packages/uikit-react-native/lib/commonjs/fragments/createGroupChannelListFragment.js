"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _groupChannel = require("@sendbird/chat/groupChannel");
var _uikitTools = require("@sendbird/uikit-tools");
var _uikitUtils = require("@sendbird/uikit-utils");
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _GroupChannelPreviewContainer = _interopRequireDefault(require("../containers/GroupChannelPreviewContainer"));
var _createGroupChannelListModule = _interopRequireDefault(require("../domain/groupChannelList/module/createGroupChannelListModule"));
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createGroupChannelListFragment = initModule => {
  const GroupChannelListModule = (0, _createGroupChannelListModule.default)(initModule);
  return _ref => {
    let {
      onPressChannel,
      onPressCreateChannel,
      renderGroupChannelPreview,
      skipTypeSelection = false,
      flatListProps = {},
      menuItemCreator = _uikitUtils.PASS,
      channelListQueryParams,
      collectionCreator
    } = _ref;
    const {
      sdk,
      sbOptions,
      markAsDeliveredWithChannel
    } = (0, _useContext.useSendbirdChat)();
    const {
      groupChannels,
      loadMore,
      initialized
    } = (0, _uikitTools.useGroupChannelList)(sdk, {
      collectionCreator: getCollectionCreator(sdk, channelListQueryParams, collectionCreator),
      markAsDelivered: _uikitUtils.confirmAndMarkAsDelivered
    });
    (0, _uikitUtils.useAppState)('change', status => {
      if (sbOptions.appInfo.deliveryReceiptEnabled) {
        if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
      }
    });
    const _renderGroupChannelPreview = (0, _uikitUtils.useFreshCallback)(props => {
      if (renderGroupChannelPreview) return renderGroupChannelPreview(props);
      return /*#__PURE__*/_react.default.createElement(_GroupChannelPreviewContainer.default, props);
    });
    const isChannelTypeAvailable = sbOptions.appInfo.broadcastChannelEnabled || sbOptions.appInfo.superGroupChannelEnabled;
    return /*#__PURE__*/_react.default.createElement(GroupChannelListModule.Provider, null, /*#__PURE__*/_react.default.createElement(GroupChannelListModule.Header, null), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: !initialized,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(GroupChannelListModule.StatusLoading, null)
    }, /*#__PURE__*/_react.default.createElement(GroupChannelListModule.List, {
      onPressChannel: onPressChannel,
      menuItemCreator: menuItemCreator,
      renderGroupChannelPreview: _renderGroupChannelPreview,
      groupChannels: groupChannels,
      onLoadNext: loadMore,
      flatListProps: {
        ListEmptyComponent: /*#__PURE__*/_react.default.createElement(GroupChannelListModule.StatusEmpty, null),
        contentContainerStyle: {
          flexGrow: 1
        },
        ...flatListProps
      }
    })), /*#__PURE__*/_react.default.createElement(GroupChannelListModule.TypeSelector, {
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
      filter: new _groupChannel.GroupChannelFilter(params)
    });
  };
}
var _default = createGroupChannelListFragment;
exports.default = _default;
//# sourceMappingURL=createGroupChannelListFragment.js.map