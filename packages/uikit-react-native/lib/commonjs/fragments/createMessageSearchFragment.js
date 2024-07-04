"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _message = require("@sendbird/chat/message");
var _uikitUtils = require("@sendbird/uikit-utils");
var _MessageSearchResultItem = _interopRequireDefault(require("../components/MessageSearchResultItem"));
var _StatusComposition = _interopRequireDefault(require("../components/StatusComposition"));
var _messageSearch = require("../domain/messageSearch");
var _useContext = require("../hooks/useContext");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function getMessageSearchQuery(sdk, options) {
  if (options.queryCreator) return options.queryCreator(options);
  return sdk.createMessageSearchQuery(options);
}
const createMessageSearchFragment = initModule => {
  const MessageSearchModule = (0, _messageSearch.createMessageSearchModule)(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = _uikitUtils.NOOP,
      channel,
      queryCreator,
      renderSearchResultItem,
      onPressSearchResultItem
    } = _ref;
    const padding = (0, _uikitUtils.useSafeAreaPadding)(['left', 'right', 'bottom']);
    const {
      sdk
    } = (0, _useContext.useSendbirdChat)();
    const {
      keyword,
      setKeyword,
      search,
      searchResults,
      loading,
      next,
      error,
      query
    } = useMessageSearch(sdk, {
      channel,
      queryCreator
    });
    const renderItem = (0, _uikitUtils.useFreshCallback)(props => {
      if (renderSearchResultItem) return renderSearchResultItem(props);
      return /*#__PURE__*/_react.default.createElement(_MessageSearchResultItem.default, props);
    });
    return /*#__PURE__*/_react.default.createElement(MessageSearchModule.Provider, null, /*#__PURE__*/_react.default.createElement(MessageSearchModule.Header, {
      keyword: keyword,
      onChangeKeyword: setKeyword,
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: search
    }), /*#__PURE__*/_react.default.createElement(_StatusComposition.default, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/_react.default.createElement(MessageSearchModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/_react.default.createElement(MessageSearchModule.StatusError, {
        onPressRetry: search
      })
    }, query && /*#__PURE__*/_react.default.createElement(MessageSearchModule.List, {
      channel: channel,
      onPressSearchResultItem: onPressSearchResultItem,
      messages: searchResults,
      renderSearchResultItem: renderItem,
      flatListProps: {
        keyboardDismissMode: 'on-drag',
        keyboardShouldPersistTaps: 'handled',
        onEndReached: next,
        ListEmptyComponent: MessageSearchModule.StatusEmpty,
        contentContainerStyle: {
          flexGrow: 1,
          ...padding
        }
      }
    })));
  };
};
const useMessageSearch = (sdk, _ref2) => {
  let {
    channel,
    queryCreator
  } = _ref2;
  const [query, setQuery] = (0, _react.useState)();
  const [keyword, setKeyword] = (0, _react.useState)('');
  const [loading, setLoading] = (0, _react.useState)(false);
  const [error, setError] = (0, _react.useState)(null);
  const [searchResults, setSearchResults] = (0, _react.useState)([]);
  const queryInProgress = (0, _react.useRef)(false);
  const search = (0, _uikitUtils.useFreshCallback)(async () => {
    if (keyword.length <= 0) return;
    if (queryInProgress.current) return;
    const query = getMessageSearchQuery(sdk, {
      keyword,
      channelUrl: channel.url,
      messageTimestampFrom: channel.messageOffsetTimestamp,
      order: _message.MessageSearchOrder.TIMESTAMP,
      queryCreator
    });
    setQuery(query);
    setLoading(true);
    setError(null);
    try {
      queryInProgress.current = true;
      const result = await query.next();
      setSearchResults(result);
    } catch (err) {
      _uikitUtils.Logger.warn('[MessageSearchFragment] search failure', err);
      setError(err);
    } finally {
      queryInProgress.current = false;
      setLoading(false);
    }
  });
  const next = (0, _uikitUtils.useFreshCallback)(async () => {
    if (!(query !== null && query !== void 0 && query.hasNext)) return;
    if (queryInProgress.current) return;
    try {
      queryInProgress.current = true;
      const result = await query.next();
      setSearchResults(prev => [...prev, ...result]);
    } catch (err) {
      _uikitUtils.Logger.warn('[MessageSearchFragment] next failure', err);
      setError(err);
    } finally {
      queryInProgress.current = false;
    }
  });
  return {
    keyword,
    setKeyword,
    query,
    loading,
    error,
    searchResults,
    search,
    next
  };
};
var _default = createMessageSearchFragment;
exports.default = _default;
//# sourceMappingURL=createMessageSearchFragment.js.map