import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { isImage } from '@sendbird/uikit-utils';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Box from '../Box';
import Icon from '../Icon';
import ImageWithPlaceholder from '../ImageWithPlaceholder';
export const VideoThumbnail = _ref => {
  let {
    fetchThumbnailFromVideoSource,
    style,
    source,
    videoSource,
    iconSize = 28
  } = _ref;
  const {
    palette,
    select
  } = useUIKitTheme();
  const {
    thumbnail,
    loading
  } = useRetry(async () => {
    if (isImage(source ?? videoSource)) return {
      path: source ?? videoSource
    };
    return fetchThumbnailFromVideoSource(source ?? videoSource);
  });
  return /*#__PURE__*/React.createElement(Box, {
    style: style
  }, loading ? /*#__PURE__*/React.createElement(Box, {
    style: StyleSheet.absoluteFill,
    backgroundColor: select({
      dark: palette.background400,
      light: palette.background100
    })
  }) : /*#__PURE__*/React.createElement(ImageWithPlaceholder, {
    source: {
      uri: thumbnail ?? 'invalid-image'
    },
    style: StyleSheet.absoluteFill
  }), (loading || thumbnail !== null) && iconSize > 0 && /*#__PURE__*/React.createElement(Box, {
    style: StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'play',
    size: iconSize,
    color: palette.onBackgroundLight02,
    containerStyle: [styles.playIcon, {
      backgroundColor: palette.onBackgroundDark01
    }]
  })));
};
const useRetry = function (fetch) {
  let retryCount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
  const [state, setState] = useState({
    thumbnail: null,
    loading: true
  });
  const retryCountRef = useRef(0);
  const fetchThumbnail = useRef(fetch);
  fetchThumbnail.current = fetch;
  useEffect(() => {
    let _timeout;
    let _cancelled = false;
    if (!state.thumbnail) {
      const tryFetchThumbnail = timeout => {
        const retry = () => {
          retryCountRef.current++;
          tryFetchThumbnail(timeout + 5000);
        };
        const finish = path => {
          if (!_cancelled) setState({
            loading: false,
            thumbnail: path
          });
        };
        if (retryCountRef.current < retryCount) {
          _timeout = setTimeout(() => {
            fetchThumbnail.current().then(result => {
              if (result === null) retry();else finish(result.path);
            }).catch(() => retry());
          }, timeout);
        } else {
          finish(null);
        }
      };
      tryFetchThumbnail(0);
    }
    return () => {
      _cancelled = true;
      clearTimeout(_timeout);
    };
  }, [state.thumbnail]);
  return state;
};
const styles = createStyleSheet({
  playIcon: {
    padding: 10,
    borderRadius: 50
  }
});
//# sourceMappingURL=index.js.map