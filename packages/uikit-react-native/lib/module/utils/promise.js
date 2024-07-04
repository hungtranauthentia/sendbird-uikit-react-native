import 'react-native';

/**
 * This file contains subcomponents with separate copyright notices and license terms.
 * Your use of the source code for these subcomponents is subject to the terms and conditions of the following licenses.
 *
 * MIT License: https://github.com/then/promise
 *
 * Copyright (c) 2014 Forbes Lindesay
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 * Original code: https://github.com/then/promise/blob/master/src/es6-extensions.js
 * */
let iterableToArray = function (iterable) {
  if (typeof Array.from === 'function') {
    // ES2015+, iterables exist
    iterableToArray = Array.from;
    return Array.from(iterable);
  }

  // ES5, only arrays and array-likes exist
  iterableToArray = function (x) {
    return Array.prototype.slice.call(x);
  };
  return Array.prototype.slice.call(iterable);
};
function onSettledFulfill(value) {
  return {
    status: 'fulfilled',
    value: value
  };
}
function onSettledReject(reason) {
  return {
    status: 'rejected',
    reason: reason
  };
}
function mapAllSettled(item) {
  if (item && (typeof item === 'object' || typeof item === 'function')) {
    if (item instanceof Promise && item.then === Promise.prototype.then) {
      return item.then(onSettledFulfill, onSettledReject);
    }
    // @ts-expect-error
    const then = item.then;
    if (typeof then === 'function') {
      return new Promise(then.bind(item)).then(onSettledFulfill, onSettledReject);
    }
  }

  // @ts-expect-error
  return onSettledFulfill(item);
}
function getAggregateError(errors) {
  if (typeof AggregateError === 'function') {
    return new AggregateError(errors, 'All promises were rejected');
  }
  const error = new Error('All promises were rejected');
  error.name = 'AggregateError';
  error.errors = errors;
  return error;
}
export const PromisePolyfill = {
  allSettled(values) {
    return Promise.all(iterableToArray(values).map(mapAllSettled));
  },
  race(values) {
    return new Promise(function (resolve, reject) {
      iterableToArray(values).forEach(function (value) {
        Promise.resolve(value).then(resolve, reject);
      });
    });
  },
  any(values) {
    return new Promise(function (resolve, reject) {
      const promises = iterableToArray(values);
      let hasResolved = false;
      const rejectionReasons = [];
      function resolveOnce(value) {
        if (!hasResolved) {
          hasResolved = true;
          resolve(value);
        }
      }
      function rejectionCheck(reason) {
        rejectionReasons.push(reason);
        if (rejectionReasons.length === promises.length) {
          reject(getAggregateError(rejectionReasons));
        }
      }
      if (promises.length === 0) {
        reject(getAggregateError(rejectionReasons));
      } else {
        promises.forEach(function (value) {
          Promise.resolve(value).then(resolveOnce, rejectionCheck);
        });
      }
    });
  },
  apply() {
    // https://github.com/facebook/react-native/blob/main/packages/react-native/Libraries/Utilities/PolyfillFunctions.js
    if (typeof global !== 'undefined' && 'Promise' in global) {
      if (!global.Promise.allSettled) {
        global.Promise.allSettled = this.allSettled;
      }
      if (!global.Promise.any) {
        global.Promise.any = this.any;
      }
      if (!global.Promise.race) {
        global.Promise.race = this.race;
      }
    }
  }
};
//# sourceMappingURL=promise.js.map