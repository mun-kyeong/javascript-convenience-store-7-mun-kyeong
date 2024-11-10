import { Console } from "@woowacourse/mission-utils";
import { OutputHandler } from "./view/OutputHandler.js";
import { Inventory } from "./repository/Inventory.js";
import { InventoryManager } from "./InventoryManager.js";
import { readDocs } from "./utils/readDocs.js";
import { InputHandler } from "./view/InputHandler.js";

class App {
  async run() {
    const products = await readDocs("products");
    const inventory = new Inventory(products);
    OutputHandler.storeInfo(inventory);
    const userOrder = await InputHandler.getUserOrder();
    Console.print(userOrder);
  }
}

export default App;
