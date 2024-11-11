import { Console } from "@woowacourse/mission-utils";
import { HELPER_MESSAGE } from "../constant/helperMessage.js";
import { printOneLine } from "./Console.js";

export class OutputHandler {
  static async storeInfo(inventory) {
    printOneLine(HELPER_MESSAGE.welcomMessage);
    Object.keys(inventory.getProduct()).forEach((product, index) => {
      const productInfo = inventory.getProductInfo(product);
      if (index === 0 || productInfo.promotion === undefined) return;
      this.printOrderInfo(productInfo);
    });
  }

  static formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static formatQuantity(quantity) {
    if (quantity === 0) return "재고 없음";
    return quantity;
  }

  static printOrderInfo(productInfo) {
    const removeProWord = productInfo.name.replace("pro", "");
    const nullPromotion = productInfo.promotion.replace("null", "");
    const nullQuentity = this.formatQuantity(productInfo.quantity);
    const speratedPrice = this.formatPrice(productInfo.price);
    printOneLine(
      `- ${removeProWord} ${speratedPrice} ${nullQuentity}개 ${nullPromotion}`
    );
  }

  static printRecceipt() {}
}
