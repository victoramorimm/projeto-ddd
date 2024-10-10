import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../../customer-created.event";

export class EnviaConsoleLog1Handler implements EventHandlerInterface {
  constructor() {}

  handle(event: CustomerCreatedEvent): void {
    const { customer, address } = event.eventData;
    console.log(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado para: ${JSON.stringify(address)}`
    );
  }
}
