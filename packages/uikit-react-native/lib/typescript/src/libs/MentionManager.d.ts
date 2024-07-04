import React from 'react';
import type { SendbirdFileMessage, SendbirdUser, SendbirdUserMessage } from '@sendbird/uikit-utils';
import type { MentionedUser, Range } from '../types';
import type { MentionConfigInterface } from './MentionConfig';
declare class MentionManager {
    config: MentionConfigInterface;
    private _invalidStartsKeywords;
    private _templateRegex;
    constructor(config: MentionConfigInterface);
    rangeHelpers: {
        inRangeUnderOver(start: number, num: number, end: number): boolean;
        inRangeUnderMore(start: number, num: number, end: number): boolean;
        inRangeLessOver(start: number, num: number, end: number): boolean;
        inRangeLessMore(start: number, num: number, end: number): boolean;
        overlaps(a: Range, b: Range, compare?: 'underOver' | 'underMore' | 'lessOver' | 'lessMore'): boolean;
    };
    get templateRegex(): RegExp;
    getSearchString: (text: string, selectionIndex: number) => {
        searchString: string;
        isTriggered: () => boolean;
        isValidSearchString: () => boolean;
    };
    /**
     * @description Reconcile the range by offset in the mentioned users
     * */
    reconcileRangeOfMentionedUsers: (offset: number, selectionIndex: number, mentionedUsers: MentionedUser[]) => MentionedUser[];
    /**
     * @description Remove users who in a range
     * */
    removeMentionedUsersInSelection: (selection: Range, mentionedUsers: MentionedUser[]) => {
        filtered: MentionedUser[];
        lastSelection: number;
        removedOffset: number;
    };
    getSearchStringRangeInText: (selectionIndex: number, searchString: string) => Range;
    /**
     * @description User to @{user.id} template format
     * */
    asMentionedMessageTemplate: (user: SendbirdUser, delimiter?: boolean) => string;
    /**
     * @description User to @user.nickname text format
     * */
    asMentionedMessageText: (user: SendbirdUser, delimiter?: boolean) => string;
    /**
     * @description Bold @user.nickname
     * */
    textToMentionedComponents: (text: string, mentionedUsers: MentionedUser[], mentionEnabled: boolean) => string | React.ReactNode[];
    textToMentionedMessageTemplate: (text: string, mentionedUsers: MentionedUser[], mentionEnabled: boolean) => string;
    /**
     * @description Convert @{user.id} template to @user.nickname text and MentionedUser[] array.
     * */
    templateToTextAndMentionedUsers: (template: string, mentionedUsers: SendbirdUser[]) => {
        mentionedText: string;
        mentionedUsers: MentionedUser[];
    };
    shouldUseMentionedMessageTemplate: (message?: SendbirdUserMessage | SendbirdFileMessage, mentionEnabled?: boolean) => boolean;
}
export default MentionManager;
