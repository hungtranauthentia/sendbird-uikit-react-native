import React from 'react';
import { View } from 'react-native';
import { Icon, Image, Text, createStyleSheet, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { truncatedCount } from '@sendbird/uikit-utils';
const ReactionRoundedButton = _ref => {
  let {
    url,
    count,
    reacted,
    style
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.reaction.rounded;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.reactionContainer, {
      backgroundColor: reacted ? color.selected.background : color.enabled.background
    }, style]
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: url
    },
    style: styles.emoji
  }), /*#__PURE__*/React.createElement(Text, {
    caption4: true,
    color: colors.onBackground01,
    numberOfLines: 1,
    style: styles.count
  }, truncatedCount(count, 99, '')));
};
ReactionRoundedButton.More = _ref2 => {
  let {
    pressed
  } = _ref2;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.reaction.rounded;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.reactionContainer, {
      backgroundColor: pressed ? color.selected.background : color.enabled.background
    }]
  }, /*#__PURE__*/React.createElement(Icon, {
    icon: 'emoji-more',
    color: colors.onBackground03,
    size: 20
  }));
};
const styles = createStyleSheet({
  reactionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 52,
    borderRadius: 24,
    paddingVertical: 5,
    paddingHorizontal: 8
  },
  emoji: {
    width: 20,
    height: 20,
    marginRight: 4
  },
  count: {
    width: 13,
    textAlign: 'left'
  }
});
export default ReactionRoundedButton;
//# sourceMappingURL=ReactionRoundedButton.js.map