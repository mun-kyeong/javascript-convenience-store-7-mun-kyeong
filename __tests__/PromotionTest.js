describe("재고 관리 기능 테스트", () => {
  test("프로모션 정보(promotions.md)를 가져온다", () => {
    const promotions = readPromotions();
    expect(promotions).toEqual([
      ["name", "buy", "get", "start_date", "end_date"],
      ["탄산2+1", 2, 1, "2024-01-01", "2024-12-31"],
      ["MD추천상품", 1, 1, "2024-01-01", "2024-12-31"],
      ["반짝할인", 1, 1, "2024-11-01", "2024-11-30"],
    ]);
  });
});
