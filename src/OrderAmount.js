import { Membership } from "./Membership";

export class OrderAmount {
  #order;
  #present;
  #membership;
  #memebershipDiscount;

  constructor(orderInfos) {
    this.#order = orderInfos.order;
    this.#present = orderInfos.present;
    this.#membership = orderInfos.membership;
  }

  payForOrder() {
    return {
      orderInfo: this.#orderInfo(this.#order),
      presentInfo: this.#orderInfo(this.#present),
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
      if (!orders.includes("pro"))
        memebershipDiscount += order.quantity * order.price;
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
