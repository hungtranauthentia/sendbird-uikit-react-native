import { useReducer } from 'react';
import { useAsyncEffect } from '@sendbird/uikit-utils';
const initialState = {
  loading: true,
  error: undefined,
  channel: undefined
};
const reducer = (state, nextState) => ({
  ...state,
  ...nextState
});
export const useGroupChannel = (sdk, channelUrl) => {
  const [state, setState] = useReducer(reducer, initialState);
  useAsyncEffect(async () => {
    setState(initialState);
    try {
      setState({
        channel: await sdk.groupChannel.getChannel(channelUrl),
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
//# sourceMappingURL=useGroupChannel.js.map