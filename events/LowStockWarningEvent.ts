import IEvent from "./IEvent";

class LowStockWarningEvent implements IEvent {
  private readonly _machineId: string;

  constructor(machineId: string) {
    this._machineId = machineId;
  }

  type(): string {
    return "LowStockWarning";
  }

  machineId(): string {
    return this._machineId;
  }
}

export default LowStockWarningEvent;
