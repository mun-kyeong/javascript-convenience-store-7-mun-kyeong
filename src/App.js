import { Console } from "@woowacourse/mission-utils";
import { OutputHandler } from "./view/OutputHandler.js";
import { Inventory } from "./repository/Inventory.js";
import { InventoryManager } from "./InventoryManager.js";
import { readDocs } from "./utils/readDocs.js";
import { InputHandler } from "./view/InputHandler.js";
import { Order } from "./Order.js";
import { printOneLine } from "./view/Console.js";

class App {
  async run() {
    const products = await readDocs("products");
    const inventory = new Inventory(products);
    OutputHandler.storeInfo(inventory);
    const userOrder = await InputHandler.getUserOrder();
    const order = new Order(userOrder);
    const orderAnswers = await InputHandler.orderQuestion(order);
  }
}

export default App;
