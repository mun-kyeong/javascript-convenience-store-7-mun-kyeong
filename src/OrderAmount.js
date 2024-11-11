export class OrderAmount {
  #order;
  #present;
  #membership;
  #inventoryManager;

  constructor(orderInfos, inventoryManager) {
    this.#order = orderInfos.order;
    this.#present = orderInfos.present;
    this.#membership = orderInfos.membership;
    this.inventoryManager = inventoryManager;
  }

  payForOrder() {
    return {
      orderPayment: this.#orderPayment(this.#order),
      presentPayment: this.#orderPayment(this.#present),
      totalPayment: this.#totalPayment(this.#order),
    };
  }

  #orderPayment(orders) {
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
