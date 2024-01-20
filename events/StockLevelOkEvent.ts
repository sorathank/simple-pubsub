import IEvent from "./IEvent";

class StockLevelOkEvent implements IEvent {
  private readonly _machineId: string;

  constructor(machineId: string) {
    this._machineId = machineId;
  }

  type(): string {
    return 'StockLevelOk';
  }

  machineId(): string {
    return this._machineId;
  }
}

export default StockLevelOkEvent
