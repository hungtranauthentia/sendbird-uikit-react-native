function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import React from 'react';
import { TextInput as RNTextInput } from 'react-native';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const TextInput = /*#__PURE__*/React.forwardRef(function TextInput(_ref, ref) {
  let {
    children,
    style,
    variant = 'default',
    editable = true,
    ...props
  } = _ref;
  const {
    typography,
    colors
  } = useUIKitTheme();
  const variantStyle = colors['ui']['input'][variant];
  const inputStyle = editable ? variantStyle.active : variantStyle.disabled;
  const underlineStyle = variant === 'underline' && {
    borderBottomWidth: 2,
    borderBottomColor: inputStyle.highlight
  };
  const fontStyle = {
    ...typography.body3,
    lineHeight: typography.body3.fontSize ? typography.body3.fontSize * 1.2 : undefined
  };
  return /*#__PURE__*/React.createElement(RNTextInput, _extends({
    ref: ref,
    editable: editable,
    selectionColor: inputStyle.highlight,
    placeholderTextColor: inputStyle.placeholder,
    style: [fontStyle, styles.input, {
      color: inputStyle.text,
      backgroundColor: inputStyle.background
    }, underlineStyle, style]
  }, props), children);
});
const styles = createStyleSheet({
  input: {
    includeFontPadding: false,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16
  }
});
export default TextInput;
//# sourceMappingURL=index.js.map