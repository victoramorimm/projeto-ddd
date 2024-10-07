import { Product } from "./product";

describe("Product Unit Tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrow("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("1", "", 100)).toThrow("Name is required");
  });

  it("should throw error when price is empty", () => {
    expect(() => new Product("1", "Product 1", 0)).toThrow("Price is required");
  });

  it("should throw error when price is negative", () => {
    expect(() => new Product("1", "Product 1", -100)).toThrow(
      "Price must be greater than 0"
    );
  });

  it("should change name", () => {
    const product = new Product("1", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("1", "Product 1", 100);
    product.changePrice(200);
    expect(product.price).toBe(200);
  });
});
