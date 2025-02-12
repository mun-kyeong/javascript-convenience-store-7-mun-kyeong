import { Console } from "@woowacourse/mission-utils";
import { Promotion } from "../src/repository/Promotion";
import { readDocs } from "../src/utils/readDocs";

describe("프로모션 행사 test ", () => {
  let promotion;
  beforeEach(async () => {
    const promotions = await readDocs("promotions");
    promotion = new Promotion(promotions);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    [
      "탄산2+1",
      { buy: 2, get: 1, start_date: "2024-01-01", end_date: "2024-12-31" },
    ],
    [
      "MD추천상품",
      { buy: 1, get: 1, start_date: "2024-01-01", end_date: "2024-12-31" },
    ],
    [
      "반짝할인",
      { buy: 1, get: 1, start_date: "2024-11-01", end_date: "2024-11-30" },
    ],
  ])("프로모션 행사 정보를 저장한다.", (promotionName, promotionValue) => {
    expect(promotion.getPromotionInfo(promotionName)).toEqual(promotionValue);
  });

  test.each([
    ["탄산2+1", [2, 1]],
    ["MD추천상품", [1, 1]],
    ["반짝할인", [-1, -1]],
  ])(
    "오늘 날짜가 %s 행사 기간에 포함되면 프로모션 정보를 가져온다.",
    (promotions, result) => {
      const TODAY = "2024-10-01";
      expect(promotion.getPromotiondiscount(TODAY, promotions)).toEqual(result);
    }
  );
});
