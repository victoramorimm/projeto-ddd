export default class Address {
  _street: string;
  _city: string;
  _state: string;
  _zip: string;
  _number: number;

  constructor(
    street: string,
    city: string,
    state: string,
    zip: string,
    number: number
  ) {
    this._street = street;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this._number = number;
    this.validate();
  }

  validate() {
    if (this._street === "") {
      throw new Error("Street is required");
    }

    if (this._city === "") {
      throw new Error("City is required");
    }

    if (this._state === "") {
      throw new Error("State is required");
    }

    if (this._zip === "") {
      throw new Error("Zip is required");
    }
  }

  get street() {
    return this._street;
  }

  get city() {
    return this._city;
  }

  get state() {
    return this._state;
  }

  get zip() {
    return this._zip;
  }

  get number() {
    return this._number;
  }
}
