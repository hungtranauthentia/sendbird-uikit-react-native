"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const createNativeClipboardService = clipboardModule => {
  return {
    getString() {
      return clipboardModule.getString();
    },
    setString(text) {
      return clipboardModule.setString(text);
    }
  };
};
var _default = createNativeClipboardService;
exports.default = _default;
//# sourceMappingURL=createClipboardService.native.js.map