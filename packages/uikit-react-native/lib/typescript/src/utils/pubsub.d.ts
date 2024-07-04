export type PubSub<T> = {
    publish: (data: T) => void;
    subscribe: (subscriber: (data: T) => void) => () => void;
};
declare const pubsub: <T>() => PubSub<T>;
export default pubsub;
