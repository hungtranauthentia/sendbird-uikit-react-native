// @ts-nocheck
import { ChannelType } from '@sendbird/chat';
import { createMockChannel } from './createMockChannel';
import { createMockMessage } from './createMockMessage';
import { createMockUser } from './createMockUser';
const dataListFactory = function () {
  let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'message';
  let dataLength = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
  let sdk = arguments.length > 2 ? arguments[2] : undefined;
  return Array(dataLength).fill(0).map(() => {
    switch (type) {
      case 'message':
        return createMockMessage({
          sdk
        });
      case 'openChannel':
        return createMockChannel({
          sdk,
          channelType: ChannelType.OPEN
        });
      case 'groupChannel':
        return createMockChannel({
          sdk,
          channelType: ChannelType.GROUP
        });
      case 'user':
        return createMockUser({
          sdk
        });
    }
  });
};
export const createMockQuery = params => {
  const context = {
    data: dataListFactory(params.type, params.dataLength, params.sdk),
    limit: params.limit || 10,
    cursor: 0,
    loading: false
  };
  return {
    get context() {
      return context;
    },
    get limit() {
      return context.limit;
    },
    get isLoading() {
      return context.loading;
    },
    get hasNext() {
      const startIdx = context.cursor * context.limit;
      const endIdx = startIdx + context.limit;
      return endIdx < context.data.length;
    },
    next: jest.fn(async () => {
      context.loading = true;
      const startIdx = context.cursor * context.limit;
      const endIdx = startIdx + context.limit;
      context.cursor += 1;
      context.loading = false;
      return context.data.slice(startIdx, endIdx);
    })
  };
};
//# sourceMappingURL=createMockQuery.js.map