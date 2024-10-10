import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain Events Tests", () => {
  it("should register an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product.created", eventHandler);

    expect(eventDispatcher.getEventHandlers["product.created"]).toBeDefined();
    expect(eventDispatcher.getEventHandlers["product.created"].length).toBe(1);
    expect(eventDispatcher.getEventHandlers["product.created"][0]).toBe(
      eventHandler
    );
  });

  it("should unregister an event handler", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product.created", eventHandler);

    expect(eventDispatcher.getEventHandlers["product.created"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregister("product.created", eventHandler);

    expect(eventDispatcher.getEventHandlers["product.created"].length).toBe(0);
  });

  it("should unregister all event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("product.created", eventHandler);

    expect(eventDispatcher.getEventHandlers["product.created"][0]).toBe(
      eventHandler
    );

    eventDispatcher.unregisterAll();

    expect(eventDispatcher.getEventHandlers).toEqual({});
  });

  it("should notify all event handlers", async () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    const productCreatedEvent = new ProductCreatedEvent(new Date(), {
      productId: 1,
      name: "Product 1",
      price: 100,
    });

    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
