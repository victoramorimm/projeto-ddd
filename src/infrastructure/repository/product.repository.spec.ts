import { Sequelize } from "sequelize-typescript";
import ProductModel from "../db/sequelize/model/product.model";
import { Product } from "../../domain/entity/product";
import { UUIDV4 } from "sequelize";
import { randomUUID } from "crypto";
import ProductRepository from "./product.repository";

describe("Product Repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();

    const productEntity = new Product(randomUUID(), "Product 1", 100);

    await productRepository.create(productEntity);

    const productModel = await ProductModel.findOne({
      where: { id: productEntity.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();

    const productEntity = new Product(randomUUID(), "Product 1", 100);

    await productRepository.create(productEntity);

    productEntity.changeName("Product 2");
    productEntity.changePrice(200);

    await productRepository.update(productEntity);

    const productModel = await ProductModel.findOne({
      where: { id: productEntity.id },
    });

    expect(productModel?.toJSON()).toStrictEqual({
      id: productEntity.id,
      name: productEntity.name,
      price: productEntity.price,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();

    const productEntity = new Product(randomUUID(), "Product 1", 100);

    await productRepository.create(productEntity);

    const foundProduct = await productRepository.find(productEntity.id);

    expect(foundProduct).toStrictEqual(productEntity);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();

    const productEntity1 = new Product(randomUUID(), "Product 1", 100);
    const productEntity2 = new Product(randomUUID(), "Product 2", 200);

    await productRepository.create(productEntity1);
    await productRepository.create(productEntity2);

    const foundProducts = await productRepository.findAll();

    expect(foundProducts).toStrictEqual([productEntity1, productEntity2]);
  });
});
