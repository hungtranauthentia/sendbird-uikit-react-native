"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncatedCount = exports.truncate = exports.millsToMSS = exports.millsToMMSS = exports.getMessageTimeFormat = exports.getMessagePreviewTitle = exports.getMessagePreviewTime = exports.getMessagePreviewBody = exports.getDateSeparatorFormat = void 0;
var _dateFns = require("date-fns");
const defaultOpts = {
  mode: 'mid',
  maxLen: 40,
  separator: '...'
};

/**
 * String truncate util
 * @param {string} str
 * @param {Object} opts Options for truncate
 * @param {'head' | 'mid' | 'tail'} opts.mode  default "mid"
 * @param {number} opts.maxLen  default 40
 * @param {string} opts.separator default "..."
 * @returns {string}
 * */
const truncate = function (str) {
  let opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOpts;
  const options = {
    ...defaultOpts,
    ...opts
  };
  const {
    maxLen,
    mode,
    separator
  } = options;
  if (str.length <= maxLen) return str;
  if (mode === 'head') {
    return separator + str.slice(-maxLen);
  }
  if (mode === 'mid') {
    const lead = Math.ceil(maxLen / 2);
    const trail = Math.floor(maxLen / 2);
    return str.slice(0, lead) + separator + str.slice(-trail);
  }
  if (mode === 'tail') {
    return str.slice(0, maxLen) + separator;
  }
  throw new Error('Invalid truncate mode: ' + mode);
};

/**
 * Count truncate util
 * If count exceed the limit, it comes in the form of "MAX+"
 *
 * @param {number} count
 * @param {number} MAX default 99
 * @param {string} MAX_SUFFIX default +
 * @returns {string}
 * */
exports.truncate = truncate;
const truncatedCount = function (count) {
  let MAX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 99;
  let MAX_SUFFIX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '+';
  if (count >= MAX) return `${MAX}${MAX_SUFFIX}`;
  return `${count}`;
};

/**
 * Messages date separator format
 *
 * @param {Date} date
 * @param {Locale} [locale]
 * @returns {string}
 * */
exports.truncatedCount = truncatedCount;
const getDateSeparatorFormat = (date, locale) => {
  if ((0, _dateFns.isThisYear)(date)) return (0, _dateFns.format)(date, 'MMM dd, yyyy', {
    locale
  });
  return (0, _dateFns.format)(date, 'E, MMM dd', {
    locale
  });
};

/**
 * Message time format
 *
 * @param {Date} date
 * @param {Locale} [locale]
 * @returns {string}
 * */
exports.getDateSeparatorFormat = getDateSeparatorFormat;
const getMessageTimeFormat = (date, locale) => {
  return (0, _dateFns.format)(date, 'p', {
    locale
  });
};

/**
 * Message preview title text
 * */
exports.getMessageTimeFormat = getMessageTimeFormat;
const getMessagePreviewTitle = function (message) {
  let EMPTY_USERNAME = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '(No name)';
  if (message.isFileMessage() || message.isUserMessage()) {
    return message.sender.nickname || EMPTY_USERNAME;
  }
  if (message.isAdminMessage()) {
    return 'Admin';
  }
  return EMPTY_USERNAME;
};

/**
 * Message preview body text
 * */
exports.getMessagePreviewTitle = getMessagePreviewTitle;
const getMessagePreviewBody = function (message) {
  let EMPTY_MESSAGE = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  if (message.isFileMessage()) {
    const extIdx = message.name.lastIndexOf('.');
    if (extIdx > -1) {
      const file = message.name.slice(0, extIdx);
      const ext = message.name.slice(extIdx);
      return file + ext;
    }
    return message.name;
  }
  if (message.isUserMessage()) {
    return message.message ?? EMPTY_MESSAGE;
  }
  if (message.isAdminMessage()) {
    return message.message ?? EMPTY_MESSAGE;
  }
  return EMPTY_MESSAGE;
};

/**
 * Message preview time format
 * */
exports.getMessagePreviewBody = getMessagePreviewBody;
const getMessagePreviewTime = (timestamp, locale) => {
  if ((0, _dateFns.isToday)(timestamp)) return (0, _dateFns.format)(timestamp, 'p', {
    locale
  });
  if ((0, _dateFns.isYesterday)(timestamp)) return 'Yesterday';
  if ((0, _dateFns.isThisYear)(timestamp)) return (0, _dateFns.format)(timestamp, 'MMM dd', {
    locale
  });
  return (0, _dateFns.format)(timestamp, 'yyyy/MM/dd', {
    locale
  });
};

/**
 * milliseconds to 00:00 format
 * */
exports.getMessagePreviewTime = getMessagePreviewTime;
const millsToMMSS = mills => {
  let seconds = Math.floor(Math.max(0, mills) / 1000);
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');
  return `${mm}:${ss}`;
};

/**
 * milliseconds to 0:00 format
 * */
exports.millsToMMSS = millsToMMSS;
const millsToMSS = mills => {
  let seconds = Math.floor(Math.max(0, mills) / 1000);
  const minutes = Math.floor(seconds / 60);
  seconds = seconds % 60;
  const ss = String(seconds).padStart(2, '0');
  return `${minutes}:${ss}`;
};
exports.millsToMSS = millsToMSS;
//# sourceMappingURL=common.js.map