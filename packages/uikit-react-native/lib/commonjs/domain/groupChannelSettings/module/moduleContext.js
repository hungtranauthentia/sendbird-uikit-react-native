"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupChannelSettingsContextsProvider = exports.GroupChannelSettingsContexts = void 0;
var _react = _interopRequireWildcard(require("react"));
var _uikitChatHooks = require("@sendbird/uikit-chat-hooks");
var _uikitReactNativeFoundation = require("@sendbird/uikit-react-native-foundation");
var _uikitUtils = require("@sendbird/uikit-utils");
var _ProviderLayout = _interopRequireDefault(require("../../../components/ProviderLayout"));
var _useContext = require("../../../hooks/useContext");
var _SBUError = _interopRequireDefault(require("../../../libs/SBUError"));
var _SBUUtils = _interopRequireDefault(require("../../../libs/SBUUtils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const GroupChannelSettingsContexts = {
  Fragment: /*#__PURE__*/(0, _react.createContext)({
    channel: {},
    headerTitle: '',
    headerRight: '',
    onPressHeaderRight: _uikitUtils.NOOP
  })
};
exports.GroupChannelSettingsContexts = GroupChannelSettingsContexts;
const GroupChannelSettingsContextsProvider = _ref => {
  let {
    children,
    channel
  } = _ref;
  const handlerId = (0, _uikitUtils.useUniqHandlerId)('GroupChannelSettingsContextsProvider');
  const forceUpdate = (0, _uikitUtils.useForceUpdate)();
  const {
    STRINGS
  } = (0, _useContext.useLocalization)();
  const {
    sdk
  } = (0, _useContext.useSendbirdChat)();
  const {
    fileService
  } = (0, _useContext.usePlatformService)();
  const {
    alert
  } = (0, _uikitReactNativeFoundation.useAlert)();
  const onChannelChanged = eventChannel => {
    if ((0, _uikitUtils.isDifferentChannel)(eventChannel, channel)) return;
    forceUpdate();
  };
  (0, _uikitChatHooks.useChannelHandler)(sdk, handlerId, {
    onChannelChanged: onChannelChanged,
    onChannelFrozen: onChannelChanged,
    onChannelUnfrozen: onChannelChanged,
    onUserBanned: onChannelChanged
  });
  const toast = (0, _uikitReactNativeFoundation.useToast)();
  const {
    openSheet
  } = (0, _uikitReactNativeFoundation.useBottomSheet)();
  const {
    openPrompt
  } = (0, _uikitReactNativeFoundation.usePrompt)();
  const {
    openMenu
  } = (0, _uikitReactNativeFoundation.useActionMenu)();
  const updateChannel = (0, _react.useCallback)(async params => {
    await channel.updateChannel(params);
    forceUpdate();
  }, [channel]);
  const changeChannelName = (0, _react.useCallback)(() => {
    openPrompt({
      title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_TITLE,
      submitLabel: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_OK,
      placeholder: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME_PROMPT_PLACEHOLDER,
      defaultValue: channel.name,
      onSubmit: channelName => updateChannel({
        name: channelName
      })
    });
  }, [STRINGS, updateChannel, channel.name]);
  const changeChannelImage = (0, _react.useCallback)(() => {
    openMenu({
      title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_TITLE,
      menuItems: [{
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_CAMERA,
        onPress: async () => {
          const file = await fileService.openCamera({
            mediaType: 'photo',
            onOpenFailure: error => {
              if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
                alert({
                  title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                  message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_CAMERA, STRINGS.LABELS.PERMISSION_APP_NAME),
                  buttons: [{
                    text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                    onPress: () => _SBUUtils.default.openSettings()
                  }]
                });
              } else {
                toast.show(STRINGS.TOAST.OPEN_CAMERA_ERROR, 'error');
              }
            }
          });
          if (!file) return;
          await updateChannel({
            coverImage: file
          });
        }
      }, {
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE_MENU_PHOTO_LIBRARY,
        onPress: async () => {
          const files = await fileService.openMediaLibrary({
            selectionLimit: 1,
            mediaType: 'photo',
            onOpenFailure: error => {
              if (error.code === _SBUError.default.CODE.ERR_PERMISSIONS_DENIED) {
                alert({
                  title: STRINGS.DIALOG.ALERT_PERMISSIONS_TITLE,
                  message: STRINGS.DIALOG.ALERT_PERMISSIONS_MESSAGE(STRINGS.LABELS.PERMISSION_DEVICE_STORAGE, STRINGS.LABELS.PERMISSION_APP_NAME),
                  buttons: [{
                    text: STRINGS.DIALOG.ALERT_PERMISSIONS_OK,
                    onPress: () => _SBUUtils.default.openSettings()
                  }]
                });
              } else {
                toast.show(STRINGS.TOAST.OPEN_PHOTO_LIBRARY_ERROR, 'error');
              }
            }
          });
          if (!files || !files[0]) return;
          await updateChannel({
            coverImage: files[0]
          });
        }
      }]
    });
  }, [STRINGS, updateChannel]);
  const onPressHeaderRight = (0, _react.useCallback)(() => {
    openSheet({
      sheetItems: [{
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_NAME,
        onPress: changeChannelName
      }, {
        title: STRINGS.GROUP_CHANNEL_SETTINGS.DIALOG_CHANGE_IMAGE,
        onPress: changeChannelImage
      }]
    });
  }, [STRINGS, changeChannelImage, changeChannelName]);
  return /*#__PURE__*/_react.default.createElement(_ProviderLayout.default, null, /*#__PURE__*/_react.default.createElement(GroupChannelSettingsContexts.Fragment.Provider, {
    value: {
      channel,
      headerTitle: STRINGS.GROUP_CHANNEL_SETTINGS.HEADER_TITLE,
      headerRight: STRINGS.GROUP_CHANNEL_SETTINGS.HEADER_RIGHT,
      onPressHeaderRight
    }
  }, children));
};
exports.GroupChannelSettingsContextsProvider = GroupChannelSettingsContextsProvider;
//# sourceMappingURL=moduleContext.js.map