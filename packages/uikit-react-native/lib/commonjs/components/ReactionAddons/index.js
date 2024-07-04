"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactionAddons = void 0;
var _BottomSheetReactionAddon = _interopRequireDefault(require("./BottomSheetReactionAddon"));
var _MessageReactionAddon = _interopRequireDefault(require("./MessageReactionAddon"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const ReactionAddons = {
  BottomSheet: _BottomSheetReactionAddon.default,
  Message: _MessageReactionAddon.default
};
exports.ReactionAddons = ReactionAddons;
//# sourceMappingURL=index.js.map