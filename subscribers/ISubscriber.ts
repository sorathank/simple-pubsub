import IEvent from "../events/IEvent";

interface ISubscriber {
    handle(event: IEvent): void;
}

export default ISubscriber