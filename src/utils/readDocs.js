import { Console } from "@woowacourse/mission-utils";
import fs from "fs/promises";
import { PRODUCTS_FILE } from "../constant/convenience";

export const readDocs = async (fileName) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE(fileName), "utf-8");
    const products = data.split("\n").map((product) => product.split(","));
    return products;
  } catch (e) {
    Console.print(e);
  }
};
