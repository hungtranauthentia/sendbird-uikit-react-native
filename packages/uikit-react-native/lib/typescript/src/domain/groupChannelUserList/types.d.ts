/// <reference types="react" />
import type { UseUserListOptions } from '@sendbird/uikit-chat-hooks';
import type { SendbirdGroupChannel, SendbirdGroupChannelCreateParams, SendbirdMember, UserStruct } from '@sendbird/uikit-utils';
import type { CommonComponent } from '../../types';
import type { GroupChannelType } from '../groupChannelList/types';
import type { UserListProps } from '../userList/types';
export interface GroupChannelCreateProps<User extends UserStruct> {
    Fragment: {
        onPressHeaderLeft: () => void;
        onCreateChannel: (channel: SendbirdGroupChannel) => void;
        channelType?: GroupChannelType;
        onBeforeCreateChannel?: (params: SendbirdGroupChannelCreateParams, users: User[]) => SendbirdGroupChannelCreateParams | Promise<SendbirdGroupChannelCreateParams>;
        sortComparator?: UseUserListOptions<User>['sortComparator'];
        queryCreator?: UseUserListOptions<User>['queryCreator'];
        renderUser?: UserListProps<User>['List']['renderUser'];
    };
}
export type GroupChannelCreateFragment<User extends UserStruct> = CommonComponent<GroupChannelCreateProps<User>['Fragment']>;
export interface GroupChannelInviteProps<User extends UserStruct> {
    Fragment: {
        channel: SendbirdGroupChannel;
        onPressHeaderLeft: () => void;
        onInviteMembers: (channel: SendbirdGroupChannel) => void;
        queryCreator?: UseUserListOptions<User>['queryCreator'];
        renderUser?: UserListProps<User>['List']['renderUser'];
        sortComparator?: UseUserListOptions<User>['sortComparator'];
    };
}
export type GroupChannelInviteFragment<User extends UserStruct> = CommonComponent<GroupChannelInviteProps<User>['Fragment']>;
export interface GroupChannelMembersProps {
    Fragment: {
        channel: SendbirdGroupChannel;
        onPressHeaderLeft: () => void;
        onPressHeaderRight: () => void;
        sortComparator?: UseUserListOptions<SendbirdMember>['sortComparator'];
        renderUser?: UserListProps<SendbirdMember>['List']['renderUser'];
        queryCreator?: UseUserListOptions<SendbirdMember>['queryCreator'];
    };
}
export type GroupChannelMembersFragment = React.FC<GroupChannelMembersProps['Fragment']>;
export interface GroupChannelRegisterOperatorProps {
    Fragment: {
        channel: SendbirdGroupChannel;
        onPressHeaderLeft: () => void;
        onPressHeaderRight: (channel: SendbirdGroupChannel) => void;
        sortComparator?: UseUserListOptions<SendbirdMember>['sortComparator'];
        renderUser?: UserListProps<SendbirdMember>['List']['renderUser'];
        queryCreator?: UseUserListOptions<SendbirdMember>['queryCreator'];
    };
}
export type GroupChannelRegisterOperatorFragment = React.FC<GroupChannelRegisterOperatorProps['Fragment']>;
