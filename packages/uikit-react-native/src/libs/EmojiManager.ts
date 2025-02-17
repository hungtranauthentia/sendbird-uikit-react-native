import { ImageProps } from 'react-native';

import { Icon } from '@sendbird/uikit-react-native-foundation';
import type { SendbirdEmoji, SendbirdEmojiCategory, SendbirdEmojiContainer } from '@sendbird/uikit-utils';

import type { AsyncLocalCacheStorage } from '../types';
import InternalLocalCacheStorage from './InternalLocalCacheStorage';

class MemoryStorage implements AsyncLocalCacheStorage {
  _data: Record<string, string> = {};

  async getAllKeys(): Promise<readonly string[] | string[]> {
    return Object.keys(this._data);
  }

  async getItem(key: string): Promise<string | null> {
    return this._data[key];
  }

  async removeItem(key: string): Promise<void> {
    delete this._data[key];
  }

  async setItem(key: string, value: string): Promise<void> {
    this._data[key] = value;
  }
}
type EmojiCategoryId = string;
type EmojiKey = string;
class EmojiManager {
  static key = 'sendbird-uikit@emoji-manager';

  constructor(
    private internalStorage: InternalLocalCacheStorage = new InternalLocalCacheStorage(new MemoryStorage()),
  ) {}

  private emojiStorage = {
    container: null as null | SendbirdEmojiContainer,
    get: async () => {
      if (!this.emojiStorage.container) {
        const strItem = await this.internalStorage.getItem(EmojiManager.key);
        if (strItem) this.emojiStorage.container = Object.freeze(JSON.parse(strItem));
      }
      return this.emojiStorage.container;
    },
    set: async (container: SendbirdEmojiContainer) => {
      this.emojiStorage.container = Object.freeze(container);
      await this.internalStorage.setItem(EmojiManager.key, JSON.stringify(container));
    },
  };

  private _emojiCategoryMap: Record<EmojiCategoryId, SendbirdEmojiCategory> = {};
  public get emojiCategoryMap() {
    return this._emojiCategoryMap;
  }

  private _allEmojiMap: Record<EmojiKey, SendbirdEmoji> = {};
  public get allEmojiMap() {
    return this._allEmojiMap;
  }

  private _allEmoji: SendbirdEmoji[] = [];
  public get allEmoji() {
    return this._allEmoji;
  }

  public getEmojiIconSource(emoji?: SendbirdEmoji | null | undefined): ImageProps['source'] {
    return emoji?.url ? { uri: emoji.url } : Icon.Assets.question;
  }

  public init = async (emojiContainer?: SendbirdEmojiContainer) => {
    if (emojiContainer) await this.emojiStorage.set(emojiContainer);

    const container = await this.emojiStorage.get();

    if (container) {
      for (const category of container.emojiCategories) {
        this._emojiCategoryMap[category.id] = category;
        for (const emoji of category.emojis) {
          this._allEmojiMap[emoji.key] = emoji;
        }
      }
      this._allEmoji = Object.values(this._allEmojiMap);
    }
  };

  public get emojiHash() {
    return this.emojiStorage.container?.emojiHash;
  }
}

export default EmojiManager;
