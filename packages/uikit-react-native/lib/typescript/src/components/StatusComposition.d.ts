import React, { ReactNode } from 'react';
type Props = {
    loading?: boolean;
    LoadingComponent?: ReactNode;
    error?: boolean;
    ErrorComponent?: ReactNode;
    children: React.ReactNode;
};
declare const StatusComposition: ({ children, error, ErrorComponent, LoadingComponent, loading }: Props) => React.JSX.Element;
export default StatusComposition;
