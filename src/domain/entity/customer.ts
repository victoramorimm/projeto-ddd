import Address from "./adress";

export class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._name === "") {
      throw new Error("Name is required");
    }

    if (this._id === "") {
      throw new Error("ID is required");
    }
  }

  changeName(name: string) {
    this._name = name;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is required");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  set address(address: Address) {
    this._address = address;
  }

  get name() {
    return this._name;
  }

  get isActive() {
    return this._active;
  }

  get id() {
    return this._id;
  }

  get address() {
    return this._address;
  }

  get state() {
    return this._address.state;
  }
}
