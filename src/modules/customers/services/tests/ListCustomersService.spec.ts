import "reflect-metadata";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import ListCustomerService from "../ListCustomerService";
import CreateCustomerService from "../CreateCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let createCustomer: CreateCustomerService;
let listCustomers: ListCustomerService;

describe("DeleteCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    createCustomer = new CreateCustomerService(fakeCustomersRepository);
    listCustomers = new ListCustomerService(fakeCustomersRepository);
  });

  it("should be able to list customers", async () => {
    await createCustomer.execute({
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
    });

    expect(listCustomers.execute());
  });
});
