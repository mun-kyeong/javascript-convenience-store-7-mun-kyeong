import { Console } from "@woowacourse/mission-utils";
import { HELPER_MESSAGE } from "../constant/helperMessage.js";
import { parserOrder } from "../utils/parserOrder.js";
import { getInput } from "./Console.js";

export class InputHandler {
  static async getUserOrder() {
    const userOrder = await getInput(HELPER_MESSAGE.orderMessage);
    return parserOrder(userOrder);
  }

  static async askQuestion(message) {
    const orderQuestion = await getInput(message);
    return orderQuestion;
  }

  static async orderQuestion(order, userOrders) {
    const answers = [];
    answers.push(await this.askAdditionalOrder(order, userOrders));
    return;
  }

  static #hasAdditionalOrder(order, userOrders) {
    let additionalOrder = [];
    userOrders.forEach(([userOrder, quantity]) => {
      const subOrder = order.findAdditionOrder(userOrder, quantity);
      if (subOrder !== undefined) additionalOrder.push(subOrder);
    });
    return additionalOrder;
  }

  static async askAdditionalOrder(order, userOrders) {
    const additionalOrder = this.#hasAdditionalOrder(order, userOrders);
    if (additionalOrder.length === 0) return [];
    const answers = [];

    for (const order of additionalOrder) {
      const answer = await this.askQuestion(
        HELPER_MESSAGE.additionalOrder(order[0], order[1])
      );
      answers.push(answer);
    }

    return answers;
  }
}
