function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { getDownscaleSize, getFileExtension, hash } from '@sendbird/uikit-utils';
import SBUUtils from '../libs/SBUUtils';
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
      return /*#__PURE__*/React.createElement(VideoComponent, _extends({}, props, {
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
          cacheName: hash(url.split('?')[0])
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
      const originSize = await SBUUtils.getImageSize(uri);
      const {
        width,
        height
      } = getDownscaleSize(originSize, {
        width: maxWidth,
        height: maxHeight
      });
      const extension = (() => {
        return {
          'png': 'PNG',
          'jpeg': 'JPEG',
          'jpg': 'JPEG'
        }[getFileExtension(uri)] ?? 'JPEG';
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
export default createNativeMediaService;
//# sourceMappingURL=createMediaService.native.js.map