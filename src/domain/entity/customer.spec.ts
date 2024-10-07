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
});
