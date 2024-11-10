import { Console } from "@woowacourse/mission-utils";
import { Inventory } from "./repository/Inventory";
import { PROMOTION_PRODUCT } from "./constant/convenience";

export class Order {
  #orderInventory = []; // 사용자가 주문한 상품명, 수량, 가격 저장
  #presentInventory = []; // 프로모션에 의해 제공된 상품명, 수량, 가격 저장
  #membershipDiscount;
  #inventoryManager;
  #promotionManager;

  constructor(orders, inventoryManager, promotionManager) {
    this.#inventoryManager = inventoryManager;
    this.#promotionManager = promotionManager;
    this.#orderInventory = orders;
  }

  // #addOrderPirce(order) {
  //   // Console.print(this.#orderInventory.getPirce);
  //   return {
  //     price: this.#inventoryManager.getPrice(order[0]),
  //     quantity: order[1],
  //   };
  // }

  getOrderInventory() {
    return this.#orderInventory;
  }

  getPresentInventory() {
    return this.#presentInventory;
  }

  // 프로모션 추가 여부 판단
  addPromotionItem(userAnswer, order) {
    if (userAnswer === "N") return;
    const todayPromotion = this.#getTodayPromotion();
    this.#presentInventory.push([order, todayPromotion[order].quantity]);
    this.#inventoryManager.deletePromotion(
      [[order, todayPromotion[order].quantity]],
      todayPromotion
    );
  }

  //프로모션 비혜택 물품 구매 여부 판단
  payForFullPrice(userAnswer, order, quantity) {
    const todayPromotion = this.#getTodayPromotion();
    if (userAnswer === "N") {
      this.#patOnlyPromotion(order, quantity, todayPromotion);
      return;
    }
    this.#payFullPrice(order, todayPromotion);
  }

  #patOnlyPromotion(order, quantity, todayPromotion) {
    const existOrder = this.#findExistOrder(order);
    this.#inventoryManager.deletePromotion(
      [[order, existOrder[1] - quantity]],
      todayPromotion
    );
    if (existOrder) existOrder[1] -= quantity;
  }

  #payFullPrice(order, todayPromotion) {
    const deleteQuantity = this.#findExistOrder(order)[1];
    this.#inventoryManager.deletePromotion(
      [[order, deleteQuantity]],
      todayPromotion
    );
  }

  #findExistOrder(orderName) {
    return this.#orderInventory.find((item) => item[0] === orderName);
  }

  #getTodayPromotion() {
    return this.#promotionManager.getTodayPromotion(this.#orderInventory);
  }

  //멤버십 할인 적용 여부 판단
  applyMembershipDiscount(userAnswer) {
    if (userAnswer === "N") return;
  }

  nonPromotionOrder(order, quantity) {
    const todayPromotion = this.#getTodayPromotion();

    if (this.isNonPromotionOrder(order, todayPromotion))
      return [order, quantity];
    if (this.isGreaterThanOrder(order, quantity))
      return [order, orderQuantity - quantity];

    const promotionGab = this.#getPromotionGab(order, todayPromotion);
    return [order, quantity % promotionGab];
  }

  promotionOrder(order, quantity) {
    const todayPromotion = this.#getTodayPromotion();
    if (
      this.isNonPromotionOrder(order, todayPromotion) ||
      this.isGreaterThanOrder(order, quantity)
    )
      return [];
    const promotionGab = this.#getPromotionGab(order, todayPromotion);
    return [order, Math.floor(quantity / promotionGab) * promotionGab];
  }

  isNonPromotionOrder(order, todayPromotion) {
    return (
      todayPromotion[order] === undefined ||
      todayPromotion[order].paidQuantity === -1
    );
  }

  isGreaterThanOrder(order, quantity) {
    const orderQuantity = this.#inventoryManager.getOrderQuantity(
      PROMOTION_PRODUCT(order)
    );
    return orderQuantity < quantity;
  }

  getMembershipDiscount() {
    return this.#membershipDiscount;
  }

  #getPromotionGab(order, todayPromotion) {
    return todayPromotion[order].paidQuantity + todayPromotion[order].quantity;
  }
}
