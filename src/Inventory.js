import { Console } from "@woowacourse/mission-utils";

export class Inventory {
  #products;

  constructor(products) {
    this.#products = {};
    products.forEach((product) => this.#saveProducts(product));
  }

  //[ using in constructor ] start
  #saveProducts(product) {
    if (this.#isPromotion(product)) {
      this.#products[`${product[0]}pro`] = this.#saveValue(product);
    }
    this.#products[product[0]] = this.#saveValue(product);
  }

  #isPromotion(product) {
    return product[3] !== "null";
  }

  #saveValue(product) {
    return {
      name: product[0],
      price: Number(product[1]),
      quantity: Number(product[2]),
      promotion: product[3],
    };
  }
  //[ using in constructor ] end

  getProductInfo(index) {
    return this.#products[index];
  }
}
