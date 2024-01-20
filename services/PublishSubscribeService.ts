import IEvent from "../events/IEvent";
import ISubscriber from "../subscribers/ISubscriber";
import IPublishSubscribeService from "./IPublishSubscribeService";

class PublishSubscribeService implements IPublishSubscribeService {
  private subscribers: Map<string, ISubscriber[]> = new Map();

  subscribe(type: string, handler: ISubscriber): void {
    const handlers = this.subscribers.get(type) || [];
    handlers.push(handler);
    this.subscribers.set(type, handlers);
  }

  unsubscribe(type: string, handler: ISubscriber): void {
    const handlers = this.subscribers.get(type) || [];
    this.subscribers.set(
      type,
      handlers.filter((h) => h !== handler)
    );
  }

  publish(event: IEvent): void {
    const handlers = this.subscribers.get(event.type()) || [];
    handlers.forEach((handler) => handler.handle(event));
    // Handle event queuing and processing logic
  }
}

export default PublishSubscribeService
