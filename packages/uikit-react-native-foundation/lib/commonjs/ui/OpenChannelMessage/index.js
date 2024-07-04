"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Message = _interopRequireDefault(require("./Message.admin"));
var _Message2 = _interopRequireDefault(require("./Message.file"));
var _MessageFile = _interopRequireDefault(require("./Message.file.image"));
var _MessageFile2 = _interopRequireDefault(require("./Message.file.video"));
var _Message3 = _interopRequireDefault(require("./Message.unknown"));
var _Message4 = _interopRequireDefault(require("./Message.user"));
var _MessageUser = _interopRequireDefault(require("./Message.user.og"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const OpenChannelMessage = {
  User: _Message4.default,
  OpenGraphUser: _MessageUser.default,
  File: _Message2.default,
  ImageFile: _MessageFile.default,
  VideoFile: _MessageFile2.default,
  Admin: _Message.default,
  Unknown: _Message3.default
};
var _default = OpenChannelMessage;
exports.default = _default;
//# sourceMappingURL=index.js.map