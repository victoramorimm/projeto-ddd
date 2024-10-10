import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  constructor(public dataTimeOccurred: Date, public eventData: any) {}
}
