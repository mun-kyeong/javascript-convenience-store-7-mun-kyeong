import { Console } from "@woowacourse/mission-utils";
import { OutputHandler } from "./view/OutputHandler.js";

class App {
  async run() {
    OutputHandler.displayStoreInfo();
  }
}

export default App;
