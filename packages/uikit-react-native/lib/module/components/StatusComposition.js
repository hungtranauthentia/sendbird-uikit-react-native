import React from 'react';
const StatusComposition = _ref => {
  let {
    children,
    error,
    ErrorComponent,
    LoadingComponent,
    loading
  } = _ref;
  if (loading && LoadingComponent) return /*#__PURE__*/React.createElement(React.Fragment, null, LoadingComponent);
  if (error && ErrorComponent) return /*#__PURE__*/React.createElement(React.Fragment, null, ErrorComponent);
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};
export default StatusComposition;
//# sourceMappingURL=StatusComposition.js.map