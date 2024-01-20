import MachineRefillEvent from "../events/MachineRefillEvent";
import ISubscriber from "./ISubscriber";

class MachineRefillSubscriber implements ISubscriber {
    handle(event: MachineSaleEvent): void {
        const machine = this.machines.find(m => m.id === event.machineId());
        if (machine) {
          machine.stockLevel -= event.getSoldQuantity();
          if (machine.stockLevel < 3) {
            this.pubSubService.publish(new LowStockWarningEvent(machine.id));
          }
        }
      }
}

export default MachineRefillSubscriber;
