import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomersRepository";
import { ICreateCustomer } from "../domain/models/ICreateCustomer";
import { ICustomer } from "../domain/models/ICostumer";

class CreateCustomerService {
  constructor(private customersRepository: ICustomersRepository) {}

  public async execute({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const emailExists = await this.customersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email adress already used!");
    }

    const customer = await this.customersRepository.create({
      name,
      email,
    });

    return customer;
  }
}

export default CreateCustomerService;
