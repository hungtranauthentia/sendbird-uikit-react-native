"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserProfile = exports.useSendbirdChat = exports.useReaction = exports.usePlatformService = exports.useLocalization = void 0;
var _react = require("react");
var _LocalizationCtx = require("../contexts/LocalizationCtx");
var _PlatformServiceCtx = require("../contexts/PlatformServiceCtx");
var _ReactionCtx = require("../contexts/ReactionCtx");
var _SendbirdChatCtx = require("../contexts/SendbirdChatCtx");
var _UserProfileCtx = require("../contexts/UserProfileCtx");
const useLocalization = () => {
  const value = (0, _react.useContext)(_LocalizationCtx.LocalizationContext);
  if (!value) throw new Error('LocalizationContext is not provided');
  return value;
};
exports.useLocalization = useLocalization;
const usePlatformService = () => {
  const value = (0, _react.useContext)(_PlatformServiceCtx.PlatformServiceContext);
  if (!value) throw new Error('PlatformServiceContext is not provided');
  return value;
};
exports.usePlatformService = usePlatformService;
const useSendbirdChat = () => {
  const value = (0, _react.useContext)(_SendbirdChatCtx.SendbirdChatContext);
  if (!value) throw new Error('SendbirdChatContext is not provided');
  return value;
};
exports.useSendbirdChat = useSendbirdChat;
const useUserProfile = () => {
  const value = (0, _react.useContext)(_UserProfileCtx.UserProfileContext);
  if (!value) throw new Error('UserProfileContext is not provided');
  return value;
};
exports.useUserProfile = useUserProfile;
const useReaction = () => {
  const value = (0, _react.useContext)(_ReactionCtx.ReactionContext);
  if (!value) throw new Error('ReactionContext is not provided');
  return value;
};
exports.useReaction = useReaction;
//# sourceMappingURL=useContext.js.map