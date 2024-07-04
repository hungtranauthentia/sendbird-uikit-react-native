"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _createSelectByColorScheme = _interopRequireDefault(require("../styles/createSelectByColorScheme"));
var _createTypography = _interopRequireDefault(require("../styles/createTypography"));
var _Palette = _interopRequireDefault(require("./Palette"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const createTheme = _ref => {
  let {
    colorScheme,
    palette = _Palette.default,
    colors: createColors,
    typography = {
      shared: {
        fontFamily: 'System'
      }
    }
  } = _ref;
  let _palette = palette;
  let _colors = createColors(_palette);
  return {
    colorScheme,
    select: (0, _createSelectByColorScheme.default)(colorScheme),
    get palette() {
      return _palette;
    },
    set palette(value) {
      _palette = value;
      _colors = createColors(_palette);
    },
    get colors() {
      return _colors;
    },
    set colors(value) {
      _colors = value;
    },
    typography: (0, _createTypography.default)(typography)
  };
};
var _default = createTheme;
exports.default = _default;
//# sourceMappingURL=createTheme.js.map