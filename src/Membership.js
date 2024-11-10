export class Membership {
  #maxDiscount = 8_000;

  checkDiscountLimit(price) {
    return price > this.#maxDiscount;
  }
}
