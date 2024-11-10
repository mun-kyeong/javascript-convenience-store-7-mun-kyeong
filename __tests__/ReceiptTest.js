import { Console } from "@woowacourse/mission-utils";
import { Receipt } from "../src/Receipt";
import { Inventory } from "../src/repository/Inventory";
import { readDocs } from "../src/utils/readDocs";

describe("영수증(Receipt) 클래스 테스트", () => {
  let inventory;
  beforeEach(async () => {
    const products = await readDocs("products");
    inventory = new Inventory(products);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test("물품 구매 시 영수증에 구매한 상품명, 수량, 가격 저장", () => {
    const USER_ORDER = [
      ["콜라", 2],
      ["사이다", 1],
    ];
    const USER_ORDER_INFO = {
      콜라: { quantity: 2, price: 1000 },
      사이다: { quantity: 1, price: 1000 },
    };
    const receipt = new Receipt(USER_ORDER, inventory);
    expect(receipt.getUserOrder()).toEqual(USER_ORDER_INFO);
  });
});
