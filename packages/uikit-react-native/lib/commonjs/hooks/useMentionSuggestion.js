"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = require("react");
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitUtils = require("@sendbird/uikit-utils");
var _useContext = require("../hooks/useContext");
const useMentionSuggestion = params => {
  const {
    text,
    selection,
    channel,
    mentionedUsers
  } = params;
  const [freshChannel, setFreshChannel] = (0, _react.useState)(channel);
  (0, _uikitUtils.useAsyncEffect)(async () => {
    setFreshChannel(await channel.refresh());
  }, [channel.url]);
  const id = (0, _uikitUtils.useUniqHandlerId)('useMentionSuggestion');
  (0, _uikitChatHooks.useChannelHandler)(params.sdk, id, {
    onUserJoined(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
      setFreshChannel(eventChannel);
    },
    onUserLeft(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
      setFreshChannel(eventChannel);
    },
    onUserBanned(eventChannel) {
      if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
      if (!eventChannel.isGroupChannel()) return;
      setFreshChannel(eventChannel);
    }
  });
  const {
    mentionManager,
    currentUser
  } = (0, _useContext.useSendbirdChat)();
  const [members, setMembers] = (0, _react.useState)([]);
  const searchStringRangeRef = (0, _react.useRef)({
    start: 0,
    end: 0
  });
  const searchLimitedRef = (0, _react.useRef)(false);
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
  (0, _uikitUtils.useDebounceEffect)(() => {
    return fetchMembers().then(setMembers).catch(() => setMembers([]));
  }, mentionManager.config.debounceMills, [text, selection]);
  return {
    members,
    reset: (0, _react.useCallback)(() => setMembers([]), []),
    searchStringRange: searchStringRangeRef.current,
    searchLimited: searchLimitedRef.current
  };
};
var _default = useMentionSuggestion;
exports.default = _default;
//# sourceMappingURL=useMentionSuggestion.js.map