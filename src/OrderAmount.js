export class OrderAmount {
  #order;
  #present;
  #membership;

  constructor(orderInfos) {
    this.#order = orderInfos.order;
    this.#present = orderInfos.present;
    this.#membership = orderInfos.membership;
    this.inventoryManager = inventoryManager;
  }

  payForOrder() {
    return {
      orderInfo: this.#orderInfo(this.#order),
      presentInfo: this.#orderInfo(this.#present),
      totalPayment: this.#totalPayment(this.#order),
      recucePayment: this.#totalPayment(this.#present),
      membershipPayment: this.#membership,
      totalPayment:
        this.#totalPayment(this.#order) -
        this.#membership -
        this.#totalPayment(this.#present),
    };
  }

  #orderInfo(orders) {
    return orders.map((order) => {
      return [order.name, order.quantity, order.price];
    });
  }

  #totalPayment(orders) {
    return orders.reduce((acc, cur) => {
      return acc + cur[1] * cur[2];
    }, 0);
  }
}
