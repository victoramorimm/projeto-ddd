import EventHandlerInterface from "../../@shared/event-handler.interface";
import ProductCreatedEvent from "../product-created.event";

export default class SendEmailWhenProductIsCreatedHandler
  implements EventHandlerInterface
{
  constructor() {}

  handle(event: ProductCreatedEvent): void {
    console.log(
      `Sending email to the user that the product ${event.eventData.name} has been created`
    );
  }
}
