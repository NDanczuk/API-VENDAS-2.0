import "reflect-metadata";
import CreateUserService from "../CreateUserService";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../../domain/repositories/fakes/FakeUsersRepository";

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
      password: "prego",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create two users with the same email", async () => {
    await createUser.execute({
      name: "Jorge Prego",
      email: "JorgPrego1@gmail.com",
      password: "prego",
    });

    expect(
      createUser.execute({
        name: "Jorge Prego",
        email: "JorgPrego1@gmail.com",
        password: "prego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
