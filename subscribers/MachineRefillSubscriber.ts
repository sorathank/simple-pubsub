import IEvent from "../events/IEvent";
import ISubscriber from "./ISubscriber";

class MachineRefillSubscriber implements ISubscriber {
    handle(event: IEvent): void {
        throw new Error("Method not implemented.");
    }
}

export default MachineRefillSubscriber