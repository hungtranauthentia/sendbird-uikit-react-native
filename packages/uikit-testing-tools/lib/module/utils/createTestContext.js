export const createTestContext = additionalContext => {
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
//# sourceMappingURL=createTestContext.js.map