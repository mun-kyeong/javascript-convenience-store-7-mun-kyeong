import { Console } from "@woowacourse/mission-utils";
import { OutputHandler } from "./view/OutputHandler.js";
import { Inventory } from "./repository/Inventory.js";
import { InventoryManager } from "./InventoryManager.js";
import { readDocs } from "./utils/readDocs.js";

class App {
  async run() {
    const products = await readDocs("products");
    const inventory = new Inventory(products);
    OutputHandler.storeInfo(inventory);
    Console.print("3");
  }
}

export default App;
