import { v4 as uuidv4 } from "uuid";
import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "@modules/customers/domain/models/ICreateCustomer";
import { ICustomer } from "@modules/customers/domain/models/ICustomer";

class FakeCustomersRepository implements ICustomersRepository {
  private customers: Customer[] = [
    {
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "JorgePrego1@gmail.com",
      created_at: new Date(2024),
      updated_at: new Date(2024),
    },
    {
      id: "57f6ceca-d73f-497b-926b-b4d48f2f6e34",
      name: "Zezin Elmachip",
      email: "ZezinElmachips@gmail.com",
      created_at: new Date(2024),
      updated_at: new Date(2024),
    },
  ];

  public async create({ name, email }: ICreateCustomer): Promise<Customer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: Customer): Promise<Customer> {
    const findIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[findIndex] = customer;

    return customer;
  }

  public async remove(customer: Customer): Promise<void> {}

  public async findAll(): Promise<ICustomer[] | undefined> {
    return undefined;
  }

  public async findByName(name: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<Customer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
