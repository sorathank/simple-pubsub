import IEvent from "../events/IEvent";
import ISubscriber from "../subscribers/ISubscriber";

interface IPublishSubscribeService {
  publish(event: IEvent): void;
  subscribe(type: string, subscriber: ISubscriber): void;
  unsubscribe(type: string, subscriber: ISubscriber): void;
}

export default IPublishSubscribeService;
