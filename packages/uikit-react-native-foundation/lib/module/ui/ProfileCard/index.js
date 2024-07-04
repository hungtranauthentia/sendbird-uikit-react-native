import React from 'react';
import { View } from 'react-native';
import Divider from '../../components/Divider';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Avatar from '../Avatar';
const ProfileCard = _ref => {
  let {
    uri,
    username,
    bodyLabel,
    body,
    button,
    containerStyle
  } = _ref;
  const {
    colors
  } = useUIKitTheme();
  const color = colors.ui.profileCard.default.none;
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      backgroundColor: color.background
    }, containerStyle]
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.profileContainer
  }, /*#__PURE__*/React.createElement(Avatar, {
    uri: uri,
    size: 80,
    containerStyle: styles.profileAvatar
  }), /*#__PURE__*/React.createElement(Text, {
    h1: true,
    color: color.textUsername,
    numberOfLines: 1
  }, username)), button && /*#__PURE__*/React.createElement(View, {
    style: styles.messageButtonArea
  }, button), /*#__PURE__*/React.createElement(Divider, {
    space: 16
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.profileInfoContainer
  }, /*#__PURE__*/React.createElement(Text, {
    body2: true,
    color: color.textBodyLabel,
    style: styles.profileInfoBodyLabel
  }, bodyLabel), /*#__PURE__*/React.createElement(Text, {
    body3: true,
    numberOfLines: 1,
    color: color.textBody
  }, body)));
};
const styles = createStyleSheet({
  container: {
    paddingTop: 32,
    width: '100%'
  },
  profileContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 24
  },
  profileAvatar: {
    marginBottom: 8
  },
  profileInfoContainer: {
    padding: 16
  },
  profileInfoBodyLabel: {
    marginBottom: 4
  },
  messageButtonArea: {
    marginHorizontal: 24,
    marginBottom: 24
  }
});
export default ProfileCard;
//# sourceMappingURL=index.js.map