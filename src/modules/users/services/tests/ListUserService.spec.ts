import "reflect-metadata";
import CreateUserService from "../CreateUserService";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../../domain/repositories/fakes/FakeUsersRepository";
import ListUserService from "../ListUserService";

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;
let listUser: ListUserService;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    listUser = new ListUserService(fakeUsersRepository);
  });

  it("should be able to list users", async () => {
    await createUser.execute({
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
      password: "prego",
    });

    expect(listUser.execute());
  });
});
