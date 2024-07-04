function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// @ts-nocheck
import { UserOnlineState } from '@sendbird/chat';
import { createTestContext } from '../utils/createTestContext';
const tc = createTestContext();
export const createMockUser = params => {
  return new MockUser(params);
};
class MockUser {
  constructor(params) {
    this.params = params;
    _defineProperty(this, "userId", 'user_id_' + tc.getHash());
    _defineProperty(this, "requireAuth", true);
    _defineProperty(this, "nickname", 'nickname_' + tc.getHash());
    _defineProperty(this, "plainProfileUrl", 'profile_url_' + tc.getHash());
    _defineProperty(this, "metaData", {});
    _defineProperty(this, "connectionStatus", UserOnlineState.OFFLINE);
    _defineProperty(this, "isActive", false);
    _defineProperty(this, "lastSeenAt", tc.date + tc.increment);
    _defineProperty(this, "preferredLanguages", []);
    _defineProperty(this, "friendDiscoveryKey", tc.getHash());
    _defineProperty(this, "friendName", 'friend_name_' + tc.getHash());
    tc.increaseIncrement();
    Object.assign(this, params);
  }
  get profileUrl() {
    throw new Error('Method not implemented.');
  }
  serialize() {
    throw new Error('Method not implemented.');
  }
  createMetaData() {
    throw new Error('Method not implemented.');
  }
  updateMetaData() {
    throw new Error('Method not implemented.');
  }
  deleteMetaData() {
    throw new Error('Method not implemented.');
  }
  deleteAllMetaData() {
    throw new Error('Method not implemented.');
  }
  asParticipant() {
    return this;
  }
  asMember() {
    return this;
  }
  asAdminMessage() {
    return this;
  }
  asSender() {
    return this;
  }
}
//# sourceMappingURL=createMockUser.js.map