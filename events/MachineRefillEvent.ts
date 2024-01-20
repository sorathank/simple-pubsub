import IEvent from "./IEvent";

class MachineRefillEvent implements IEvent {
  constructor(
    private readonly _refill: number,
    private readonly _machineId: string
  ) {}

  machineId(): string {
    return this._machineId;
  }

  type(): string {
    return "refill";
  }
}

export default MachineRefillEvent;
