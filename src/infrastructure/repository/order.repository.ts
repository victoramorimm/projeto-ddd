import { Order } from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.calculateTotal(),
        items: entity.items.map((item) => {
          return {
            id: item.id,
            name: item.name,
            price: item.price,
            product_id: item.productId,
            quantity: item.quantity,
            total: item.orderItemTotal(),
          };
        }),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        total: entity.calculateTotal(),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );

    for (const item of entity.items) {
      await OrderItemModel.upsert({
        id: item.id,
        name: item.name,
        price: item.price,
        product_id: item.productId,
        quantity: item.quantity,
        total: item.orderItemTotal(),
        order_id: entity.id,
      });
    }
  }

  async find(id: string): Promise<Order | undefined> {
    const orderModel = await OrderModel.findOne({
      where: { id },
      include: [OrderItemModel],
    });

    if (!orderModel) {
      return undefined;
    }

    const allItems = orderModel.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      );
    });

    return new Order(orderModel.id, orderModel.customer_id, allItems);
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [OrderItemModel],
    });

    const orders: Order[] = [];

    orderModels.map((orderModel) => {
      const orderItem = orderModel.items.map((item) => {
        return new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        );
      });

      orders.push(new Order(orderModel.id, orderModel.customer_id, orderItem));
    });

    return orders;
  }
}
