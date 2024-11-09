import { Console } from "@woowacourse/mission-utils";
import { getCurrentDate } from "../src/utils/getCurrentDate";
import { checkMaxDiscountLimit } from "../src/utils/checkMaxDiscountLimit";

describe("기타 독립적인 기능 test ", () => {
  test("오늘 날짜를 가져온다.", () => {
    const today = getCurrentDate();
    expect(today).toEqual("2024-11-10");
  });

  test.each([
    [2_500, false],
    [8_000, false],
    [9_000, true],
  ])("멤버십 최대 한도를 넘는지 판단", (price, result) => {
    expect(checkMaxDiscountLimit(price)).toEqual(result);
  });
});
