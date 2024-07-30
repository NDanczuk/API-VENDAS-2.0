import { ICustomer } from "../models/ICostumer";
import { ICreateCustomer } from "../models/ICreateCustomer";

export interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>;

  findById(id: string): Promise<ICustomer | undefined>;

  findByEmail(email: string): Promise<ICustomer | undefined>;

  create(data: ICreateCustomer): Promise<ICustomer>;

  save(customer: ICustomer): Promise<ICustomer>;
}
