import { Product } from "../entity/product";

export default class ProductService {
  static increasePrice(products: Product[], newPricePercentage: number): void {
    products.forEach((product) => {
      product.changePrice(
        product.price + (product.price * newPricePercentage) / 100
      );
    });
  }
}
