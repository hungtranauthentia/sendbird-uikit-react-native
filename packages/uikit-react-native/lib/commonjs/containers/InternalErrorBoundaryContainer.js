"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _TypedPlaceholder = _interopRequireDefault(require("../components/TypedPlaceholder"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const DefaultErrorBoundaryComponent = props => {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_TypedPlaceholder.default, {
    type: 'error-wrong',
    onPressRetry: props.reset
  }));
};
class InternalErrorBoundaryContainer extends _react.default.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty(this, "state", {
      error: null,
      errorInfo: null
    });
    _defineProperty(this, "componentDidCatch", (error, errorInfo) => {
      var _this$props$onError, _this$props;
      this.setState({
        error,
        errorInfo
      });
      (_this$props$onError = (_this$props = this.props).onError) === null || _this$props$onError === void 0 ? void 0 : _this$props$onError.call(_this$props, {
        error,
        errorInfo,
        reset: this.reset
      });
    });
    _defineProperty(this, "reset", () => {
      this.setState({
        error: null,
        errorInfo: null
      });
    });
    _defineProperty(this, "render", () => {
      if (this.state.error && this.state.errorInfo) {
        var _this$props$ErrorInfo, _this$props2;
        return ((_this$props$ErrorInfo = (_this$props2 = this.props).ErrorInfoComponent) === null || _this$props$ErrorInfo === void 0 ? void 0 : _this$props$ErrorInfo.call(_this$props2, {
          error: this.state.error,
          errorInfo: this.state.errorInfo,
          reset: this.reset
        })) ?? null;
      }
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, this.props.children);
    });
  }
}
_defineProperty(InternalErrorBoundaryContainer, "defaultProps", {
  ErrorInfoComponent: DefaultErrorBoundaryComponent
});
var _default = InternalErrorBoundaryContainer;
exports.default = _default;
//# sourceMappingURL=InternalErrorBoundaryContainer.js.map