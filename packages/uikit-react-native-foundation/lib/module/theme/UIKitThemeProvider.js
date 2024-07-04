import React from 'react';
import LightUIKitTheme from './LightUIKitTheme';
import UIKitThemeContext from './UIKitThemeContext';
const UIKitThemeProvider = _ref => {
  let {
    children,
    theme = LightUIKitTheme
  } = _ref;
  return /*#__PURE__*/React.createElement(UIKitThemeContext.Provider, {
    value: theme
  }, children);
};
export default UIKitThemeProvider;
//# sourceMappingURL=UIKitThemeProvider.js.map