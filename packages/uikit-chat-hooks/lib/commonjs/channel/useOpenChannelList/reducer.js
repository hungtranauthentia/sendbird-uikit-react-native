"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChannelListReducer = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
const defaultReducer = (_ref, action) => {
  let {
    ...draft
  } = _ref;
  switch (action.type) {
    case 'update_error':
      {
        draft.error = action.value.error;
        break;
      }
    case 'update_refreshing':
    case 'update_loading':
      {
        const key = action.type === 'update_loading' ? 'loading' : 'refreshing';
        draft[key] = action.value.status;
        break;
      }
    case 'update_channels':
      {
        (0, _uikitUtils.getOpenChannels)(action.value.channels).forEach(freshChannel => {
          const idx = draft.openChannels.findIndex(staleChannel => staleChannel.url === freshChannel.url);
          if (idx > -1) draft.openChannels[idx] = freshChannel;
        });
        break;
      }
    case 'delete_channels':
      {
        action.value.channelUrls.forEach(url => {
          const idx = draft.openChannels.findIndex(c => c.url === url);
          if (idx > -1) draft.openChannels.splice(idx, 1);
        });
        break;
      }
    case 'append_channels':
      {
        const openChannels = (0, _uikitUtils.getOpenChannels)(action.value.channels);
        if (action.value.clearBeforeAction) {
          draft.openChannels = openChannels;
        } else {
          draft.openChannels = (0, _uikitUtils.mergeObjectArrays)(draft.openChannels, openChannels, 'url');
        }
        break;
      }
  }
  return draft;
};
const useOpenChannelListReducer = () => {
  const [{
    error,
    loading,
    refreshing,
    openChannels
  }, dispatch] = (0, _react.useReducer)(defaultReducer, {
    loading: true,
    refreshing: false,
    openChannels: [],
    error: null
  });
  const updateChannels = channels => {
    dispatch({
      type: 'update_channels',
      value: {
        channels
      }
    });
  };
  const deleteChannels = channelUrls => {
    dispatch({
      type: 'delete_channels',
      value: {
        channelUrls
      }
    });
  };
  const appendChannels = (channels, clearBeforeAction) => {
    dispatch({
      type: 'append_channels',
      value: {
        channels,
        clearBeforeAction
      }
    });
  };
  const updateLoading = status => {
    dispatch({
      type: 'update_loading',
      value: {
        status
      }
    });
  };
  const updateRefreshing = status => {
    dispatch({
      type: 'update_refreshing',
      value: {
        status
      }
    });
  };
  const updateError = error => {
    dispatch({
      type: 'update_error',
      value: {
        error
      }
    });
  };
  return {
    updateError,
    updateLoading,
    updateRefreshing,
    updateChannels,
    deleteChannels,
    appendChannels,
    error,
    loading,
    refreshing,
    openChannels
  };
};
exports.useOpenChannelListReducer = useOpenChannelListReducer;
//# sourceMappingURL=reducer.js.map