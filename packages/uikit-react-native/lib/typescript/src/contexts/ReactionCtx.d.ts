import React from 'react';
import type { SendbirdBaseChannel, SendbirdBaseMessage } from '@sendbird/uikit-utils';
import { ReactionBottomSheetProps } from '../components/ReactionBottomSheets';
type State = {
    message?: SendbirdBaseMessage;
    channel?: SendbirdBaseChannel;
};
export type ReactionContextType = {
    openReactionList(param: Required<State>): void;
    openReactionUserList(param: Required<State> & {
        focusIndex?: number;
    }): void;
    updateReactionFocusedItem(param?: State): void;
    focusIndex: number;
} & State;
type Props = React.PropsWithChildren<{
    onPressUserProfile?: ReactionBottomSheetProps['onPressUserProfile'];
}>;
export declare const ReactionContext: React.Context<ReactionContextType | null>;
export declare const ReactionProvider: ({ children, onPressUserProfile }: Props) => React.JSX.Element;
export {};
