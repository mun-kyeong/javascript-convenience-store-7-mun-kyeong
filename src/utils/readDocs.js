import { Console } from "@woowacourse/mission-utils";
import fs from "fs/promises";
import { PRODUCTS_FILE } from "../constant/convenience";

async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products = data.split("\n").map((product) => product.split(","));
    return products;
  } catch (e) {
    Console.print(e);
  }
}

export { readProducts };
