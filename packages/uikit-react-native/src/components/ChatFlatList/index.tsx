import { FlashList, FlashListProps } from '@shopify/flash-list';
import React, { forwardRef, useCallback, useRef } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Platform, StyleSheet, View } from 'react-native';

import { useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { SendbirdMessage, getMessageUniqId, useFreshCallback } from '@sendbird/uikit-utils';

function isInvertedFlatListFixedVersion() {
  if (Platform.constants.reactNativeVersion?.major < 1) {
    if (Platform.constants.reactNativeVersion?.minor < 73) {
      if (Platform.constants.reactNativeVersion?.patch < 4) {
        return false;
      }
    }
  }
  return true;
}

let ANDROID_BUG_ALERT_SHOWED = Platform.OS !== 'android' || isInvertedFlatListFixedVersion();
const BOTTOM_DETECT_THRESHOLD = 50;
const UNREACHABLE_THRESHOLD = Number.MIN_SAFE_INTEGER;

type Props = Omit<FlashListProps<SendbirdMessage>, 'onEndReached'> & {
  onBottomReached: () => void;
  onTopReached: () => void;
  onScrolledAwayFromBottom: (value: boolean) => void;
  onStartReachedThreshold?: number | null | undefined;
};
const ChatFlatList = forwardRef<FlashList<SendbirdMessage>, Props>(function ChatFlatList(
  { onTopReached, onBottomReached, onScrolledAwayFromBottom, onScroll, onStartReachedThreshold, ...props },
  ref,
) {
  const { select } = useUIKitTheme();
  const contentOffsetY = useRef(0);
  const canMomentum = useRef(false);

  const _onScroll = useFreshCallback<NonNullable<Props['onScroll']>>((event) => {
    onScroll?.(event);

    const { contentOffset } = event.nativeEvent;

    const prevOffsetY = contentOffsetY.current;
    const currOffsetY = contentOffset.y;

    if (BOTTOM_DETECT_THRESHOLD < prevOffsetY && currOffsetY <= BOTTOM_DETECT_THRESHOLD) {
      onScrolledAwayFromBottom(false);
    } else if (BOTTOM_DETECT_THRESHOLD < currOffsetY && prevOffsetY <= BOTTOM_DETECT_THRESHOLD) {
      onScrolledAwayFromBottom(true);
    }

    contentOffsetY.current = contentOffset.y;
  });

  if (__DEV__ && !ANDROID_BUG_ALERT_SHOWED) {
    ANDROID_BUG_ALERT_SHOWED = true;
    // eslint-disable-next-line no-console
    console.warn(
      'UIKit Warning: The Inverted FlatList had performance issues on Android.\n' +
        'This issue was fixed in 0.72.4+\n' +
        'Please refer to the link: https://github.com/facebook/react-native/issues/30034',
    );
  }

  const onMomentumScrollBegin = useCallback(() => {
    canMomentum.current = true;
  }, []);

  /**
   * @shopify/flash-list doesn't support onStartReached
   * Implement a workaround with using {onMomentumScrollEnd}
   *
   * https://reactnative.dev/docs/virtualizedlist#onstartreachedthreshold
   * How far from the start (in units of visible length of the list) the leading edge of the list must be from the start of the content to trigger the onStartReached callback. Thus, a value of 0.5 will trigger onStartReached when the start of the content is within half the visible length of the list.
   */
  const onMomentumScrollEnd = useCallback(
    ({ nativeEvent: { contentOffset, layoutMeasurement } }: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!canMomentum.current) return;

      const onStartReachedThresholdValue = onStartReachedThreshold ?? 0.5;
      const distanceFromStart = contentOffset.y;
      if (distanceFromStart <= layoutMeasurement.height * onStartReachedThresholdValue) {
        onBottomReached();
      }

      canMomentum.current = false;
    },
    [onStartReachedThreshold],
  );

  return (
    <View style={{ flex: 1, ...StyleSheet.flatten(props.style) }}>
      <FlashList
        bounces={false}
        removeClippedSubviews
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'handled'}
        indicatorStyle={select({ light: 'black', dark: 'white' })}
        {...props}
        // FIXME: inverted list of ListEmptyComponent is reversed {@link https://github.com/facebook/react-native/issues/21196#issuecomment-836937743}
        inverted={Boolean(props.data?.length)}
        ref={ref}
        onEndReached={onTopReached}
        onMomentumScrollBegin={onMomentumScrollBegin}
        onMomentumScrollEnd={onMomentumScrollEnd}
        // onStartReached={onBottomReached}
        scrollEventThrottle={16}
        onScroll={_onScroll}
        keyExtractor={getMessageUniqId}
        maintainVisibleContentPosition={{ minIndexForVisible: 0, autoscrollToTopThreshold: UNREACHABLE_THRESHOLD }}
      />
    </View>
  );
});

export default ChatFlatList;
