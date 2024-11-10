export class Receipt {
  #order;

  constructor(order) {
    this.#order = order;
  }

  getUserOrder() {
    return this.#order;
  }
}
