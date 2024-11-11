import { Console } from "@woowacourse/mission-utils";
import { PROMOTION_PRODUCT } from "./constant/convenience.js";
import { Membership } from "./Membership.js";

export class Order {
  #orderInventory = []; // 사용자가 주문한 상품명, 수량, 가격 저장
  #presentInventory = []; // 프로모션에 의해 제공된 상품명, 수량, 가격 저장
  #membershipDiscount = 0;
  #inventoryManager;
  #promotionManager;

  constructor(orders, inventoryManager, promotionManager) {
    this.#inventoryManager = inventoryManager;
    this.#promotionManager = promotionManager;
    this.#orderInventory = orders;
  }

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

  findAdditionOrder(order, orderQuantity) {
    const todayPromotion = this.#getTodayPromotion();
    if (this.isNonPromotionOrder(order, todayPromotion)) return;
    const { paidQuantity, quantity } = todayPromotion[order];
    if (
      (orderQuantity - paidQuantity) % (paidQuantity + quantity) === 0 &&
      this.#inventoryManager.getOrderQuantity(order) >= orderQuantity + quantity
    ) {
      return [order, quantity];
    }
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

  overPromotionOrder(order, orderQuantity) {
    const todayPromotion = this.#getTodayPromotion();
    if (this.isNonPromotionOrder(order, todayPromotion))
      return [0, orderQuantity];
    const { paidQuantity, quantity } = todayPromotion[order];
    const inventoryQuantity = this.#inventoryManager.getOrderQuantity(order);
    let reaminQuantity = 0;
    if (orderQuantity > inventoryQuantity) {
      reaminQuantity += inventoryQuantity - quantity;
      orderQuantity -= inventoryQuantity;
    }
    const maxQuantity =
      Math.floor(orderQuantity / (paidQuantity + quantity)) *
      (paidQuantity + quantity);
    return [maxQuantity, reaminQuantity + orderQuantity - maxQuantity]; //[4+6]
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
    this.#orderInventory.forEach((order) => {
      this.#membershipDiscount += this.#calculatePrice(order);
    });

    const membership = new Membership();
    this.#membershipDiscount = membership.getDiscount(this.#membershipDiscount);
  }

  #calculatePrice(order) {
    const nonPromotionOrder = this.nonPromotionOrder(order[0], order[1]);
    return (
      this.#inventoryManager.getPrice(nonPromotionOrder[0]) *
      nonPromotionOrder[1]
    );
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
