"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _SBUUtils = _interopRequireDefault(require("../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
const createNativeMediaService = _ref => {
  let {
    VideoComponent,
    thumbnailModule,
    imageResizerModule
  } = _ref;
  return {
    VideoComponent(_ref2) {
      let {
        source,
        resizeMode,
        onLoad,
        ...props
      } = _ref2;
      return /*#__PURE__*/_react.default.createElement(VideoComponent, _extends({}, props, {
        source: source,
        resizeMode: resizeMode,
        onLoad: onLoad,
        controls: true
      }));
    },
    async getVideoThumbnail(_ref3) {
      let {
        url,
        timeMills
      } = _ref3;
      try {
        const {
          path
        } = await thumbnailModule.createThumbnail({
          url,
          format: 'jpeg',
          timeStamp: timeMills,
          cacheName: (0, _uikitUtils.hash)(url.split('?')[0])
        });
        return {
          path
        };
      } catch {
        return null;
      }
    },
    async compressImage(_ref4) {
      let {
        uri,
        maxWidth,
        maxHeight,
        compressionRate = 1
      } = _ref4;
      const originSize = await _SBUUtils.default.getImageSize(uri);
      const {
        width,
        height
      } = (0, _uikitUtils.getDownscaleSize)(originSize, {
        width: maxWidth,
        height: maxHeight
      });
      const extension = (() => {
        return {
          'png': 'PNG',
          'jpeg': 'JPEG',
          'jpg': 'JPEG'
        }[(0, _uikitUtils.getFileExtension)(uri)] ?? 'JPEG';
      })();
      const {
        size: resizedSize,
        uri: compressedURI
      } = await imageResizerModule.default.createResizedImage(uri, width, height, extension, Math.min(Math.max(0, compressionRate), 1) * 100);
      return {
        uri: compressedURI,
        size: resizedSize
      };
    }
  };
};
var _default = createNativeMediaService;
exports.default = _default;
//# sourceMappingURL=createMediaService.native.js.map