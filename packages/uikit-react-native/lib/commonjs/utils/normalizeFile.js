"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _uikitUtils = require("@sendbird/uikit-utils");
const normalizeFile = async _ref => {
  let {
    uri,
    size,
    name,
    type
  } = _ref;
  // URI is required property
  if (!uri) return null;
  let filename = name || String(Date.now());
  let filetype = type || '';
  const extension = (0, _uikitUtils.getFileExtension)(filename) || (0, _uikitUtils.getFileExtensionFromMime)(filetype) || (await (0, _uikitUtils.getFileExtensionFromUri)(uri));
  if (extension) {
    filename = (0, _uikitUtils.normalizeFileName)(filename, extension);
    if (!filetype || isNotMimeType(filetype)) {
      filetype = (0, _uikitUtils.getMimeFromFileExtension)(extension);
    }
  }
  return {
    uri,
    name: filename,
    type: filetype,
    size: size ?? 0
  };
};
function isNotMimeType(str) {
  return str.indexOf('/') === -1;
}
var _default = normalizeFile;
exports.default = _default;
//# sourceMappingURL=normalizeFile.js.map