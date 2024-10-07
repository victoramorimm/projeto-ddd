import { Order } from "./order";
import OrderItem from "./order_item";

describe("Order", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "1", [])).toThrow("ID is required");
  });

  it("should throw error when customer id is empty", () => {
    expect(() => new Order("1", "", [])).toThrow("Customer ID is required");
  });

  it("should throw error when items are empty", () => {
    expect(() => new Order("1", "1", [])).toThrow("Items are required");
  });

  it("should calculate total", () => {
    const orderItem1 = new OrderItem("1", "order1", 10, "1", 2);

    const order = new Order("1", "1", [orderItem1]);

    expect(order.total).toBe(20);

    const orderItem2 = new OrderItem("2", "order2", 20, "2", 1);

    order.addItem(orderItem2);

    expect(order.total).toBe(40);
  });

  it("should check if the item quantity is greater than 0", () => {
    const orderItem1 = new OrderItem("1", "order1", 10, "1", 0);

    expect(() => new Order("1", "1", [orderItem1])).toThrow(
      "Quantity must be greater than 0"
    );
  });
});
