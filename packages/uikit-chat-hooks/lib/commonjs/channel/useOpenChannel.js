"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOpenChannel = void 0;
var _react = require("react");
var _uikitUtils = require("@sendbird/uikit-utils");
const initialState = {
  loading: true,
  error: undefined,
  channel: undefined
};
const reducer = (state, nextState) => ({
  ...state,
  ...nextState
});
const useOpenChannel = (sdk, channelUrl) => {
  const [state, setState] = (0, _react.useReducer)(reducer, initialState);
  (0, _uikitUtils.useAsyncEffect)(async () => {
    setState(initialState);
    try {
      setState({
        channel: await sdk.openChannel.getChannel(channelUrl),
        loading: false
      });
    } catch (e) {
      setState({
        error: e,
        loading: false
      });
    }
  }, [channelUrl]);
  return state;
};
exports.useOpenChannel = useOpenChannel;
//# sourceMappingURL=useOpenChannel.js.map