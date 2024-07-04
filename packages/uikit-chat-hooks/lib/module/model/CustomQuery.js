export class CustomQuery {
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
//# sourceMappingURL=CustomQuery.js.map