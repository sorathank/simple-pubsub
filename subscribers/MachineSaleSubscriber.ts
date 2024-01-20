import LowStockWarningEvent from "../events/LowStockWarningEvent";
import MachineSaleEvent from "../events/MachineSaleEvent";
import Machine from "../models/Machine";
import IPublishSubscribeService from "../services/IPublishSubscribeService";
import ISubscriber from "./ISubscriber";

class MachineSaleSubscriber implements ISubscriber {
  constructor(
    private pubSubService: IPublishSubscribeService,
    private machines: Machine[]
  ) {}

  handle(event: MachineSaleEvent): void {
    const machine = this.machines.find((m) => m.id === event.machineId());
    if (machine) {
      machine.stockLevel -= event.getSoldQuantity();
      if (machine.stockLevel < 3) {
        this.pubSubService.publish(new LowStockWarningEvent(machine.id));
      }
    }
  }

}

export default MachineSaleSubscriber;
