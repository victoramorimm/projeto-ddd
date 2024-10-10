import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerChangedAddressEvent from "../event/customer/customer-changed-address.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
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

  static create(id: string, name: string, eventDispatcher: EventDispatcher) {
    const customer = new Customer(id, name);
    eventDispatcher.notify(new CustomerCreatedEvent(new Date(), { id, name }));
    return customer;
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

  changeAddress(address: Address, eventDispatcher?: EventDispatcher) {
    this._address = address;
    if (eventDispatcher) {
      eventDispatcher.notify(
        new CustomerChangedAddressEvent(new Date(), { customer: this, address })
      );
    }
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
