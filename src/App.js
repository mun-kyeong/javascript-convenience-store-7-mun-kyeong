import { Console } from "@woowacourse/mission-utils";
import { OutputHandler } from "./view/OutputHandler.js";
import { Inventory } from "./repository/Inventory.js";
import { InventoryManager } from "./InventoryManager.js";
import { readDocs } from "./utils/readDocs.js";
import { InputHandler } from "./view/InputHandler.js";
import { Order } from "./Order.js";
import { Promotion } from "./repository/Promotion.js";
import { PromotionManager } from "./PromotionManager.js";
import { getCurrentDate } from "./utils/getCurrentDate.js";
import { OrderAmount } from "./OrderAmount.js";

class App {
  async run() {
    const products = await readDocs("products");
    const inventory = new Inventory(products);
    const inventoryManager = new InventoryManager(inventory);
    const promotions = await readDocs("promotions");
    const promotion = new Promotion(promotions);
    const TODAY = getCurrentDate();
    const promotionManager = new PromotionManager(TODAY, promotion, inventory);

    OutputHandler.storeInfo(inventory);
    const userOrder = await InputHandler.getUserOrder();
    const order = new Order(userOrder, inventoryManager, promotionManager);
    InputHandler.orderQuestion(order, userOrder);
    const orderAmount = new OrderAmount(
      order.exportManagement(),
      inventoryManager
    );
    Outputoandler.printRecceipt(OrderAmount.payForOrder());
  }
}

export default App;
