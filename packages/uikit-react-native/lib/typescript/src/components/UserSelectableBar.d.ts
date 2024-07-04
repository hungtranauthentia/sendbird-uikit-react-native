import React from 'react';
type Props = {
    uri: string;
    name: string;
    selected: boolean;
    disabled: boolean;
};
declare const UserSelectableBar: ({ uri, name, selected, disabled }: Props) => React.JSX.Element;
export default UserSelectableBar;
