"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CustomQuery = void 0;
class CustomQuery {
  constructor(params) {
    this.params = params;
  }
  get isLoading() {
    return this.params.isLoading();
  }
  get hasNext() {
    return this.params.hasNext();
  }
  next() {
    return this.params.next();
  }
}
exports.CustomQuery = CustomQuery;
//# sourceMappingURL=CustomQuery.js.map