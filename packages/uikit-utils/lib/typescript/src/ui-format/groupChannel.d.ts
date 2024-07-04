import type { Locale } from 'date-fns';
import type { SendbirdGroupChannel } from '../types';
export declare const getGroupChannelTitle: (currentUserId: string, channel: SendbirdGroupChannel, EMPTY_USERNAME?: string, NO_MEMBERS?: string, DEFAULT_CHANNEL_NAME?: string) => string;
export declare const getGroupChannelPreviewTime: (channel: SendbirdGroupChannel, locale?: Locale) => string;
export declare const getGroupChannelLastMessage: (channel: SendbirdGroupChannel, EMPTY_MESSAGE?: string) => string;
