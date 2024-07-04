function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck
import { ChannelType } from '@sendbird/chat';
import { MessageType, SendingStatus } from '@sendbird/chat/message';
import { createTestContext } from '../utils/createTestContext';
export const createMockMessage = params => {
  return new MockMessage(params);
};
const tc = createTestContext();
class MockMessage {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "channelType", ChannelType.BASE);
    _defineProperty(this, "channelUrl", 'channel_url_' + tc.getHash());
    _defineProperty(this, "createdAt", tc.date + tc.increment);
    _defineProperty(this, "updatedAt", 0);
    _defineProperty(this, "messageId", tc.getRandom());
    _defineProperty(this, "messageType", MessageType.BASE);
    _defineProperty(this, "parentMessageId", 0);
    _defineProperty(this, "parentMessage", null);
    _defineProperty(this, "silent", false);
    _defineProperty(this, "isOperatorMessage", false);
    _defineProperty(this, "data", '');
    _defineProperty(this, "customType", '');
    _defineProperty(this, "mentionType", null);
    _defineProperty(this, "mentionedUsers", null);
    _defineProperty(this, "mentionedUserIds", null);
    _defineProperty(this, "mentionedMessageTemplate", '');
    _defineProperty(this, "threadInfo", null);
    _defineProperty(this, "reactions", []);
    _defineProperty(this, "metaArrays", []);
    _defineProperty(this, "ogMetaData", null);
    _defineProperty(this, "appleCriticalAlertOptions", null);
    _defineProperty(this, "scheduledInfo", null);
    _defineProperty(this, "extendedMessage", {});
    _defineProperty(this, "notificationData", null);
    _defineProperty(this, "forms", null);
    _defineProperty(this, "myFeedback", null);
    _defineProperty(this, "myFeedbackStatus", 'NO_FEEDBACK');
    _defineProperty(this, "suggestedReplies", null);
    tc.increaseIncrement();
    this.__updateIdsBySendingStatus(params);
    Object.assign(this, params);
  }
  __updateIdsBySendingStatus(params) {
    if (!params.sendingStatus) return;
    const self = this.asSendableMessage();
    self.reqId = String(Date.now()) + tc.increment;
    const unsent = [SendingStatus.PENDING, SendingStatus.FAILED, SendingStatus.CANCELED].some(it => params.sendingStatus === it);
    if (unsent) {
      self.messageId = 0;
    } else {
      self.messageId = tc.getRandom();
    }
  }
  isFileMessage() {
    return this.messageType === MessageType.FILE && !Object.prototype.hasOwnProperty.call(this, 'fileInfoList');
  }
  isMultipleFilesMessage() {
    return this.messageType === MessageType.FILE && Object.prototype.hasOwnProperty.call(this, 'fileInfoList');
  }
  isUserMessage() {
    return this.messageType === MessageType.USER;
  }
  isAdminMessage() {
    return this.messageType === MessageType.ADMIN;
  }
  applyParentMessage() {
    return false;
  }
  applyReactionEvent() {
    return;
  }
  applyThreadInfoUpdateEvent() {
    return false;
  }
  getMetaArraysByKeys() {
    return [];
  }
  isEqual() {
    return false;
  }
  isIdentical() {
    return false;
  }
  serialize() {
    return Object.assign({}, this);
  }
  deleteFeedback(_) {
    return Promise.resolve(undefined);
  }
  hasForm() {
    return this.forms !== null;
  }
  submitFeedback(_) {
    return Promise.resolve(undefined);
  }
  submitForm(_) {
    return Promise.resolve(undefined);
  }
  updateFeedback(_) {
    return Promise.resolve(undefined);
  }
  markThreadAsRead() {
    return Promise.resolve();
  }
  setPushNotificationEnabled(_) {
    return Promise.resolve();
  }
  asFileMessage() {
    return this;
  }
  asUserMessage() {
    return this;
  }
  asAdminMessage() {
    return this;
  }
  asSendableMessage() {
    return this;
  }
  asBaseMessage() {
    return this;
  }
}
//# sourceMappingURL=createMockMessage.js.map