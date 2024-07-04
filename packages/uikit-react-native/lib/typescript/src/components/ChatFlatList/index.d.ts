import React from 'react';
import { FlatListProps, FlatList as RNFlatList } from 'react-native';
import { SendbirdMessage } from '@sendbird/uikit-utils';
declare const ChatFlatList: React.ForwardRefExoticComponent<Omit<FlatListProps<SendbirdMessage>, "onEndReached"> & {
    onBottomReached: () => void;
    onTopReached: () => void;
    onScrolledAwayFromBottom: (value: boolean) => void;
} & React.RefAttributes<RNFlatList<any>>>;
export default ChatFlatList;
