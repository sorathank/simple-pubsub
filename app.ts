import Machine from "./models/Machine";
import IPublishSubscribeService from "./services/IPublishSubscribeService";
import PublishSubscribeService from "./services/PublishSubscribeService";
import MachineRefillSubscriber from "./subscribers/MachineRefillSubscriber";
import MachineSaleSubscriber from "./subscribers/MachineSaleSubscriber";
import StockWarningSubscriber from "./subscribers/StockWarningSubscriber";
import { eventGenerator } from "./utils/eventGenerator";


(async () => {
  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001"),
    new Machine("002"),
    new Machine("003"),
  ];
  const pubSubService = new PublishSubscribeService();

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  /**
   *  @Question back to author
   *  What about the StockWarningSubscriber? I'm not sure why do we need to do this for this subscriber krub.😅
   * */
  const saleSubscriber = new MachineSaleSubscriber(pubSubService, machines);
  pubSubService.subscribe("MachineSaleEvent", saleSubscriber);

  const machineRefillSubscriber = new MachineRefillSubscriber(
    pubSubService,
    machines
  );
  pubSubService.subscribe("MachineRefillEvent", machineRefillSubscriber);
  
  const stockWarningSubscriber = new StockWarningSubscriber();
  pubSubService.subscribe("LowStockWarning", stockWarningSubscriber);
  pubSubService.subscribe("StockLevelOk", stockWarningSubscriber);

  // create 5 random events
  const events = [1, 2, 3, 4, 5].map((i) => eventGenerator());

  // publish the events
  events.forEach(event => pubSubService.publish(event));
})();
