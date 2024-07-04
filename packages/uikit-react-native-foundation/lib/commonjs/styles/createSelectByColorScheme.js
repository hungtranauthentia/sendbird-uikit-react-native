"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * select method factory
 * Select method returns the most fitting value for the color scheme you are currently running on.
 * @param colorScheme
 * @returns Function
 * */
const createSelectByColorScheme = colorScheme => {
  return options => {
    const value = options[colorScheme ?? 'default'] ?? options['light'] ?? options['dark'] ?? options['default'];
    if (!value) throw Error('Not provided any selectable color scheme values');
    return value;
  };
};
var _default = createSelectByColorScheme;
exports.default = _default;
//# sourceMappingURL=createSelectByColorScheme.js.map