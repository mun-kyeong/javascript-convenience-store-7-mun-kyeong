describe("프로모션 행사 test ", () => {
  let promotion;
  beforeEach(async () => {
    const promotions = await readDocs("promotions");
    promotion = new Promotion(promotions);
  });
  test.each([
    ["탄산2+1", [2, 1, "2024-01-01", "2024-12-31"]],
    ["MD추천상품", [1, 1, "2024-01-01", "2024-12-31"]],
    ["반짝할인", [1, 1, "2024-11-01", "2024-11-30"]],
  ])("프로모션 행사 정보를 저장한다.", (promotionName, promotionValue) => {
    expect(promotion.getPromotionInfo(promotionName)).toEqual(promotionValue);
  });
});
