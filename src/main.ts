import Address from "./domain/entity/adress";
import { Customer } from "./domain/entity/customer";
import { Order } from "./domain/entity/order";
import OrderItem from "./domain/entity/order_item";

let customer = new Customer("1", "John Doe");
const address = new Address("123", "Main St", "Springfield", "USA", 7);
customer.address = address;
customer.activate();

const item1 = new OrderItem("1", "Laptop", 1000, "1", 1);
const item2 = new OrderItem("2", "Mouse", 20, "2", 2);

const order = new Order("1", customer.id, [item1, item2]);
