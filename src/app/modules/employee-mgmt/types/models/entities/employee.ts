import { Address, IAddress } from './address';

export class IEmployee {
  public id: number;
  public name: string;
  public phone: string;
  public address: IAddress;
}

export class Employee implements IEmployee {
  public id: number;
  public name: string;
  public phone: string;
  public address: Address;

  public static parse(source: IEmployee): Employee {
    const clone: Employee = new Employee();

    clone.id = source.id;
    clone.name = source.name;
    clone.phone = source.phone;
    clone.address = Address.parse(source.address);

    return clone;
  }

  constructor() {
    this.id = -1;
    this.name = '';
    this.phone = '';
    this.address = new Address();
  }

  public clone(): Employee {
    const clone: Employee = Employee.parse(this);
    return clone;
  }
}
