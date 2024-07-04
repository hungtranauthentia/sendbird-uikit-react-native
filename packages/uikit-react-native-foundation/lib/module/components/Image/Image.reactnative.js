function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Image } from 'react-native';
const Image_ReactNative = _ref => {
  let {
    onLoad,
    onError,
    style,
    tintColor,
    ...props
  } = _ref;
  return /*#__PURE__*/React.createElement(Image, _extends({}, props, {
    style: [style, {
      tintColor
    }],
    onError: onError && (e => onError(e.nativeEvent)),
    onLoad: onLoad && (e => onLoad(e.nativeEvent.source))
  }));
};
export default Image_ReactNative;
//# sourceMappingURL=Image.reactnative.js.map