function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { convertFileTypeToMessageType, getFileIconFromMessageType } from '@sendbird/uikit-utils';
import IconAssets from '../../assets/icon';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Icon = _ref => {
  let {
    icon,
    color,
    size = 24,
    containerStyle,
    style
  } = _ref;
  const sizeStyle = sizeStyles[size] ?? {
    width: size,
    height: size
  };
  const {
    colors
  } = useUIKitTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: [containerStyle, containerStyles.container]
  }, /*#__PURE__*/React.createElement(Image, {
    resizeMode: 'contain',
    source: IconAssets[icon],
    style: [{
      tintColor: color ?? colors.primary
    }, sizeStyle, style]
  }));
};
const FileIcon = _ref2 => {
  let {
    fileType,
    ...props
  } = _ref2;
  return /*#__PURE__*/React.createElement(Icon, _extends({
    icon: getFileIconFromMessageType(convertFileTypeToMessageType(fileType))
  }, props));
};
const containerStyles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});
const sizeStyles = createStyleSheet({
  16: {
    width: 16,
    height: 16
  },
  20: {
    width: 20,
    height: 20
  },
  24: {
    width: 24,
    height: 24
  },
  28: {
    width: 28,
    height: 28
  },
  32: {
    width: 32,
    height: 32
  }
});
export default Object.assign(Icon, {
  Assets: IconAssets,
  File: FileIcon
});
//# sourceMappingURL=index.js.map