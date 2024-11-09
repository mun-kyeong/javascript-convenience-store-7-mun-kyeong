export class Promotion {
  #promotions;

  constructor(promotions) {
    this.#promotions = {};
    promotions.forEach((promotion) => this.#savePromotions(promotion));
  }

  #savePromotions(promotion) {
    return (this.#promotions[promotion[0]] = {
      buy: Number(promotion[1]),
      get: Number(promotion[2]),
      start_date: promotion[3],
      end_date: promotion[4],
    });
  }

  getPromotiondiscount(today, promotionName) {
    if (this.#isPromotionPeriod(today, promotionName)) {
      const todayPromotion = this.#promotions[promotionName];
      return [todayPromotion.buy, todayPromotion.get];
    }
    return [-1, -1];
  }

  #isPromotionPeriod(today, promotionName) {
    const promotion = this.#promotions[promotionName];
    return today >= promotion.start_date && today <= promotion.end_date;
  }

  getPromotionInfo(promotionName) {
    return this.#promotions[promotionName];
  }
}
