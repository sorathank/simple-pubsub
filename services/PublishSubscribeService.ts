import IEvent from "../events/IEvent";
import ISubscriber from "../subscribers/ISubscriber";
import IPublishSubscribeService from "./IPublishSubscribeService";

class PublishSubscribeService implements IPublishSubscribeService {
  private subscribers: Map<string, ISubscriber[]> = new Map();
  private eventQueue: IEvent[] = [];
  private processingQueue: boolean = false;

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
    this.eventQueue.push(event);
    if (!this.processingQueue) {
      this.processEvents();
    }
  }

  private processEvents(): void {
    this.processingQueue = true;
    while (this.eventQueue.length > 0) {
      const event = this.eventQueue.shift();
      if (event) {
        const handlers = this.subscribers.get(event.type()) || [];
        handlers.forEach(handler => handler.handle(event));
      }
    }
    this.processingQueue = false;
  }
  
}

export default PublishSubscribeService
