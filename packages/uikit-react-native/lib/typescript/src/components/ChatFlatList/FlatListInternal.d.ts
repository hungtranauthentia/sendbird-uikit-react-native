import type { ForwardedRef, ReactElement } from 'react';
import type { FlatListProps, FlatList as RNFlatList, ScrollViewProps } from 'react-native';
import type { SendbirdMessage } from '@sendbird/uikit-utils';
type FlatListBidirectional<T = SendbirdMessage> = (props: FlatListProps<T> & BidirectionalProps<T>) => ReactElement;
type BidirectionalProps<T> = {
    onStartReached?: ((info: {
        distanceFromStart: number;
    }) => void) | null | undefined;
    onStartReachedThreshold?: number | null | undefined;
    onEndReached?: ((info: {
        distanceFromEnd: number;
    }) => void) | null | undefined;
    onEndReachedThreshold?: number | null | undefined;
    maintainVisibleContentPosition?: ScrollViewProps['maintainVisibleContentPosition'];
    ref: ForwardedRef<RNFlatList<T>>;
};
declare const FlatListInternal: FlatListBidirectional<SendbirdMessage>;
export default FlatListInternal;
