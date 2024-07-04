import { useMemo, useRef, useState } from 'react';
import { Logger, SBErrorCode, SBErrorMessage, useAsyncEffect, useFreshCallback } from '@sendbird/uikit-utils';
const createUserQuery = (sdk, queryCreator) => {
  if (queryCreator) return queryCreator();
  // In order to use the API, the option must be turned on in the dashboard.
  return sdk.createApplicationUserListQuery();
};

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
export const useUserList = (sdk, options) => {
  const query = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [users, setUsers] = useState([]);
  const sortedUsers = useMemo(() => {
    if (options !== null && options !== void 0 && options.sortComparator) return users.sort(options.sortComparator);
    return users;
  }, [users, options === null || options === void 0 ? void 0 : options.sortComparator]);
  const upsertUser = useFreshCallback(user => {
    setUsers(_ref => {
      let [...draft] = _ref;
      const userIdx = draft.findIndex(it => it.userId === user.userId);
      if (userIdx > -1) draft[userIdx] = user;else draft.push(user);
      return draft;
    });
  });
  const deleteUser = useFreshCallback(userId => {
    setUsers(_ref2 => {
      let [...draft] = _ref2;
      const userIdx = draft.findIndex(it => it.userId === userId);
      if (userIdx > -1) draft.splice(userIdx, 1);
      return draft;
    });
  });
  const updateUsers = (users, clearPrev) => {
    if (clearPrev) setUsers(users);else setUsers(prev => prev.concat(users));
  };
  const init = useFreshCallback(async () => {
    var _query$current;
    query.current = createUserQuery(sdk, options === null || options === void 0 ? void 0 : options.queryCreator);
    if ((_query$current = query.current) !== null && _query$current !== void 0 && _query$current.hasNext) {
      var _query$current2;
      const users = await ((_query$current2 = query.current) === null || _query$current2 === void 0 ? void 0 : _query$current2.next().catch(e => {
        Logger.error(e);
        if (e.code === SBErrorCode.UNAUTHORIZED_REQUEST) Logger.warn(SBErrorMessage.ACL);
        throw e;
      }));
      updateUsers(users, true);
    }
  });
  useAsyncEffect(async () => {
    setLoading(true);
    setError(null);
    try {
      await init();
    } catch (e) {
      setError(e);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const refresh = useFreshCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      await init();
    } catch (e) {
      setError(e);
      setUsers([]);
    } finally {
      setRefreshing(false);
    }
  });
  const next = useFreshCallback(async () => {
    var _query$current3;
    if (query.current && (_query$current3 = query.current) !== null && _query$current3 !== void 0 && _query$current3.hasNext) {
      const nextUsers = await query.current.next().catch(e => {
        Logger.error(e);
        if (e.code === SBErrorCode.UNAUTHORIZED_REQUEST) Logger.warn(SBErrorMessage.ACL);
        throw e;
      });
      updateUsers(nextUsers, false);
    }
  });
  return {
    loading,
    error,
    users: sortedUsers,
    upsertUser,
    deleteUser,
    next,
    refreshing,
    refresh
  };
};
//# sourceMappingURL=useUserList.js.map