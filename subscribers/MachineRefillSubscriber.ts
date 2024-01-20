import MachineRefillEvent from "../events/MachineRefillEvent";
import StockLevelOkEvent from "../events/StockLevelOkEvent";
import Machine from "../models/Machine";
import IPublishSubscribeService from "../services/IPublishSubscribeService";
import ISubscriber from "./ISubscriber";

class MachineRefillSubscriber implements ISubscriber {
  constructor(
    private pubSubService: IPublishSubscribeService,
    private machines: Machine[]
  ) {}

  handle(event: MachineRefillEvent): void {
    const machine = this.machines.find((m) => m.id === event.machineId());
    if (machine) {
      machine.stockLevel += event.getRefilledQuantity();
      if (
        machine.stockLevel - event.getRefilledQuantity() < 3 &&
        machine.stockLevel >= 3
      ) {
        this.pubSubService.publish(new StockLevelOkEvent(machine.id));
      }
    }
  }
}

export default MachineRefillSubscriber;
