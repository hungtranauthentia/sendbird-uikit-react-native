"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Text = _interopRequireDefault(require("../Text"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RegexText = _ref => {
  let {
    children,
    patterns,
    ...props
  } = _ref;
  if (patterns.length === 0 || typeof children !== 'string') return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
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
        const children = (0, _uikitUtils.replaceWithRegex)(text, regex, params => replacer({
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
  return /*#__PURE__*/_react.default.createElement(_Text.default, props, matchedTexts);
};
var _default = RegexText;
exports.default = _default;
//# sourceMappingURL=index.js.map