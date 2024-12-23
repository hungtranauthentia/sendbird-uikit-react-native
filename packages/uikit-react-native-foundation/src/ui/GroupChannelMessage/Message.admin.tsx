import React from 'react';

import type { SendbirdAdminMessage } from '@sendbird/uikit-utils';

import Box from '../../components/Box';
import Text from '../../components/Text';
import createStyleSheet from '../../styles/createStyleSheet';
import useUIKitTheme from '../../theme/useUIKitTheme';
import type { GroupChannelMessageProps } from './index';

const AdminMessage = ({
  renderRegexTextChildren = (msg) => msg.message,
  message,
}: GroupChannelMessageProps<
  SendbirdAdminMessage,
  { renderRegexTextChildren?: (message: SendbirdAdminMessage) => string }
>) => {
  const { colors } = useUIKitTheme();

  return (
    <Box style={styles.container}>
      <Text caption2 color={colors.onBackground02} style={styles.text}>
        {renderRegexTextChildren(message)}
      </Text>
    </Box>
  );
};

const styles = createStyleSheet({
  container: {
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default AdminMessage;
