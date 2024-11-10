describe("영수증(Receipt) 클래스 테스트", () => {
  test("물품 구매 시 영수증에 구매한 상품명, 수량, 가격 저장", () => {
    const USER_ORDER = [
      ["콜라", 2],
      ["사이다", 1],
    ];
    const receipt = new Receipt(USER_ORDER);
    expect(receipt.getUserOrder()).toEqual(USER_ORDER);
  });
});
