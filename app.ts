import Machine from "./models/Machine";
import IPublishSubscribeService from "./services/IPublishSubscribeService";
import PublishSubscribeService from "./services/PublishSubscribeService";
import MachineSaleSubscriber from "./subscribers/MachineSaleSubscriber";
import { eventGenerator } from "./utils/eventGenerator";

// program
(async () => {
  // create 3 machines with a quantity of 10 stock
  const machines: Machine[] = [
    new Machine("001"),
    new Machine("002"),
    new Machine("003"),
  ];
  const pubSubService: IPublishSubscribeService = new PublishSubscribeService()

  // create a machine sale event subscriber. inject the machines (all subscribers should do this)
  const saleSubscriber = new MachineSaleSubscriber(pubSubService, machines);

  // create 5 random events
  const events = [1, 2, 3, 4, 5].map((i) => eventGenerator());

  // publish the events
  events.map(pubSubService.publish);
})();
