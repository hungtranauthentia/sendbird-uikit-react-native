"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _useContext = require("../../../hooks/useContext");
var _moduleContext = require("../module/moduleContext");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const TYPES = ['GROUP', 'SUPER_GROUP', 'BROADCAST'];
const TYPE_ICONS = {
  'GROUP': 'chat',
  'SUPER_GROUP': 'supergroup',
  'BROADCAST': 'broadcast'
};
const STATUS_BAR_TOP_INSET_AS = _reactNative.Platform.select({
  android: 'margin',
  default: 'padding'
});
const GroupChannelListTypeSelector = _ref => {
  let {
    skipTypeSelection,
    onSelectType
  } = _ref;
  const {
    statusBarTranslucent,
    HeaderComponent
  } = (0, _uikitReactNativeFoundation.useHeaderStyle)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  const {
    sbOptions
  } = (0, _useContext.useSendbirdChat)();
  const typeSelector = (0, _react.useContext)(_moduleContext.GroupChannelListContexts.TypeSelector);
  const {
    visible,
    hide
  } = typeSelector;
  const createOnPressType = type => () => {
    hide();
    onSelectType(type);
  };
  (0, _react.useEffect)(() => {
    if (skipTypeSelection && visible) createOnPressType('GROUP')();
  }, [skipTypeSelection, visible]);
  if (skipTypeSelection) return null;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Modal, {
    visible: visible,
    onClose: hide,
    statusBarTranslucent: statusBarTranslucent
  }, /*#__PURE__*/_react.default.createElement(HeaderComponent, {
    title: typeSelector.headerTitle,
    right: /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
      icon: 'close',
      color: colors.onBackground01
    }),
    onPressRight: typeSelector.hide,
    statusBarTopInsetAs: STATUS_BAR_TOP_INSET_AS
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonArea
  }, TYPES.map(type => {
    if (type === 'SUPER_GROUP' && !sbOptions.appInfo.superGroupChannelEnabled) {
      return null;
    }
    if (type === 'BROADCAST' && !sbOptions.appInfo.broadcastChannelEnabled) {
      return null;
    }
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      key: type,
      activeOpacity: 0.6,
      onPress: createOnPressType(type),
      style: styles.typeButton
    }, /*#__PURE__*/_react.default.createElement(DefaultTypeIcon, {
      type: type
    }), /*#__PURE__*/_react.default.createElement(DefaultTypeText, {
      type: type
    }));
  }))));
};
const DefaultTypeIcon = _ref2 => {
  let {
    type
  } = _ref2;
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Icon, {
    size: 24,
    icon: TYPE_ICONS[type],
    containerStyle: styles.icon
  });
};
const DefaultTypeText = _ref3 => {
  let {
    type
  } = _ref3;
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    colors
  } = (0, _uikitReactNativeFoundation.useUIKitTheme)();
  return /*#__PURE__*/_react.default.createElement(_uikitReactNativeFoundation.Text, {
    caption2: true,
    color: colors.onBackground01
  }, STRINGS.GROUP_CHANNEL_LIST[`TYPE_SELECTOR_${type}`]);
};
const styles = (0, _uikitReactNativeFoundation.createStyleSheet)({
  buttonArea: {
    flexDirection: 'row'
  },
  typeButton: {
    paddingVertical: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    marginBottom: 8
  }
});
var _default = GroupChannelListTypeSelector;
exports.default = _default;
//# sourceMappingURL=GroupChannelListTypeSelector.js.map