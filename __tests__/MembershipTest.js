import { Membership } from "../src/Membership";

describe("멤버십 클래스 테스트", () => {
  test.each([
    [2_500, false],
    [8_000, false],
    [9_000, true],
  ])("멤버십 최대 한도를 넘는지 판단", (price, result) => {
    const membership = new Membership();
    expect(membership.checkDiscountLimit(price)).toEqual(result);
  });

  test.each([
    [30_000, 8_000],
    [20_000, 6000],
    [1_000, 300],
  ])(
    "멤버십 회원은 프로모션 미적용 금액의 30% 할인받는다. 최대한도는 8,000원",
    (price, discount) => {
      const membership = new Membership();
      expect(membership.getDiscount(price)).toEqual(discount);
    }
  );
});
