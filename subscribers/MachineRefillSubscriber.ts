import MachineRefillEvent from "../events/MachineRefillEvent";
import ISubscriber from "./ISubscriber";

class MachineRefillSubscriber implements ISubscriber {
  handle(event: MachineRefillEvent): void {
    throw new Error("Method not implemented.");
  }
}

export default MachineRefillSubscriber;
