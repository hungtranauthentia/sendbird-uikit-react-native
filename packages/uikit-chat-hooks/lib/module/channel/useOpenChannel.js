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
export const useOpenChannel = (sdk, channelUrl) => {
  const [state, setState] = useReducer(reducer, initialState);
  useAsyncEffect(async () => {
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
//# sourceMappingURL=useOpenChannel.js.map