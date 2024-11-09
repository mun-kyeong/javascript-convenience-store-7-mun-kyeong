import { Console } from "@woowacourse/mission-utils";
import { getCurrentDate } from "../src/utils/getCurrentDate";

describe("기타 독립적인 기능 test ", () => {
  test("오늘 날짜를 가져온다.", () => {
    const today = getCurrentDate();
    expect(today).toEqual("2024-11-10");
  });
});
