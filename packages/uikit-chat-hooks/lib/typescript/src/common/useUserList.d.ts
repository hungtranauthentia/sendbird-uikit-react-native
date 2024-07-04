import type { Optional, SendbirdChatSDK, UserStruct } from '@sendbird/uikit-utils';
import type { CustomQueryInterface, UseUserListOptions, UseUserListReturn } from '../types';
/**
 * Get user list from query.
 * default query uses 'instance.createApplicationUserListQuery'
 * The response type of hook is depends on return type of 'query.next()'
 *
 * You can call hook with your custom query using {@link CustomQuery}
 * Or you can create your 'CustomQueryClass' implemented {@link CustomQueryInterface}'
 *
 * ```example
 *  const { users } = useUserList(sdk, {
 *    queryCreator: () => {
 *      const friendQuery = sdk.createFriendListQuery();
 *      return new CustomQuery({
 *        next: () => friendQuery.next(),
 *        isLoading: () => friendQuery.isLoading,
 *        hasNext: () => friendQuery.hasMore,
 *      });
 *    }
 *  })
 * ```
 * */
export declare const useUserList: <Options extends UseUserListOptions<UserStruct>, QueriedUser extends UserStruct = Options["queryCreator"] extends Optional<() => CustomQueryInterface<infer User extends UserStruct>> ? User : import("@sendbird/chat").User>(sdk: SendbirdChatSDK, options?: UseUserListOptions<QueriedUser> | undefined) => UseUserListReturn<QueriedUser>;
