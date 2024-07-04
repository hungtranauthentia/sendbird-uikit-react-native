import { useCallback, useRef, useState } from 'react';
import { useChannelHandler } from '@sendbird/uikit-chat-hooks';
import { isDifferentChannel, useAsyncEffect, useDebounceEffect, useUniqHandlerId } from '@sendbird/uikit-utils';
import { useSendbirdChat } from '../hooks/useContext';
const useMentionSuggestion = params => {
  const {
    text,
    selection,
    channel,
    mentionedUsers
  } = params;
  const [freshChannel, setFreshChannel] = useState(channel);
  useAsyncEffect(async () => {
    setFreshChannel(await channel.refresh());
  }, [channel.url]);
  const id = useUniqHandlerId('useMentionSuggestion');
  useChannelHandler(params.sdk, id, {
    onUserJoined(eventChannel) {
      if (isDifferentChannel(eventChannel, channel)) return;
      setFreshChannel(eventChannel);
    },
    onUserLeft(eventChannel) {
      if (isDifferentChannel(eventChannel, channel)) return;
      setFreshChannel(eventChannel);
    },
    onUserBanned(eventChannel) {
      if (isDifferentChannel(eventChannel, channel)) return;
      if (!eventChannel.isGroupChannel()) return;
      setFreshChannel(eventChannel);
    }
  });
  const {
    mentionManager,
    currentUser
  } = useSendbirdChat();
  const [members, setMembers] = useState([]);
  const searchStringRangeRef = useRef({
    start: 0,
    end: 0
  });
  const searchLimitedRef = useRef(false);
  const updateSearchStringRange = (selectionIndex, searchString) => {
    searchStringRangeRef.current = mentionManager.getSearchStringRangeInText(selectionIndex, searchString);
    return searchStringRangeRef.current;
  };
  const updateSearchLimited = (mentionCount, mentionLimit) => {
    searchLimitedRef.current = mentionCount >= mentionLimit;
    return searchLimitedRef.current;
  };
  const resetRefs = () => {
    searchLimitedRef.current = false;
    searchStringRangeRef.current = {
      start: 0,
      end: 0
    };
  };
  const fetchMembers = async () => {
    resetRefs();
    const selectionRanged = selection.start !== selection.end;
    if (selectionRanged) return [];
    const selectionContainsMentionedUser = mentionedUsers.some(it => mentionManager.rangeHelpers.overlaps(it.range, selection, 'underMore'));
    if (selectionContainsMentionedUser) return [];
    const {
      isTriggered,
      isValidSearchString,
      searchString
    } = mentionManager.getSearchString(text, selection.start);
    if (!isTriggered() || !isValidSearchString()) return [];
    const limited = updateSearchLimited(mentionedUsers.length, mentionManager.config.mentionLimit);
    if (limited) return [];
    updateSearchStringRange(selection.start, searchString);
    if (freshChannel.isSuper) {
      return freshChannel.createMemberListQuery({
        nicknameStartsWithFilter: searchString,
        limit: mentionManager.config.suggestionLimit + 1
      }).next().then(members => members.filter(member => member.userId !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId))).then(members => members.slice(0, mentionManager.config.suggestionLimit));
    } else {
      return freshChannel.members.sort((a, b) => {
        var _a$nickname;
        return (_a$nickname = a.nickname) === null || _a$nickname === void 0 ? void 0 : _a$nickname.localeCompare(b.nickname);
      }).filter(member => {
        var _member$nickname;
        return ((_member$nickname = member.nickname) === null || _member$nickname === void 0 ? void 0 : _member$nickname.toLowerCase().startsWith(searchString.toLowerCase())) && member.userId !== (currentUser === null || currentUser === void 0 ? void 0 : currentUser.userId) && member.isActive;
      }).slice(0, mentionManager.config.suggestionLimit);
    }
  };
  useDebounceEffect(() => {
    return fetchMembers().then(setMembers).catch(() => setMembers([]));
  }, mentionManager.config.debounceMills, [text, selection]);
  return {
    members,
    reset: useCallback(() => setMembers([]), []),
    searchStringRange: searchStringRangeRef.current,
    searchLimited: searchLimitedRef.current
  };
};
export default useMentionSuggestion;
//# sourceMappingURL=useMentionSuggestion.js.map