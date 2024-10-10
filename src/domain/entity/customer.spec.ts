import EventDispatcher from "../event/@shared/event-dispatcher";
import { EnviaConsoleLog1Handler as CustomerChangedAddressHandler } from "../event/customer/handler/customer-changed-address/first-log-when-customer-is-created.handler";
import { EnviaConsoleLog2Handler as CustomerCreatedHandler2 } from "../event/customer/handler/customer-created/second-log-when-customer-is-created.handler";
import { EnviaConsoleLog1Handler as CustomerCreatedHandler } from "../event/customer/handler/customer-created/first-log-when-customer-is-created.handler";
import Address from "./adress";
import { Customer } from "./customer";

describe("Customer", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Customer("", "John Doe")).toThrow("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Customer("1", "")).toThrow("Name is required");
  });

  it("should change name", () => {
    const customer = new Customer("1", "John Doe");
    customer.changeName("Jane Doe");
    expect(customer.name).toBe("Jane Doe");
  });

  it("should activate", () => {
    const customer = new Customer("1", "John Doe");
    customer.address = new Address("123", "Main St", "Springfield", "12345", 7);
    customer.activate();
    expect(customer.isActive).toBe(true);
  });

  it("should deactivate", () => {
    const customer = new Customer("1", "John Doe");
    customer.deactivate();
    expect(customer.isActive).toBe(false);
  });

  it("should throw error when activating without address", () => {
    const customer = new Customer("1", "John Doe");
    expect(() => customer.activate()).toThrow("Address is required");
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "John Doe");
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(5);
    expect(customer.rewardPoints).toBe(15);
  });

  it("should create a new customer", () => {
    const eventDispatcher = new EventDispatcher();
    const customer = Customer.create("1", "John Doe", eventDispatcher);
    expect(customer.id).toBe("1");
    expect(customer.name).toBe("John Doe");
  });

  it("should call CustomerCreatedEvent handlers when customer is created", () => {
    const eventDispatcher = new EventDispatcher();
    const firstHandler = new CustomerCreatedHandler();
    const secondHandler = new CustomerCreatedHandler2();

    const spyFirstHandler = jest.spyOn(firstHandler, "handle");
    const spySecondHandler = jest.spyOn(secondHandler, "handle");

    eventDispatcher.register("CustomerCreatedEvent", firstHandler);
    eventDispatcher.register("CustomerCreatedEvent", secondHandler);

    Customer.create("1", "John Doe", eventDispatcher);

    expect(spyFirstHandler).toHaveBeenCalled();
    expect(spySecondHandler).toHaveBeenCalled();
  });

  it("should change address", () => {
    const eventDispatcher = new EventDispatcher();
    const customer = Customer.create("1", "John Doe", eventDispatcher);
    const address = new Address("street", "city", "state", "zip", 7);

    customer.changeAddress(address, eventDispatcher);

    expect(customer.address).toBe(address);
  });

  it("should call CustomerCreatedEvent handlers when customer address is changed", () => {
    const eventDispatcher = new EventDispatcher();
    const handler = new CustomerChangedAddressHandler();

    const spyHandler = jest.spyOn(handler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", handler);

    const customer = Customer.create("1", "John Doe", eventDispatcher);
    const address = new Address("street", "city", "state", "zip", 7);

    customer.changeAddress(address, eventDispatcher);

    expect(spyHandler).toHaveBeenCalled();
  });
});
