describe("멤버십 클래스 test ", () => {
  let membership;
  beforeEach(async () => {
    const membership = new Membership();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  test.each([
    [2_500, false],
    [8_000, false],
    [9_000, true],
  ])("멤버십 최대 한도를 넘는지 판단", (price, result) => {
    expect(membership.isExceedLiminDiscount(price)).toEqual(result);
  });
});
