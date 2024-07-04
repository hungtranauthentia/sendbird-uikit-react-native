"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _normalizeFile = _interopRequireDefault(require("./normalizeFile"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const expoBackwardUtils = {
  imagePicker: {
    isCanceled(result) {
      // @ts-expect-error backward compatibility
      return result.canceled ?? result.cancelled;
    },
    async toFilePickerResponses(result, fsModule) {
      if (result.assets) {
        const assets = result.assets || [];
        const promises = assets.map(_ref => {
          let {
            fileName: name,
            fileSize: size,
            type,
            uri
          } = _ref;
          return (0, _normalizeFile.default)({
            uri,
            size,
            name,
            type
          });
        });
        return Promise.all(promises);
      } else if ('uri' in result && typeof result.uri === 'string') {
        const fileInfo = await fsModule.getInfoAsync(result.uri);
        const response = await (0, _normalizeFile.default)({
          uri: result.uri,
          size: expoBackwardUtils.toFileSize(fileInfo)
        });
        return [response];
      } else {
        return [];
      }
    }
  },
  documentPicker: {
    isCanceled(result) {
      // @ts-expect-error backward compatibility
      return result.canceled ?? result.type === 'cancel';
    },
    async toFilePickerResponses(result) {
      if (result.assets) {
        const assets = result.assets || [];
        const promises = assets.map(_ref2 => {
          let {
            name,
            size,
            mimeType,
            uri
          } = _ref2;
          return (0, _normalizeFile.default)({
            uri,
            size,
            name,
            type: mimeType
          });
        });
        return Promise.all(promises);
      } else if ('uri' in result && typeof result.uri === 'string') {
        // @ts-expect-error backward compatibility
        const {
          mimeType,
          uri,
          size,
          name
        } = result;
        const response = await (0, _normalizeFile.default)({
          uri,
          size,
          name,
          type: mimeType
        });
        return [response];
      } else {
        return [];
      }
    }
  },
  toFileSize(info) {
    if ('size' in info) {
      return info.size;
    } else {
      return 0;
    }
  }
};
var _default = expoBackwardUtils;
exports.default = _default;
//# sourceMappingURL=expoBackwardUtils.js.map