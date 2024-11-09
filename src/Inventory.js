import { Console } from "@woowacourse/mission-utils";

export class Inventory {
  #products;

  constructor(products) {
    this.#products = {};
    products.forEach((product) => this.#saveProducts(product));
    Console.print(this.#products);
  }

  #saveProducts(product) {
    if (this.#isPromotion(product)) {
      this.#products[`${product[0]}pro`] = this.#save(product);
    }
    this.#products[product[0]] = this.#save(product);
  }

  #isPromotion(product) {
    return product[3] !== "null";
  }

  #save(product) {
    return {
      name: product[0],
      price: Number(product[1]),
      quantity: Number(product[2]),
      promotion: product[3],
    };
  }

  getProductInfo(index) {
    return this.#products[index];
  }
}
