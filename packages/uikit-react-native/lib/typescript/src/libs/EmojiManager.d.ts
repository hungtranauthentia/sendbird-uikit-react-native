import type { SendbirdEmojiContainer } from '@sendbird/uikit-utils';
import InternalLocalCacheStorage from './InternalLocalCacheStorage';
declare class EmojiManager {
    private internalStorage;
    static key: string;
    constructor(internalStorage?: InternalLocalCacheStorage);
    private emojiStorage;
    private _emojiCategoryMap;
    get emojiCategoryMap(): Record<string, import("@sendbird/chat").EmojiCategory>;
    private _allEmojiMap;
    get allEmojiMap(): Record<string, import("@sendbird/chat").Emoji>;
    private _allEmoji;
    get allEmoji(): import("@sendbird/chat").Emoji[];
    init: (emojiContainer?: SendbirdEmojiContainer) => Promise<void>;
    get emojiHash(): string | undefined;
}
export default EmojiManager;
