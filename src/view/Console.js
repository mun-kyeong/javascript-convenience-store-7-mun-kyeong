import { Console } from "@woowacourse/mission-utils";

const getInput = (helperMessage) => {
  return Console.readLineAsync(helperMessage);
};

const printOneLine = (line) => {
  Console.print(line);
};

export { printOneLine, getInput };
