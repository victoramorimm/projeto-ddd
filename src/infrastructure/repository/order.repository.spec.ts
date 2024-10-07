import { Sequelize } from "sequelize-typescript";
import CustomerRepository from "./customer.repository";
import CustomerModel from "../db/sequelize/model/customer.model";
import { Customer } from "../../domain/entity/customer";
import Address from "../../domain/entity/adress";
import ProductModel from "../db/sequelize/model/product.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import { Product } from "../../domain/entity/product";
import ProductRepository from "./product.repository";
import OrderItem from "../../domain/entity/order_item";
import { Order } from "../../domain/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zipcode 1",
      5
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 1000);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.calculateTotal(),
      items: [
        {
          id: orderItem.id,
          name: product.name,
          price: product.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
          total: orderItem.orderItemTotal(),
        },
      ],
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zipcode 1",
      5
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 1000);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).toStrictEqual(order);
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zipcode 1",
      5
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 1000);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const newProduct = new Product("2", "Product 2", 2000);
    await productRepository.create(newProduct);

    const newOrderItem = new OrderItem(
      "2",
      newProduct.name,
      newProduct.price,
      newProduct.id,
      3
    );

    order.addItem(newOrderItem);

    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: [OrderItemModel],
    });

    expect(orderModel?.toJSON()).toStrictEqual({
      id: "1",
      customer_id: customer.id,
      total: order.calculateTotal(),
      items: [
        {
          id: orderItem.id,
          name: product.name,
          price: product.price,
          product_id: product.id,
          quantity: orderItem.quantity,
          order_id: order.id,
          total: orderItem.orderItemTotal(),
        },
        {
          id: newOrderItem.id,
          name: newProduct.name,
          price: newProduct.price,
          product_id: newProduct.id,
          quantity: newOrderItem.quantity,
          order_id: order.id,
          total: newOrderItem.orderItemTotal(),
        },
      ],
    });
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address(
      "Street 1",
      "City 1",
      "State 1",
      "Zipcode 1",
      5
    );
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("1", "Product 1", 1000);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("1", customer.id, [orderItem]);

    const orderRepository = new OrderRepository();

    await orderRepository.create(order);

    const orders = await orderRepository.findAll();

    expect(orders).toStrictEqual([order]);
  });
});
