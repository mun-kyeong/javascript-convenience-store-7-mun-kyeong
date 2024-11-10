import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "../constant/convenience";

export class Inventory {
  #products;

  constructor(products) {
    this.#products = {};
    products.forEach((product) => this.#saveProducts(product));
  }

  //[ using in constructor ] start
  #saveProducts(product) {
    if (this.#isPromotion(product)) {
      this.#products[PROMOTION_PRODUCT(product[0])] = this.#saveValue(product);
      return;
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

  checkOrder(order) {
    return order.every(
      ([product, quantity]) => this.#products[product].quantity >= quantity
    );
  }

  deleteQuantity(order) {
    order.forEach(([product, quantity]) => {
      this.#products[product].quantity -= quantity;
    });
  }

  getProductInfo(index) {
    return this.#products[index];
  }

  isPromotionProduct(product) {
    return this.getProductInfo(PROMOTION_PRODUCT(product)) !== undefined;
  }

  hasQuantity(product, quantity) {
    return this.#products[product].quantity >= quantity;
  }
}
