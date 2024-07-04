function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
let REQ_PER_TIMEOUT = 5;
let TIMEOUT_MILLS = 1000;
const SAFE_TIMEOUT_BUFFER = 100;
function generateRandomId() {
  return Math.random().toString(16).slice(2);
}
export class BufferedRequest {
  static updateMarkAsReadOptions(reqPerTimeout, timeoutMills) {
    BufferedRequest.markAsRead = BufferedRequest.create(reqPerTimeout, timeoutMills);
  }
  static updateMarkAsDeliveredOptions(reqPerTimeout, timeoutMills) {
    BufferedRequest.markAsDelivered = BufferedRequest.create(reqPerTimeout, timeoutMills);
  }
  static get reqPerTimeout() {
    return REQ_PER_TIMEOUT;
  }
  static set reqPerTimeout(value) {
    REQ_PER_TIMEOUT = value;
    BufferedRequest.markAsRead = BufferedRequest.create();
    BufferedRequest.markAsDelivered = BufferedRequest.create();
  }
  static get timeoutMills() {
    return TIMEOUT_MILLS;
  }
  static set timeoutMills(value) {
    TIMEOUT_MILLS = value;
    BufferedRequest.markAsRead = BufferedRequest.create();
    BufferedRequest.markAsDelivered = BufferedRequest.create();
  }
  static create() {
    let reqPerTimeout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : REQ_PER_TIMEOUT;
    let timeoutMills = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : TIMEOUT_MILLS;
    const waitQueue = new Map();
    const nextQueue = new Map();
    let state = 'idle';
    let timeout;
    return {
      push(func, lane) {
        waitQueue.set(lane ?? generateRandomId(), func);
        this.invoke();
      },
      shift() {
        if (nextQueue.size < reqPerTimeout) {
          const nextRemains = Math.min(reqPerTimeout - nextQueue.size, waitQueue.size);
          const lanes = [...waitQueue.keys()];
          for (let n = 0; n < nextRemains; n++) {
            const lane = lanes[n];
            const func = waitQueue.get(lane);
            if (func) {
              waitQueue.delete(lane);
              nextQueue.set(lane, func);
            }
          }
        }
      },
      handleIdle() {
        if (0 < nextQueue.size) {
          state = 'processing';
          this.invoke();
        }
      },
      handleProcessing() {
        if (timeout) return;
        timeout = setTimeout(() => {
          timeout = undefined;
          if (0 < nextQueue.size || 0 < waitQueue.size) {
            this.invoke();
          } else {
            state = 'idle';
          }
        }, timeoutMills + SAFE_TIMEOUT_BUFFER);
        let index = 0;
        const nextRequestBaseTimeout = timeoutMills / nextQueue.size;
        nextQueue.forEach(func => {
          setTimeout(() => {
            func();
            // TODO: Add retry
            //.catch(() => waitQueue.set(lane, func));
          }, nextRequestBaseTimeout * index);
          index++;
        });
        nextQueue.clear();
      },
      async invoke() {
        this.shift();
        if (state === 'idle') {
          this.handleIdle();
        }
        if (state === 'processing') {
          this.handleProcessing();
        }
      }
    };
  }
}
_defineProperty(BufferedRequest, "markAsRead", BufferedRequest.create());
_defineProperty(BufferedRequest, "markAsDelivered", BufferedRequest.create());
//# sourceMappingURL=bufferedRequest.js.map