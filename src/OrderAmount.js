import { Console } from "@woowacourse/mission-utils";
import { Membership } from "./Membership.js";

export class OrderAmount {
  #order;
  #present;
  #membership;
  #memebershipDiscount = 0;
  #inventorymanager;

  constructor(orderInfos) {
    this.#order = orderInfos[0].order;
    this.#present = orderInfos[0].present;
    this.#membership = orderInfos[0].membership;
    this.#inventorymanager = orderInfos[1];
  }

  async payForOrder() {
    return {
      orderInfo: this.#orderInfo(this.#order),
      presentInfo: this.#orderPromotionInfo(this.#present),
      totalPayment: this.#totalPayment(this.#order),
      recucePayment: this.#totalPayment(this.#present),
      membershipPayment: this.#getMembershipDiscount(),
      AmountPayment: this.#totalAmount(),
    };
  }

  #getMembershipDiscount() {
    const membership = new Membership();
    return membership.getDiscount(this.#memebershipDiscount);
  }

  #orderInfo(orders) {
    return orders.map((order) => {
      const orderPrice = this.#inventorymanager.getPrice(order[0]);
      this.#memebershipDiscount += order[1] * orderPrice;
      return [order.name, order.quantity, order.price];
    });
  }

  #orderPromotionInfo(orders) {
    return orders.map((order) => {
      const orderPrice = this.#inventorymanager.getPrice(order[0]);
      this.#memebershipDiscount += order[1] * orderPrice;
      return [order.name, order.quantity, order.price];
    });
  }

  #totalPayment(orders) {
    return orders.reduce((acc, cur) => {
      return acc + cur[1] * cur[2];
    }, 0);
  }

  #totalAmount() {
    return (
      this.#totalPayment(this.#order) -
      this.#membership -
      this.#totalPayment(this.#present)
    );
  }
}
