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
});
