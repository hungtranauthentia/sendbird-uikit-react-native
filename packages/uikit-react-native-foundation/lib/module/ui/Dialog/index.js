import React, { useCallback, useContext, useRef } from 'react';
import { useForceUpdate } from '@sendbird/uikit-utils';
import ActionMenu from '../ActionMenu';
import Alert from '../Alert';
import BottomSheet from '../BottomSheet';
import Prompt from '../Prompt';
const AlertContext = /*#__PURE__*/React.createContext(null);
const ActionMenuContext = /*#__PURE__*/React.createContext(null);
const PromptContext = /*#__PURE__*/React.createContext(null);
const BottomSheetContext = /*#__PURE__*/React.createContext(null);
const DISMISS_TIMEOUT = 3000;
export const DialogProvider = _ref => {
  var _workingDialogJob$cur, _workingDialogJob$cur2, _defaultLabels$alert, _workingDialogJob$cur3, _defaultLabels$prompt, _defaultLabels$prompt2, _defaultLabels$prompt3, _workingDialogJob$cur4;
  let {
    defaultLabels,
    children
  } = _ref;
  const waitDismissTimeout = useRef();
  const waitDismissPromise = useRef();
  const waitDismiss = useCallback(resolver => {
    waitDismissPromise.current = resolver;
    waitDismissTimeout.current = setTimeout(completeDismiss, DISMISS_TIMEOUT);
  }, []);
  const completeDismiss = useCallback(() => {
    if (waitDismissTimeout.current) clearTimeout(waitDismissTimeout.current);
    if (waitDismissPromise.current) waitDismissPromise.current();
    waitDismissTimeout.current = undefined;
    waitDismissPromise.current = undefined;
  }, []);
  const render = useForceUpdate();
  const dialogQueue = useRef([]);
  const workingDialogJob = useRef();
  const visibleState = useRef(false);
  const isProcessing = () => Boolean(workingDialogJob.current);
  const updateToShow = useCallback(() => {
    visibleState.current = true;
    render();
  }, []);
  const updateToHide = useCallback(() => {
    return new Promise(resolve => {
      visibleState.current = false;
      render();
      waitDismiss(resolve);
    });
  }, []);
  const consumeQueue = useCallback(() => {
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
  const alert = useCallback(createJob('Alert'), []);
  const openMenu = useCallback(createJob('ActionMenu'), []);
  const openPrompt = useCallback(createJob('Prompt'), []);
  const openSheet = useCallback(createJob('BottomSheet'), []);
  return /*#__PURE__*/React.createElement(AlertContext.Provider, {
    value: {
      alert
    }
  }, /*#__PURE__*/React.createElement(ActionMenuContext.Provider, {
    value: {
      openMenu
    }
  }, /*#__PURE__*/React.createElement(PromptContext.Provider, {
    value: {
      openPrompt
    }
  }, /*#__PURE__*/React.createElement(BottomSheetContext.Provider, {
    value: {
      openSheet
    }
  }, children, ((_workingDialogJob$cur = workingDialogJob.current) === null || _workingDialogJob$cur === void 0 ? void 0 : _workingDialogJob$cur.type) === 'ActionMenu' && /*#__PURE__*/React.createElement(ActionMenu, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    menuItems: workingDialogJob.current.props.menuItems
  }), ((_workingDialogJob$cur2 = workingDialogJob.current) === null || _workingDialogJob$cur2 === void 0 ? void 0 : _workingDialogJob$cur2.type) === 'Alert' && /*#__PURE__*/React.createElement(Alert, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    message: workingDialogJob.current.props.message,
    buttons: workingDialogJob.current.props.buttons ?? [{
      text: (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$alert = defaultLabels.alert) === null || _defaultLabels$alert === void 0 ? void 0 : _defaultLabels$alert.ok) || 'OK'
    }]
  }), ((_workingDialogJob$cur3 = workingDialogJob.current) === null || _workingDialogJob$cur3 === void 0 ? void 0 : _workingDialogJob$cur3.type) === 'Prompt' && /*#__PURE__*/React.createElement(Prompt, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    title: workingDialogJob.current.props.title,
    onSubmit: workingDialogJob.current.props.onSubmit,
    defaultValue: workingDialogJob.current.props.defaultValue,
    submitLabel: workingDialogJob.current.props.submitLabel ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt = defaultLabels.prompt) === null || _defaultLabels$prompt === void 0 ? void 0 : _defaultLabels$prompt.ok),
    cancelLabel: workingDialogJob.current.props.cancelLabel ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt2 = defaultLabels.prompt) === null || _defaultLabels$prompt2 === void 0 ? void 0 : _defaultLabels$prompt2.cancel),
    placeholder: workingDialogJob.current.props.placeholder ?? (defaultLabels === null || defaultLabels === void 0 ? void 0 : (_defaultLabels$prompt3 = defaultLabels.prompt) === null || _defaultLabels$prompt3 === void 0 ? void 0 : _defaultLabels$prompt3.placeholder)
  }), ((_workingDialogJob$cur4 = workingDialogJob.current) === null || _workingDialogJob$cur4 === void 0 ? void 0 : _workingDialogJob$cur4.type) === 'BottomSheet' && /*#__PURE__*/React.createElement(BottomSheet, {
    onHide: updateToHide,
    onDismiss: consumeQueue,
    visible: visibleState.current,
    sheetItems: workingDialogJob.current.props.sheetItems,
    HeaderComponent: workingDialogJob.current.props.HeaderComponent
  })))));
};
export const useActionMenu = () => {
  const context = useContext(ActionMenuContext);
  if (!context) throw new Error('ActionMenuContext is not provided, wrap your app with DialogProvider');
  return context;
};
export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('AlertContext is not provided, wrap your app with DialogProvider');
  return context;
};
export const usePrompt = () => {
  const context = useContext(PromptContext);
  if (!context) throw new Error('PromptContext is not provided, wrap your app with DialogProvider');
  return context;
};
export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) throw new Error('BottomSheetContext is not provided, wrap your app with DialogProvider');
  return context;
};
//# sourceMappingURL=index.js.map