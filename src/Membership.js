export class Membership {
  #maxDiscount;

  constructor() {
    this.#maxDiscount = 8000;
  }

  isExceedLiminDiscount(price) {
    return price > this.#maxDiscount;
  }
}
