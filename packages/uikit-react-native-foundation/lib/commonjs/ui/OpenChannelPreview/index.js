"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _uikitUtils = require("@sendbird/uikit-utils");
var _Box = _interopRequireDefault(require("../../components/Box"));
var _Icon = _interopRequireDefault(require("../../components/Icon"));
var _Image = _interopRequireDefault(require("../../components/Image"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
  } = (0, _useUIKitTheme.default)();
  const color = colors.ui.openChannelPreview.default.none;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    backgroundColor: color.background,
    width: '100%',
    height: 62,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    width: styles.channelCover.width,
    height: styles.channelCover.height,
    borderRadius: styles.channelCover.width,
    overflow: 'hidden',
    marginRight: 16
  }, (0, _uikitUtils.conditionChaining)([Boolean(customCover)], [customCover, /*#__PURE__*/_react.default.createElement(_Image.default, {
    resizeMode: 'cover',
    style: [styles.channelCover, {
      backgroundColor: color.coverBackground
    }],
    source: {
      uri: coverUrl
    }
  })])), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flex: 1,
    height: '100%',
    justifyContent: 'center'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    flexShrink: 1,
    marginBottom: 4,
    alignItems: 'center'
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    subtitle1: true,
    style: styles.channelInfoTitle,
    numberOfLines: 1,
    color: color.textTitle
  }, title), frozen && /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 16,
    icon: 'freeze',
    color: color.frozenIcon,
    containerStyle: styles.marginLeft
  })), /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }, /*#__PURE__*/_react.default.createElement(_Box.default, {
    flexDirection: 'row',
    alignItems: 'center'
  }, /*#__PURE__*/_react.default.createElement(_Icon.default, {
    size: 16,
    icon: 'members',
    color: color.participantsIcon,
    containerStyle: styles.marginRight
  }), /*#__PURE__*/_react.default.createElement(_Text.default, {
    caption2: true,
    color: color.textParticipants
  }, (0, _uikitUtils.truncatedCount)(participantsCount, 999)))), /*#__PURE__*/_react.default.createElement(Separator, {
    color: color.separator
  })));
};
const Separator = _ref2 => {
  let {
    color
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_Box.default, {
    style: [styles.separator, {
      backgroundColor: color
    }]
  });
};
const styles = (0, _createStyleSheet.default)({
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
var _default = OpenChannelPreview;
exports.default = _default;
//# sourceMappingURL=index.js.map