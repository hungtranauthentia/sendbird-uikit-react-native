function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { Text as RNText } from 'react-native';
import useUIKitTheme from '../../theme/useUIKitTheme';
const Text = _ref => {
  let {
    children,
    color,
    style,
    ...props
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const typoStyle = useTypographyFilter(props);
  return /*#__PURE__*/React.createElement(RNText, _extends({
    style: [{
      color: typeof color === 'string' ? color : (color === null || color === void 0 ? void 0 : color(colors)) ?? colors.text
    }, typoStyle, style]
  }, props), children);
};
const useTypographyFilter = _ref2 => {
  let {
    h1,
    h2,
    subtitle1,
    subtitle2,
    body1,
    body2,
    body3,
    button,
    caption1,
    caption2,
    caption3,
    caption4
  } = _ref2;
  const {
    typography
  } = useUIKitTheme();
  if (h1) return typography.h1;
  if (h2) return typography.h2;
  if (subtitle1) return typography.subtitle1;
  if (subtitle2) return typography.subtitle2;
  if (body1) return typography.body1;
  if (body2) return typography.body2;
  if (body3) return typography.body3;
  if (button) return typography.button;
  if (caption1) return typography.caption1;
  if (caption2) return typography.caption2;
  if (caption3) return typography.caption3;
  if (caption4) return typography.caption4;
  return {};
};
export default Text;
//# sourceMappingURL=index.js.map