import React from 'react';
import type { UserListProps } from '../types';
declare const UserListHeader: <T>({ onPressHeaderLeft, onPressHeaderRight, right, left, shouldActivateHeaderRight, }: {
    right?: React.ReactNode;
    left?: React.ReactNode;
    onPressHeaderLeft: () => void;
    onPressHeaderRight: (selectedUsers: T[]) => Promise<void>;
    shouldActivateHeaderRight?: ((selectedUsers: T[]) => boolean) | undefined;
}) => React.JSX.Element;
export default UserListHeader;
