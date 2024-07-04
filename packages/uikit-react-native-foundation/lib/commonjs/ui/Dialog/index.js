"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrompt = exports.useBottomSheet = exports.useAlert = exports.useActionMenu = exports.DialogProvider = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _ActionMenu = _interopRequireDefault(require("../ActionMenu"));
var _Alert = _interopRequireDefault(require("../Alert"));
var _BottomSheet = _interopRequireDefault(require("../BottomSheet"));
var _Prompt = _interopRequireDefault(require("../Prompt"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const AlertContext = /*#__PURE__*/_react.default.createContext(null);
const ActionMenuContext = /*#__PURE__*/_react.default.createContext(null);
const PromptContext = /*#__PURE__*/_react.default.createContext(null);
const BottomSheetContext = /*#__PURE__*/_react.default.createContext(null);
const DISMISS_TIMEOUT = 3000;
const DialogProvider = _ref => {
  var _workingDialogJob$cur, _workingDialogJob$cur2, _defaultLabels$alert, _workingDialogJob$cur3, _defaultLabels$prompt, _defaultLabels$prompt2, _defaultLabels$prompt3, _workingDialogJob$cur4;
  let {
    defaultLabels,
    children
  } = _ref;
  const waitDismissTimeout = (0, _react.useRef)();
  const waitDismissPromise = (0, _react.useRef)();
  const waitDismiss = (0, _react.useCallback)(resolver => {
    waitDismissPromise.current = resolver;
    waitDismissTimeout.current = setTimeout(completeDismiss, DISMISS_TIMEOUT);
  }, []);
  const completeDismiss = (0, _react.useCallback)(() => {
    if (waitDismissTimeout.current) clearTimeout(waitDismissTimeout.current);
    if (waitDismissPromise.current) waitDismissPromise.current();
    waitDismissTimeout.current = undefined;
    waitDismissPromise.current = undefined;
  }, []);
  const render = (0, _uikitUtils.useForceUpdate)();
  const dialogQueue = (0, _react.useRef)([]);
  const workingDialogJob = (0, _react.useRef)();
  const visibleState = (0, _react.useRef)(false);
  const isProcessing = () => Boolean(workingDialogJob.current);
  const updateToShow = (0, _react.useCallback)(() => {
    visibleState.current = true;
    render();
  }, []);
  const updateToHide = (0, _react.useCallback)(() => {
    return new Promise(resolve => {
      visibleState.current = false;
      render();
      waitDismiss(resolve);
    });
  }, []);
  const consumeQueue = (0, _react.useCallback)(() => {
    completeDismiss();
    const job = dialogQueue.current.shift();
    if (job) {
      workingDialogJob.current = job;
      updateToShow();
    } else {
      workingDialogJob.current = undefined;
    }
  }, []);
  const createJob = type => props => {
    const jobItem = {
      type,
      props
    };
    if (isProcessing()) dialogQueue.current.push(jobItem);else {
      workingDialogJob.current = jobItem;
      updateToShow();
    }
  };
  const alert = (0, _react.useCallback)(createJob('Alert'), []);
  const openMenu = (0, _react.useCallback)(createJob('ActionMenu'), []);
  const openPrompt = (0, _react.useCallback)(createJob('Prompt'), []);
  const openSheet = (0, _react.useCallback)(createJob('BottomSheet'), []);
  return /*#__PURE__*/_react.default.createElement(AlertContext.Provider, {
    value: {
      alert
    }
  }, /*#__PURE__*/_react.default.createElement(ActionMenuContext.Provider, {
    value: {
      openMenu
    }
  }, /*#__PURE__*/_react.default.createElement(PromptContext.Provider, {
    value: {
      openPrompt
    }
  }, /*#__PURE__*/_react.default.createElement(BottomSheetContext.Provider, {
    value: {
      openSheet
    }
  }, children, ((_workingDialogJob$cur = workingDialogJob.current) === null || _workingDialogJob$cur === void 0 ? void 0 : _workingDialogJob$cur.type) === 'ActionMenu' && /*#__PURE__*/_react.default.createElement(_ActionMenu.default, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    menuItems: workingDialogJob.current.props.menuItems
  }), ((_workingDialogJob$cur2 = workingDialogJob.current) === null || _workingDialogJob$cur2 === void 0 ? void 0 : _workingDialogJob$cur2.type) === 'Alert' && /*#__PURE__*/_react.default.createElement(_Alert.default, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    message: workingDialogJob.current.props.message,
    buttons: workingDialogJob.current.props.buttons ?? [{
      text: (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$alert = defaultLabels.alert) === null || _defaultLabels$alert === void 0 ? void 0 : _defaultLabels$alert.ok) || 'OK'
    }]
  }), ((_workingDialogJob$cur3 = workingDialogJob.current) === null || _workingDialogJob$cur3 === void 0 ? void 0 : _workingDialogJob$cur3.type) === 'Prompt' && /*#__PURE__*/_react.default.createElement(_Prompt.default, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    onSubmit: workingDialogJob.current.props.onSubmit,
    defaultValue: workingDialogJob.current.props.defaultValue,
    submitLabel: workingDialogJob.current.props.submitLabel ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt = defaultLabels.prompt) === null || _defaultLabels$prompt === void 0 ? void 0 : _defaultLabels$prompt.ok),
    cancelLabel: workingDialogJob.current.props.cancelLabel ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt2 = defaultLabels.prompt) === null || _defaultLabels$prompt2 === void 0 ? void 0 : _defaultLabels$prompt2.cancel),
    placeholder: workingDialogJob.current.props.placeholder ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt3 = defaultLabels.prompt) === null || _defaultLabels$prompt3 === void 0 ? void 0 : _defaultLabels$prompt3.placeholder)
  }), ((_workingDialogJob$cur4 = workingDialogJob.current) === null || _workingDialogJob$cur4 === void 0 ? void 0 : _workingDialogJob$cur4.type) === 'BottomSheet' && /*#__PURE__*/_react.default.createElement(_BottomSheet.default, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    sheetItems: workingDialogJob.current.props.sheetItems,
    HeaderComponent: workingDialogJob.current.props.HeaderComponent
  })))));
};
exports.DialogProvider = DialogProvider;
const useActionMenu = () => {
  const context = (0, _react.useContext)(ActionMenuContext);
  if (!context) throw new Error('ActionMenuContext is not provided, wrap your app with DialogProvider');
  return context;
};
exports.useActionMenu = useActionMenu;
const useAlert = () => {
  const context = (0, _react.useContext)(AlertContext);
  if (!context) throw new Error('AlertContext is not provided, wrap your app with DialogProvider');
  return context;
};
exports.useAlert = useAlert;
const usePrompt = () => {
  const context = (0, _react.useContext)(PromptContext);
  if (!context) throw new Error('PromptContext is not provided, wrap your app with DialogProvider');
  return context;
};
exports.usePrompt = usePrompt;
const useBottomSheet = () => {
  const context = (0, _react.useContext)(BottomSheetContext);
  if (!context) throw new Error('BottomSheetContext is not provided, wrap your app with DialogProvider');
  return context;
};
exports.useBottomSheet = useBottomSheet;
//# sourceMappingURL=index.js.map