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

  //   static async orderQuestion(order) {
  //     if(order.)
  //     return orderQuestion;
  //   }
}
