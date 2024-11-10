import { Console } from "@woowacourse/mission-utils";
import { getCurrentDate } from "../src/utils/getCurrentDate";
import { parserOrder } from "../src/utils/parserOrder";

describe("기타 독립적인 기능 test ", () => {
  test("오늘 날짜를 가져온다.", () => {
    const today = getCurrentDate();
    expect(today).toEqual("2024-11-11");
  });

  test("문자열 파씽 확인하기", () => {
    const USER_ORDER = "[콜라-2],[사이다-1]";
    const RESULT = [
      ["콜라", 2],
      ["사이다", 1],
    ];
    expect(parserOrder(USER_ORDER)).toEqual(RESULT);
  });
});
