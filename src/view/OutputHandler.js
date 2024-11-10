import { WELCOME_MESSAGE } from "../constant/helperMessage.js";
import { printOneLine } from "./Console.js";

export class OutputHandler {
  static displayStoreInfo() {
    printOneLine(WELCOME_MESSAGE);
  }
}
