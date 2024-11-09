describe("Docs파일 읽어오기", () => {
  test("products.md 파일 읽어오기", () => {
    const products = readProducts();
    expect(products[0]).toEqual({
      "name,price,quantity,promotion": "상품명,가격,수량,프로모션",
    });
  });
});
