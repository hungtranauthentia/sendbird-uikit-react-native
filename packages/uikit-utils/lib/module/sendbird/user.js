export function ifOperator(role, then, or) {
  if (role === 'operator') return then;
  return or;
}
export function getUserUniqId(user) {
  return user.userId;
}
//# sourceMappingURL=user.js.map