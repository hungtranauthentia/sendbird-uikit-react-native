import React, { ErrorInfo } from 'react';
import type { ErrorBoundaryProps } from '../types';
declare class InternalErrorBoundaryContainer extends React.PureComponent<{
    onError?: (props: ErrorBoundaryProps) => void;
    ErrorInfoComponent?: (props: ErrorBoundaryProps) => React.ReactNode;
    children?: React.ReactNode;
}> {
    static defaultProps: {
        ErrorInfoComponent: (props: ErrorBoundaryProps) => React.JSX.Element;
    };
    state: {
        error: Error | null;
        errorInfo: ErrorInfo | null;
    };
    componentDidCatch: (error: Error, errorInfo: ErrorInfo) => void;
    reset: () => void;
    render: () => string | number | boolean | React.JSX.Element | Iterable<React.ReactNode> | null;
}
export default InternalErrorBoundaryContainer;
