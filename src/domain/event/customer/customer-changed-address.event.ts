import EventInterface from "../@shared/event.interface";

export default class CustomerChangedAddressEvent implements EventInterface {
  constructor(public dataTimeOccurred: Date, public eventData: any) {}
}
