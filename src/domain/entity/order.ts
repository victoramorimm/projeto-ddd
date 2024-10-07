import OrderItem from "./order_item";

export class Order {
  _id: string;
  _customerId: string;
  _items: OrderItem[] = [];
  _total: number = 0;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.calculateTotal();
    this.validate();
  }

  calculateTotal() {
    return this._items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
  }

  validate() {
    if (this._customerId === "") {
      throw new Error("Customer ID is required");
    }

    if (this._id === "") {
      throw new Error("ID is required");
    }

    if (this._items.length === 0) {
      throw new Error("Items are required");
    }

    for (let item of this._items) {
      if (item.quantity <= 0) {
        throw new Error("Quantity must be greater than 0");
      }
    }
  }

  addItem(item: OrderItem) {
    this._items.push(item);
    this._total = this.calculateTotal();
  }

  get total() {
    return this._total;
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._customerId;
  }

  get items() {
    return this._items;
  }
}
