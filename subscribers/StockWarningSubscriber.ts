import IEvent from "../events/IEvent";
import LowStockWarningEvent from "../events/LowStockWarningEvent";
import StockLevelOkEvent from "../events/StockLevelOkEvent";
import ISubscriber from "./ISubscriber";

class StockWarningSubscriber implements ISubscriber {
  handle(event: IEvent): void {
    if (event instanceof LowStockWarningEvent) {
      console.log(`Warning: Stock low for machine ${event.machineId()}.`);
    } else if (event instanceof StockLevelOkEvent) {
      console.log(`Info: Stock level OK for machine ${event.machineId()}.`);
    }
  }
}

export default StockWarningSubscriber;
