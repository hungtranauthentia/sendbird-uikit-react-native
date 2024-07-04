function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { View } from 'react-native';
import { isFunction } from '@sendbird/uikit-utils';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Box = _ref => {
  let {
    style,
    children,
    ...props
  } = _ref;
  const boxStyle = useBoxStyle(props);
  return /*#__PURE__*/React.createElement(View, _extends({}, props, {
    style: [boxStyle, style]
  }), children);
};
const useBoxStyle = props => {
  const theme = useUIKitTheme();
  const {
    backgroundColor,
    ...rest
  } = props;
  return {
    backgroundColor: isFunction(backgroundColor) ? backgroundColor(theme) : backgroundColor,
    ...rest
  };
};
export default Box;
//# sourceMappingURL=index.js.map