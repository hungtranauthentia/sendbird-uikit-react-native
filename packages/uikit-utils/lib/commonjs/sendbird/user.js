"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserUniqId = getUserUniqId;
exports.ifOperator = ifOperator;
function ifOperator(role, then, or) {
  if (role === 'operator') return then;
  return or;
}
function getUserUniqId(user) {
  return user.userId;
}
//# sourceMappingURL=user.js.map