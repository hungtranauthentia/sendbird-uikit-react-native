import { getFileExtension, getFileExtensionFromMime, getFileExtensionFromUri, getMimeFromFileExtension, normalizeFileName } from '@sendbird/uikit-utils';
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
  const extension = getFileExtension(filename) || getFileExtensionFromMime(filetype) || (await getFileExtensionFromUri(uri));
  if (extension) {
    filename = normalizeFileName(filename, extension);
    if (!filetype || isNotMimeType(filetype)) {
      filetype = getMimeFromFileExtension(extension);
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
export default normalizeFile;
//# sourceMappingURL=normalizeFile.js.map