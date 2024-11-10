import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "./repository/Inventory";

export class Receipt {
  #userOrder = {};
  #inventory;

  constructor(orders, inventory) {
    this.#inventory = inventory;
    orders.forEach((order) => {
      this.#userOrder[order[0]] = this.#addOrderPirce(order);
    });
  }

  #addOrderPirce(order) {
    return {
      price: this.#inventory.getProductInfo(order[0]).price,
      quantity: order[1],
    };
  }

  getUserOrder() {
    return this.#userOrder;
  }
}
