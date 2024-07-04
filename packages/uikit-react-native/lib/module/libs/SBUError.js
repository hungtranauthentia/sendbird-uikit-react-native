function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var SBUErrorCode = /*#__PURE__*/function (SBUErrorCode) {
  SBUErrorCode[SBUErrorCode["ERR_UNKNOWN"] = 90000000] = "ERR_UNKNOWN";
  SBUErrorCode[SBUErrorCode["ERR_PERMISSIONS_DENIED"] = 91001000] = "ERR_PERMISSIONS_DENIED";
  SBUErrorCode[SBUErrorCode["ERR_DEVICE_UNAVAILABLE"] = 91001001] = "ERR_DEVICE_UNAVAILABLE";
  return SBUErrorCode;
}(SBUErrorCode || {});
export default class SBUError extends Error {
  static get UNKNOWN() {
    return new SBUError(SBUErrorCode.ERR_UNKNOWN);
  }
  static get PERMISSIONS_DENIED() {
    return new SBUError(SBUErrorCode.ERR_PERMISSIONS_DENIED);
  }
  static get DEVICE_UNAVAILABLE() {
    return new SBUError(SBUErrorCode.ERR_DEVICE_UNAVAILABLE);
  }
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}
_defineProperty(SBUError, "CODE", SBUErrorCode);
//# sourceMappingURL=SBUError.js.map