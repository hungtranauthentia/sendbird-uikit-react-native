"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTestContext = void 0;
const createTestContext = additionalContext => {
  const context = {
    date: Date.now(),
    increment: 0
  };
  return {
    get date() {
      return context.date;
    },
    get increment() {
      return context.increment;
    },
    increaseIncrement: () => context.increment++,
    getHash: () => Math.random().toString(16).slice(2),
    getRandom: () => Math.random(),
    ...additionalContext
  };
};
exports.createTestContext = createTestContext;
//# sourceMappingURL=createTestContext.js.map