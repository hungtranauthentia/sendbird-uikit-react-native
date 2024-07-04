function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Image } from 'react-native';
import FastImageInternal from './FastImageInternal';
function convertCache(cache) {
  switch (cache) {
    case 'force-cache':
    case 'only-if-cached':
      return 'cacheOnly';
    default:
      return 'immutable';
  }
}
function convertSource(source) {
  if (Array.isArray(source)) {
    return convertSource(source[0]);
  }
  if (typeof source === 'number') {
    return source;
  }
  return {
    uri: source.uri,
    headers: source.headers,
    cache: convertCache(source.cache) //'immutable' | 'web' | 'cacheOnly'
  };
}

function convertDefaultSource(source) {
  if (typeof source === 'number') {
    return source;
  }
  return undefined;
}
function convertResizeMode(mode) {
  switch (mode) {
    case 'center':
      return 'center';
    case 'contain':
      return 'contain';
    case 'cover':
      return 'cover';
    case 'stretch':
      return 'stretch';
    default:
      return undefined;
  }
}
const Image_FastImage = _ref => {
  let {
    source,
    defaultSource,
    resizeMode,
    onLoad,
    onError,
    style,
    tintColor,
    disableFastImage = false,
    ...props
  } = _ref;
  if (disableFastImage) {
    return /*#__PURE__*/React.createElement(Image, _extends({}, props, {
      source: source,
      style: [style, {
        tintColor
      }],
      onError: onError && (e => onError(e.nativeEvent)),
      onLoad: onLoad && (e => onLoad(e.nativeEvent.source))
    }));
  }
  return /*#__PURE__*/React.createElement(FastImageInternal, _extends({}, props, {
    onLoad: onLoad && (e => onLoad(e.nativeEvent)),
    onError: onError && (() => onError({})),
    style: style,
    source: convertSource(source),
    defaultSource: convertDefaultSource(defaultSource),
    resizeMode: convertResizeMode(resizeMode)
  }));
};
export default Image_FastImage;
//# sourceMappingURL=Image.fastimage.js.map