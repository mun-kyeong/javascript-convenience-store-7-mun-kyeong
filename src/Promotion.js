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

  getPromotionInfo(promotionName) {
    return this.#promotions[promotionName];
  }
}
