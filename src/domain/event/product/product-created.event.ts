import EventInterface from "../@shared/event.interface";

export default class ProductCreatedEvent implements EventInterface {
  constructor(public dataTimeOccurred: Date, public eventData: any) {}
}
