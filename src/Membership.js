export class Membership {
  #maxDiscount = 8_000;

  checkDiscountLimit(price) {
    return price > this.#maxDiscount;
  }

  getDiscount(price) {
    const discount = price * 0.3;
    if (discount > this.#maxDiscount) {
      return this.#maxDiscount;
    }
    return discount;
  }
}
