import { Product } from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
  it("should change the price of all products", () => {
    // Arrange
    const products = [
      new Product("1", "Product 1", 100),
      new Product("2", "Product 2", 200),
    ];
    const newPricePercentage = 10;

    // Act
    ProductService.increasePrice(products, newPricePercentage);

    // Assert
    expect(products[0].price).toBe(110);
    expect(products[1].price).toBe(220);
  });
});
