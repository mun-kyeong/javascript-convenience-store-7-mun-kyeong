import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "./repository/Inventory";

export class Order {
  #orderInventory = {}; // 사용자가 주문한 상품명, 수량, 가격 저장
  #presentInventory = {}; // 프로모션에 의해 제공된 상품명, 수량, 가격 저장
  #inventory; //inventory 객체 다룸

  constructor(orders, inventory) {
    this.#inventory = inventory;
    orders.forEach((order) => {
      this.#orderInventory[order[0]] = this.#addOrderPirce(order);
    });
  }

  #addOrderPirce(order) {
    return {
      price: this.#inventory.getProductInfo(order[0]).price,
      quantity: order[1],
    };
  }

  getOrderInventory() {
    return this.#orderInventory;
  }
}
