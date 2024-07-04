import React from 'react';
import { replaceWithRegex } from '@sendbird/uikit-utils';
import Text from '../Text';
const RegexText = _ref => {
  let {
    children,
    patterns,
    ...props
  } = _ref;
  if (patterns.length === 0 || typeof children !== 'string') return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  const matchedTexts = [children];
  patterns.forEach((_ref2, patterIndex) => {
    let {
      regex,
      replacer
    } = _ref2;
    const matchedTextsTemp = matchedTexts.concat();
    let offset = 0;
    matchedTextsTemp.forEach((text, index) => {
      if (typeof text === 'string' && text) {
        const children = replaceWithRegex(text, regex, params => replacer({
          ...params,
          parentProps: props,
          keyPrefix: index + params.keyPrefix
        }), String(patterIndex));
        if (children.length > 1) {
          matchedTexts.splice(index + offset, 1, ...children);
          offset += children.length - 1;
        }
      }
    });
  });
  return /*#__PURE__*/React.createElement(Text, props, matchedTexts);
};
export default RegexText;
//# sourceMappingURL=index.js.map