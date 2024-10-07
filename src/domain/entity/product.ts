export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
  }

  validate() {
    if (!this._id) {
      throw new Error("ID is required");
    }

    if (!this._name) {
      throw new Error("Name is required");
    }

    if (!this._price) {
      throw new Error("Price is required");
    }

    if (this._price < 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  changePrice(price: number) {
    this._price = price;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }
}
