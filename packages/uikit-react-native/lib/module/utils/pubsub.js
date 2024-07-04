const pubsub = () => {
  const subscribers = new Set();
  return {
    publish: data => {
      subscribers.forEach(subscriber => {
        setTimeout(() => subscriber(data), 0);
      });
    },
    subscribe: subscriber => {
      subscribers.add(subscriber);
      return () => subscribers.delete(subscriber);
    }
  };
};
export default pubsub;
//# sourceMappingURL=pubsub.js.map