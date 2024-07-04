"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _uikitUtils = require("@sendbird/uikit-utils");
var _Modal = _interopRequireDefault(require("../../components/Modal"));
var _Text = _interopRequireDefault(require("../../components/Text"));
var _createStyleSheet = _interopRequireDefault(require("../../styles/createStyleSheet"));
var _useHeaderStyle = _interopRequireDefault(require("../../styles/useHeaderStyle"));
var _useUIKitTheme = _interopRequireDefault(require("../../theme/useUIKitTheme"));
var _DialogBox = _interopRequireDefault(require("../Dialog/DialogBox"));
var _LoadingSpinner = _interopRequireDefault(require("../LoadingSpinner"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ActionMenu = _ref => {
  let {
    visible,
    onHide,
    onError,
    onDismiss,
    title,
    menuItems
  } = _ref;
  const {
    statusBarTranslucent
  } = (0, _useHeaderStyle.default)();
  const {
    colors
  } = (0, _useUIKitTheme.default)();
  const [pending, setPending] = (0, _react.useState)(false);
  const _onHide = () => {
    if (!pending) onHide();
  };
  return /*#__PURE__*/_react.default.createElement(_Modal.default, {
    onClose: _onHide,
    onDismiss: onDismiss,
    statusBarTranslucent: statusBarTranslucent,
    visible: visible,
    backgroundStyle: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_DialogBox.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.title
  }, /*#__PURE__*/_react.default.createElement(_Text.default, {
    h1: true,
    color: colors.ui.dialog.default.none.text,
    numberOfLines: 1
    // style={{ flex: 1 }}
    ,
    style: {
      maxWidth: pending ? '86%' : '100%'
    }
  }, title), pending && /*#__PURE__*/_react.default.createElement(_LoadingSpinner.default, {
    size: 20,
    color: colors.ui.dialog.default.none.highlight,
    style: {
      width: '10%',
      marginLeft: '4%'
    }
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.buttonContainer
  }, menuItems.map((item, index) => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      activeOpacity: 0.75,
      key: item.title + index,
      style: styles.button,
      disabled: pending,
      onPress: async () => {
        setPending(true);
        try {
          var _item$onPress;
          await ((_item$onPress = item.onPress) === null || _item$onPress === void 0 ? void 0 : _item$onPress.call(item));
        } catch (e) {
          const errorHandler = onError ?? item.onError;
          errorHandler === null || errorHandler === void 0 ? void 0 : errorHandler(e);
          if (!errorHandler) _uikitUtils.Logger.error('ActionMenu onPress error', e);
        } finally {
          onHide();
          setPending(false);
        }
      }
    }, /*#__PURE__*/_react.default.createElement(_Text.default, {
      subtitle2: true,
      color: item.style === 'destructive' ? colors.ui.dialog.default.none.destructive : colors.ui.dialog.default.none.text,
      numberOfLines: 1
    }, item.title));
  }))));
};
const styles = (0, _createStyleSheet.default)({
  title: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center'
  },
  buttonContainer: {
    marginTop: 4,
    marginBottom: 8
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12
  }
});
var _default = ActionMenu;
exports.default = _default;
//# sourceMappingURL=index.js.map