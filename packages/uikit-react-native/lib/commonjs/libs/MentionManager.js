"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
class MentionManager {
  constructor(config) {
    var _this = this;
    this.config = config;
    _defineProperty(this, "_invalidStartsKeywords", void 0);
    _defineProperty(this, "_templateRegex", void 0);
    _defineProperty(this, "rangeHelpers", {
      inRangeUnderOver(start, num, end) {
        return start < num && num < end;
      },
      inRangeUnderMore(start, num, end) {
        return start < num && num <= end;
      },
      inRangeLessOver(start, num, end) {
        return start <= num && num < end;
      },
      inRangeLessMore(start, num, end) {
        return start <= num && num <= end;
      },
      overlaps(a, b) {
        let compare = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'underOver';
        const inRange = {
          underOver: this.inRangeUnderOver,
          underMore: this.inRangeUnderMore,
          lessOver: this.inRangeLessOver,
          lessMore: this.inRangeLessMore
        }[compare];
        return inRange(a.start, b.start, a.end) || inRange(a.start, b.end, a.end);
      }
    });
    _defineProperty(this, "getSearchString", (text, selectionIndex) => {
      const lastSpan = text.slice(0, selectionIndex).split(this.config.delimiter).pop() ?? '';
      const triggerIdx = lastSpan.indexOf(this.config.trigger);
      const mentionSpan = triggerIdx === -1 ? lastSpan : lastSpan.slice(triggerIdx);
      const searchString = mentionSpan.slice(this.config.trigger.length);
      return {
        searchString,
        isTriggered: () => mentionSpan.startsWith(this.config.trigger),
        isValidSearchString: () => this._invalidStartsKeywords.every(it => !searchString.startsWith(it))
      };
    });
    /**
     * @description Reconcile the range by offset in the mentioned users
     * */
    _defineProperty(this, "reconcileRangeOfMentionedUsers", (offset, selectionIndex, mentionedUsers) => {
      return mentionedUsers.map(it => {
        // Changes only on the right text of selection.
        if (selectionIndex <= it.range.start) {
          return {
            ...it,
            range: {
              start: it.range.start + offset,
              end: it.range.end + offset
            }
          };
        }
        return it;
      });
    });
    /**
     * @description Remove users who in a range
     * */
    _defineProperty(this, "removeMentionedUsersInSelection", (selection, mentionedUsers) => {
      let lastSelection = 0;
      let removedOffset = 0;
      const filtered = mentionedUsers.filter(it => {
        const shouldRemove = this.rangeHelpers.overlaps(selection, it.range, 'lessMore');
        if (shouldRemove) {
          lastSelection = Math.max(lastSelection, it.range.end);
          removedOffset -= it.range.end - it.range.start;
        }
        return !shouldRemove;
      });
      return {
        filtered,
        lastSelection,
        removedOffset
      };
    });
    _defineProperty(this, "getSearchStringRangeInText", (selectionIndex, searchString) => {
      return {
        start: selectionIndex - searchString.length - this.config.trigger.length,
        end: selectionIndex
      };
    });
    /**
     * @description User to @{user.id} template format
     * */
    _defineProperty(this, "asMentionedMessageTemplate", function (user) {
      let delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return `${_this.config.trigger}{${user.userId}}` + (delimiter ? _this.config.delimiter : '');
    });
    /**
     * @description User to @user.nickname text format
     * */
    _defineProperty(this, "asMentionedMessageText", function (user) {
      let delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return `${_this.config.trigger}${user.nickname}` + (delimiter ? _this.config.delimiter : '');
    });
    /**
     * @description Bold @user.nickname
     * */
    _defineProperty(this, "textToMentionedComponents", (text, mentionedUsers, mentionEnabled) => {
      if (!mentionEnabled || mentionedUsers.length === 0) return text;
      const {
        leftText,
        components
      } = mentionedUsers.sort((a, b) => b.range.start - a.range.start).reduce((_ref, curr, currentIndex) => {
        let {
          leftText,
          components
        } = _ref;
        const leftSpan = leftText.slice(0, curr.range.start);
        const mentionSpan = leftText.slice(curr.range.start, curr.range.end);
        const rightSpan = leftText.slice(curr.range.end);
        return {
          leftText: leftSpan,
          components: [/*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
            key: mentionSpan + currentIndex,
            style: styles.mentionedText
          }, mentionSpan), rightSpan, ...components]
        };
      }, {
        leftText: text,
        components: []
      });
      return [leftText, ...components];
    });
    _defineProperty(this, "textToMentionedMessageTemplate", (text, mentionedUsers, mentionEnabled) => {
      if (!mentionEnabled) return text;
      const {
        leftText,
        strings
      } = mentionedUsers.sort((a, b) => b.range.start - a.range.start).reduce((_ref2, curr) => {
        let {
          leftText,
          strings
        } = _ref2;
        const leftSpan = leftText.slice(0, curr.range.start);
        const templateSpan = this.asMentionedMessageTemplate(curr.user);
        const rightSpan = leftText.slice(curr.range.end);
        return {
          leftText: leftSpan,
          strings: [templateSpan, rightSpan, ...strings]
        };
      }, {
        leftText: text,
        strings: []
      });
      return [leftText, ...strings].join('');
    });
    /**
     * @description Convert @{user.id} template to @user.nickname text and MentionedUser[] array.
     * */
    _defineProperty(this, "templateToTextAndMentionedUsers", (template, mentionedUsers) => {
      const actualMentionedUsers = [];
      let offsetToMove = 0;
      const mentionedText = (0, _uikitUtils.replaceWithRegex)(template, this.templateRegex, _ref3 => {
        let {
          match,
          matchIndex,
          groups
        } = _ref3;
        const user = mentionedUsers.find(it => it.userId === groups[2]);
        if (user && typeof matchIndex === 'number') {
          const userIdSpan = match;
          const userNicknameSpan = this.asMentionedMessageText(user);
          const offsetAfterConverted = userNicknameSpan.length - userIdSpan.length;
          const originalRange = {
            start: matchIndex,
            end: matchIndex + userIdSpan.length
          };
          const convertedRange = {
            start: Math.max(0, originalRange.start + offsetToMove),
            end: originalRange.end + offsetToMove + offsetAfterConverted
          };
          offsetToMove += offsetAfterConverted;
          actualMentionedUsers.push({
            range: convertedRange,
            user
          });
          return userNicknameSpan;
        }
        return match;
      }, '').join('');
      return {
        mentionedText,
        mentionedUsers: actualMentionedUsers
      };
    });
    _defineProperty(this, "shouldUseMentionedMessageTemplate", (message, mentionEnabled) => {
      return Boolean(mentionEnabled && (message === null || message === void 0 ? void 0 : message.mentionedMessageTemplate) && (message === null || message === void 0 ? void 0 : message.mentionedUsers) && (message === null || message === void 0 ? void 0 : message.mentionedUsers.length) > 0);
    });
    this._invalidStartsKeywords = [this.config.trigger, this.config.delimiter];
    this._templateRegex = (0, _uikitUtils.createMentionTemplateRegex)(this.config.trigger);
  }
  get templateRegex() {
    return this._templateRegex;
  }
}
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  mentionedText: {
    fontWeight: '700'
  }
});
var _default = MentionManager;
exports.default = _default;
//# sourceMappingURL=MentionManager.js.map