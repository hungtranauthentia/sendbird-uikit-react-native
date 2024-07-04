import React, { useRef, useState } from 'react';
import { MessageSearchOrder } from '@sendbird/chat/message';
import { Logger, NOOP, useFreshCallback, useSafeAreaPadding } from '@sendbird/uikit-utils';
import MessageSearchResultItem from '../components/MessageSearchResultItem';
import StatusComposition from '../components/StatusComposition';
import { createMessageSearchModule } from '../domain/messageSearch';
import { useSendbirdChat } from '../hooks/useContext';
function getMessageSearchQuery(sdk, options) {
  if (options.queryCreator) return options.queryCreator(options);
  return sdk.createMessageSearchQuery(options);
}
const createMessageSearchFragment = initModule => {
  const MessageSearchModule = createMessageSearchModule(initModule);
  return _ref => {
    let {
      onPressHeaderLeft = NOOP,
      channel,
      queryCreator,
      renderSearchResultItem,
      onPressSearchResultItem
    } = _ref;
    const padding = useSafeAreaPadding(['left', 'right', 'bottom']);
    const {
      sdk
    } = useSendbirdChat();
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
    const renderItem = useFreshCallback(props => {
      if (renderSearchResultItem) return renderSearchResultItem(props);
      return /*#__PURE__*/React.createElement(MessageSearchResultItem, props);
    });
    return /*#__PURE__*/React.createElement(MessageSearchModule.Provider, null, /*#__PURE__*/React.createElement(MessageSearchModule.Header, {
      keyword: keyword,
      onChangeKeyword: setKeyword,
      onPressHeaderLeft: onPressHeaderLeft,
      onPressHeaderRight: search
    }), /*#__PURE__*/React.createElement(StatusComposition, {
      loading: loading,
      LoadingComponent: /*#__PURE__*/React.createElement(MessageSearchModule.StatusLoading, null),
      error: Boolean(error),
      ErrorComponent: /*#__PURE__*/React.createElement(MessageSearchModule.StatusError, {
        onPressRetry: search
      })
    }, query && /*#__PURE__*/React.createElement(MessageSearchModule.List, {
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
  const [query, setQuery] = useState();
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const queryInProgress = useRef(false);
  const search = useFreshCallback(async () => {
    if (keyword.length <= 0) return;
    if (queryInProgress.current) return;
    const query = getMessageSearchQuery(sdk, {
      keyword,
      channelUrl: channel.url,
      messageTimestampFrom: channel.messageOffsetTimestamp,
      order: MessageSearchOrder.TIMESTAMP,
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
      Logger.warn('[MessageSearchFragment] search failure', err);
      setError(err);
    } finally {
      queryInProgress.current = false;
      setLoading(false);
    }
  });
  const next = useFreshCallback(async () => {
    if (!(query !== null && query !== void 0 && query.hasNext)) return;
    if (queryInProgress.current) return;
    try {
      queryInProgress.current = true;
      const result = await query.next();
      setSearchResults(prev => [...prev, ...result]);
    } catch (err) {
      Logger.warn('[MessageSearchFragment] next failure', err);
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
export default createMessageSearchFragment;
//# sourceMappingURL=createMessageSearchFragment.js.map