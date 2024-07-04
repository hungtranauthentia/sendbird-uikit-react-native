"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayToMapWithGetter = arrayToMapWithGetter;
exports.default = arrayToMap;
/**
 * Convert Array of the object to Object
 * @param {object[]} arr
 * @param {keyof object} selector
 * @param {keyof object} [fallbackSelector]
 * @param {boolean} [combine]
 * @returns {Record<keyof object, object>}
 * @example
 * ```
 *  const arr = [{name: 'john'}, {name: 'chris'}, {name: 'sravan'}, {name: 'hoon'}];
 *  const obj = arrayToMap(arr, 'name');
 *
 *  console.log(obj);
 *  // {
 *  //  'john': {name: 'john'},
 *  //  'chris': {name: 'chris'},
 *  //  'sravan': {name: 'sravan'},
 *  //  'hoon': {name: 'hoon'}
 *  // }
 * ```
 * */
function arrayToMap(arr, selector, fallbackSelector, combine) {
  return arr.reduce((accum, curr) => {
    if (combine && fallbackSelector) {
      const _key = curr[selector] + curr[fallbackSelector];
      accum[_key] = curr;
    } else {
      const _key = curr[selector] || curr[fallbackSelector];
      accum[_key] = curr;
    }
    return accum;
  }, {});
}
function arrayToMapWithGetter(arr, getSelector) {
  return arr.reduce((accum, curr) => {
    const _key = getSelector(curr);
    accum[_key] = curr;
    return accum;
  }, {});
}
//# sourceMappingURL=arrayToMap.js.map