import React, { useEffect, useRef } from 'react';
import { Platform, TextInput } from 'react-native';
import { Box, Icon, PressBox, Text, createStyleSheet, useHeaderStyle, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { useLocalization } from '../../../hooks/useContext';
const MessageSearchHeader = _ref => {
  let {
    keyword,
    onChangeKeyword,
    onPressHeaderLeft,
    onPressHeaderRight
  } = _ref;
  const {
    HeaderComponent
  } = useHeaderStyle();
  const {
    colors
  } = useUIKitTheme();
  const {
    STRINGS
  } = useLocalization();
  const inputRef = useRef(null);
  const inputColor = colors.ui.input.default.active;
  const searchEnabled = keyword.length > 0;
  useEffect(() => {
    setTimeout(() => {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
    }, Platform.select({
      ios: 500,
      default: 0
    }));
  }, []);
  return /*#__PURE__*/React.createElement(HeaderComponent, {
    clearTitleMargin: true,
    title: /*#__PURE__*/React.createElement(Box, {
      flex: 1,
      height: 36,
      alignItems: 'center',
      backgroundColor: inputColor.background,
      borderRadius: 24,
      paddingHorizontal: 10,
      flexDirection: 'row'
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 24,
      icon: 'search',
      color: colors.onBackground03,
      containerStyle: styles.searchIcon
    }), /*#__PURE__*/React.createElement(TextInput, {
      disableFullscreenUI: true,
      enablesReturnKeyAutomatically: true,
      ref: inputRef,
      returnKeyType: 'search',
      onSubmitEditing: () => onPressHeaderRight(),
      selectionColor: colors.primary,
      placeholder: STRINGS.MESSAGE_SEARCH.HEADER_INPUT_PLACEHOLDER,
      placeholderTextColor: inputColor.placeholder,
      style: [styles.input, {
        color: inputColor.text
      }],
      value: keyword,
      onChangeText: onChangeKeyword
    }), searchEnabled && /*#__PURE__*/React.createElement(PressBox, {
      onPress: () => onChangeKeyword('')
    }, /*#__PURE__*/React.createElement(Icon, {
      size: 18,
      icon: 'remove',
      color: colors.onBackground03,
      containerStyle: styles.clearIcon
    }))),
    left: /*#__PURE__*/React.createElement(Icon, {
      icon: 'arrow-left'
    }),
    onPressLeft: onPressHeaderLeft,
    right: /*#__PURE__*/React.createElement(Text, {
      button: true,
      color: searchEnabled ? colors.primary : colors.onBackground04
    }, STRINGS.MESSAGE_SEARCH.HEADER_RIGHT),
    onPressRight: searchEnabled ? onPressHeaderRight : undefined
  });
};
const styles = createStyleSheet({
  searchIcon: {
    marginRight: 8
  },
  clearIcon: {
    marginLeft: 8
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 0
  }
});
export default MessageSearchHeader;
//# sourceMappingURL=MessageSearchHeader.js.map