import { HELPER_MESSAGE } from "../constant/helperMessage.js";
import { getInput } from "./Console.js";

export class InputHandler {
  static async getUserOrder() {
    return await getInput(HELPER_MESSAGE.orderMessage);
  }
}
