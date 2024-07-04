"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  NOOP: true,
  ASYNC_NOOP: true,
  PASS: true,
  toMegabyte: true,
  isFunction: true,
  ifThenOr: true,
  SBErrorCode: true,
  SBErrorMessage: true,
  Logger: true,
  arrayToMap: true,
  arrayToMapWithGetter: true
};
exports.ASYNC_NOOP = void 0;
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _logger.Logger;
  }
});
exports.SBErrorMessage = exports.SBErrorCode = exports.PASS = exports.NOOP = void 0;
Object.defineProperty(exports, "arrayToMap", {
  enumerable: true,
  get: function () {
    return _arrayToMap.default;
  }
});
Object.defineProperty(exports, "arrayToMapWithGetter", {
  enumerable: true,
  get: function () {
    return _arrayToMap.arrayToMapWithGetter;
  }
});
exports.ifThenOr = ifThenOr;
exports.toMegabyte = exports.isFunction = void 0;
var _logger = require("./shared/logger");
var _arrayToMap = _interopRequireWildcard(require("./shared/arrayToMap"));
var _regex = require("./shared/regex");
Object.keys(_regex).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _regex[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _regex[key];
    }
  });
});
var _bufferedRequest = require("./shared/bufferedRequest");
Object.keys(_bufferedRequest).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _bufferedRequest[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bufferedRequest[key];
    }
  });
});
var _file = require("./shared/file");
Object.keys(_file).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _file[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _file[key];
    }
  });
});
var _shared = require("./shared");
Object.keys(_shared).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _shared[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _shared[key];
    }
  });
});
var _hooks = require("./hooks");
Object.keys(_hooks).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _hooks[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _hooks[key];
    }
  });
});
var _reactNative = require("./hooks/react-native");
Object.keys(_reactNative).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _reactNative[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _reactNative[key];
    }
  });
});
var _groupChannel = require("./ui-format/groupChannel");
Object.keys(_groupChannel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _groupChannel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _groupChannel[key];
    }
  });
});
var _openChannel = require("./ui-format/openChannel");
Object.keys(_openChannel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _openChannel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _openChannel[key];
    }
  });
});
var _common = require("./ui-format/common");
Object.keys(_common).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _common[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _common[key];
    }
  });
});
var _channel = require("./sendbird/channel");
Object.keys(_channel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _channel[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _channel[key];
    }
  });
});
var _message = require("./sendbird/message");
Object.keys(_message).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _message[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _message[key];
    }
  });
});
var _attrs = require("./sendbird/attrs");
Object.keys(_attrs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _attrs[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _attrs[key];
    }
  });
});
var _user = require("./sendbird/user");
Object.keys(_user).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _user[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _user[key];
    }
  });
});
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const NOOP = () => void 0;
exports.NOOP = NOOP;
const ASYNC_NOOP = async () => void 0;
exports.ASYNC_NOOP = ASYNC_NOOP;
const PASS = val => val;
exports.PASS = PASS;
const toMegabyte = byte => byte / 1024 / 1024;
exports.toMegabyte = toMegabyte;
const isFunction = param => typeof param === 'function';
exports.isFunction = isFunction;
function ifThenOr(cond, then, or) {
  if (cond) return then;
  return or;
}
const SBErrorCode = {
  UNAUTHORIZED_REQUEST: 400108,
  RESOURCE_NOT_FOUND: 400201,
  BANNED_USER_SEND_MESSAGE_NOT_ALLOWED: 900100,
  CHANNEL_NOT_FOUND: 900500
};
exports.SBErrorCode = SBErrorCode;
const SBErrorMessage = {
  ACL: 'Sendbird provides various access control options when using the Chat SDK.\n' + 'By default, the Allow retrieving user list attribute is turned on to facilitate creating sample apps.\n' + 'However, this may grant access to unwanted data or operations, leading to potential security concerns.\n' + 'To manage your access control settings, you can turn on or off each setting on Sendbird Dashboard.'
};
exports.SBErrorMessage = SBErrorMessage;
//# sourceMappingURL=index.js.map