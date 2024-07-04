"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const createExpoClipboardService = clipboardModule => {
  return {
    getString() {
      return clipboardModule.getStringAsync();
    },
    setString(text) {
      return clipboardModule.setString(text);
    }
  };
};
var _default = createExpoClipboardService;
exports.default = _default;
//# sourceMappingURL=createClipboardService.expo.js.map