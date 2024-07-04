function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import React, { useLayoutEffect, useRef, useState } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import { Box, Image, LoadingSpinner, createStyleSheet, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useIIFE } from '@sendbird/uikit-utils';
import { usePlatformService } from '../../hooks/useContext';
import SBUUtils from '../../libs/SBUUtils';
const FileViewerContent = _ref => {
  let {
    type,
    src,
    topInset = 0,
    bottomInset = 0,
    maxZoom = 4,
    minZoom = 1,
    onPress
  } = _ref;
  const [loading, setLoading] = useState(true);
  const {
    defaultHeight
  } = useHeaderStyle();
  const {
    mediaService
  } = usePlatformService();
  const {
    palette
  } = useUIKitTheme();
  const source = {
    uri: src
  };
  const onLoadEnd = () => setLoading(false);
  const mediaViewer = useIIFE(() => {
    switch (type) {
      case 'image':
        {
          return /*#__PURE__*/React.createElement(ZoomableImageView, {
            source: source,
            style: StyleSheet.absoluteFill,
            resizeMode: 'contain',
            onLoadEnd: onLoadEnd,
            zoomProps: {
              minZoom,
              maxZoom,
              onTouchEnd: onPress
            }
          });
        }
      case 'video':
      case 'audio':
        {
          return /*#__PURE__*/React.createElement(mediaService.VideoComponent, {
            source: source,
            style: [StyleSheet.absoluteFill, {
              top: topInset,
              bottom: defaultHeight + bottomInset
            }],
            resizeMode: 'contain',
            onLoad: onLoadEnd
          });
        }
      default:
        {
          return null;
        }
    }
  });
  return /*#__PURE__*/React.createElement(Box, {
    style: styles.container
  }, mediaViewer, loading && /*#__PURE__*/React.createElement(LoadingSpinner, {
    style: {
      position: 'absolute'
    },
    size: 40,
    color: palette.primary300
  }));
};
const ZoomableImageView = _ref2 => {
  let {
    zoomProps,
    ...props
  } = _ref2;
  const {
    width,
    height
  } = useWindowDimensions();
  const imageSize = useRef();
  const [contentSizeProps, setContentSizeProps] = useState({
    contentWidth: width,
    contentHeight: height
  });
  useLayoutEffect(() => {
    SBUUtils.safeRun(async () => {
      if (props.source.uri) {
        const image = imageSize.current ?? (await SBUUtils.getImageSize(props.source.uri));
        imageSize.current = image;
        const viewRatio = width / height;
        const imageRatio = image.width / image.height;
        const fitDirection = viewRatio > imageRatio ? 'height' : 'width';
        const ratio = fitDirection === 'height' ? height / image.height : width / image.width;
        const actualSize = {
          width: image.width * ratio,
          height: image.height * ratio
        };
        setContentSizeProps({
          contentWidth: actualSize.width,
          contentHeight: actualSize.height
        });
      }
    });
  }, [props.source.uri, width, height]);
  return /*#__PURE__*/React.createElement(ReactNativeZoomableView, _extends({
    visualTouchFeedbackEnabled: false,
    style: {
      width,
      height
    },
    initialZoom: 1
  }, contentSizeProps, zoomProps), /*#__PURE__*/React.createElement(Image, props));
};
const styles = createStyleSheet({
  container: {
    zIndex: -1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default FileViewerContent;
//# sourceMappingURL=FileViewerContent.js.map