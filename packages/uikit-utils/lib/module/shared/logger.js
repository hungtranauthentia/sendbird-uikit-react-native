/* eslint-disable no-console */

const LogLevelEnum = {
  'none': 0,
  'log': 1,
  'error': 2,
  'warn': 3,
  'info': 4,
  'debug': 5
};
const createLogger = function () {
  let level = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'warn';
  let _logLevel = level;
  let _title = '[UIKit]';
  return {
    setTitle(title) {
      _title = title;
    },
    setLogLevel(lv) {
      _logLevel = lv;
    },
    getLogLevel() {
      return _logLevel;
    },
    log() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.log) return LogLevelEnum.none;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      console.log(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    error() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.error) return LogLevelEnum.none;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      console.error(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    warn() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.warn) return LogLevelEnum.none;
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      console.warn(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    info() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.info) return LogLevelEnum.none;
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      console.info(_title, ...args);
      return LogLevelEnum[_logLevel];
    },
    debug() {
      if (LogLevelEnum[_logLevel] < LogLevelEnum.debug) return LogLevelEnum.none;
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      console.log(_title, ...args);
      return LogLevelEnum[_logLevel];
    }
  };
};
export const Logger = {
  ...createLogger(),
  LogLevelEnum,
  create: createLogger
};
//# sourceMappingURL=logger.js.map