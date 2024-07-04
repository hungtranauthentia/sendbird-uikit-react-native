import React from 'react';
import { View } from 'react-native';
import { conditionChaining } from '@sendbird/uikit-utils';
import Icon from '../../components/Icon';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import Button from '../Button';
import LoadingSpinner from '../LoadingSpinner';
const Placeholder = _ref => {
  let {
    icon,
    loading = false,
    message = '',
    errorRetryLabel,
    onPressRetry
  } = _ref;
  const {
    colors
  } = useUIKitTheme();

  // loading ? styles.containerLoading : errorRetryLabel ? styles.containerError : styles.container
  return /*#__PURE__*/React.createElement(View, {
    style: conditionChaining([loading, errorRetryLabel], [styles.containerLoading, styles.containerError, styles.container])
  }, conditionChaining([loading], [/*#__PURE__*/React.createElement(LoadingSpinner, {
    size: 64,
    color: colors.ui.placeholder.default.none.highlight
  }), /*#__PURE__*/React.createElement(Icon, {
    icon: icon,
    size: 64,
    color: colors.ui.placeholder.default.none.content
  })]), Boolean(message) && !loading && /*#__PURE__*/React.createElement(Text, {
    body3: true,
    color: colors.ui.placeholder.default.none.content
  }, message), Boolean(errorRetryLabel) && !loading && /*#__PURE__*/React.createElement(Button, {
    variant: 'text',
    onPress: onPressRetry,
    contentColor: colors.ui.placeholder.default.none.highlight,
    icon: 'refresh'
  }, errorRetryLabel));
};
const styles = createStyleSheet({
  container: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerError: {
    width: 200,
    height: 148,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  containerLoading: {
    width: 200,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default Placeholder;
//# sourceMappingURL=index.js.map