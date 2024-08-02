import "reflect-metadata";
import UpdateCustomerService from "../UpdateCustomerService";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import AppError from "@shared/errors/AppError";

describe("UpdateCustomer", () => {
  it("should be able to update a customer", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomer = new UpdateCustomerService(fakeCustomersRepository);

    const customer = await updateCustomer.execute({
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "JorgePrego2@gmail.com",
    });

    return customer;
  });

  it("should not be able to update non existent customer", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
    await updateCustomer.execute({
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "JorgePrego2@gmail.com",
    });
    expect(
      updateCustomer.execute({
        id: "Fake id",
        name: "Jorge Prego",
        email: "JorgePrego2@gmail.com",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to have two customers with the same email", async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();

    const updateCustomer = new UpdateCustomerService(fakeCustomersRepository);

    expect(
      updateCustomer.execute({
        id: "c3150c21-425e-456b-bec3-155bf531bf8f",
        name: "Jorge Prego",
        email: "ZezinElmachips@gmail.com",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
