import React from 'react';
import { conditionChaining, truncatedCount } from '@sendbird/uikit-utils';
import Box from '../../components/Box';
import Icon from '../../components/Icon';
import Image from '../../components/Image';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
const OpenChannelPreview = _ref => {
  let {
    customCover,
    coverUrl,
    participantsCount = 0,
    title,
    frozen
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.openChannelPreview.default.none;
  return /*#__PURE__*/React.createElement(Box, {
    backgroundColor: color.background,
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  }, /*#__PURE__*/React.createElement(Box, {
    width: styles.channelCover.width,
    height: styles.channelCover.height,
    borderRadius: styles.channelCover.width,
    overflow: 'hidden',
    marginRight: 16
  }, conditionChaining([Boolean(customCover)], [customCover, /*#__PURE__*/React.createElement(Image, {
    resizeMode: 'cover',
    style: [styles.channelCover, {
      backgroundColor: color.coverBackground
    }],
    source: {
      uri: coverUrl
    }
  })])), /*#__PURE__*/React.createElement(Box, {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    flexShrink: 1,
    marginBottom: 4,
    alignItems: 'center'
  }, /*#__PURE__*/React.createElement(Text, {
    subtitle1: true,
    style: styles.channelInfoTitle,
    numberOfLines: 1,
    color: color.textTitle
  }, title), frozen && /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    icon: 'freeze',
    color: color.frozenIcon,
    containerStyle: styles.marginLeft
  })), /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }, /*#__PURE__*/React.createElement(Box, {
    flexDirection: 'row',
    alignItems: 'center'
  }, /*#__PURE__*/React.createElement(Icon, {
    size: 16,
    icon: 'members',
    color: color.participantsIcon,
    containerStyle: styles.marginRight
  }), /*#__PURE__*/React.createElement(Text, {
    caption2: true,
    color: color.textParticipants
  }, truncatedCount(participantsCount, 999)))), /*#__PURE__*/React.createElement(Separator, {
    color: color.separator
  })));
};
const Separator = _ref2 => {
  let {
    color
  } = _ref2;
  return /*#__PURE__*/React.createElement(Box, {
    style: [styles.separator, {
      backgroundColor: color
    }]
  });
};
const styles = createStyleSheet({
  channelCover: {
    width: 32,
    height: 32
  },
  channelInfoTitle: {
    flexShrink: 1
  },
  marginRight: {
    marginRight: 4
  },
  marginLeft: {
    marginLeft: 4
  },
  separator: {
    position: 'absolute',
    left: 0,
    right: -16,
    bottom: 0,
    height: 1
  }
});
export default OpenChannelPreview;
//# sourceMappingURL=index.js.map