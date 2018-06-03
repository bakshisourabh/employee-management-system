export class IAddress {
  public address_line1: string;
  public address_line2: string;
  public city: string;
  public postal_code: string;
}

export class Address implements IAddress {
  public address_line1: string;
  public address_line2: string;
  public city: string;
  public postal_code: string;

  public static parse(source: IAddress): Address {
    const clone: Address = new Address();

    clone.address_line1 = source.address_line1;
    clone.address_line2 = source.address_line2;
    clone.city = source.city;
    clone.postal_code = source.postal_code;

    return clone;
  }

  constructor() {
    this.address_line1 = '';
    this.address_line2 = '';
    this.city = '';
    this.postal_code = '';
  }

  public clone(): Address {
    const clone: Address = Address.parse(this);
    return clone;
  }
}
