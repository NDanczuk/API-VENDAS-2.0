import "reflect-metadata";
import FakeCustomersRepository from "@modules/customers/domain/repositories/fakes/FakeCustomersRepository";
import AppError from "@shared/errors/AppError";
import ShowCustomerService from "../ShowCustomerService";
import UpdateCustomerService from "../UpdateCustomerService";

let fakeCustomersRepository: FakeCustomersRepository;
let updateCustomer: UpdateCustomerService;
let showCustomer: ShowCustomerService;

describe("DeleteCustomer", () => {
  beforeEach(() => {
    fakeCustomersRepository = new FakeCustomersRepository();
    updateCustomer = new UpdateCustomerService(fakeCustomersRepository);
    showCustomer = new ShowCustomerService(fakeCustomersRepository);
  });

  it("should be able to delete a customer", async () => {
    await updateCustomer.execute({
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
    });

    expect(
      showCustomer.execute({
        id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      }),
    );
  });

  it("should not be able to delete a non existent customer", async () => {
    await updateCustomer.execute({
      id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
    });

    expect(
      showCustomer.execute({
        id: "Fake id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
