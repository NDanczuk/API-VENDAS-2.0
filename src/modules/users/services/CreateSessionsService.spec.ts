import "reflect-metadata";
import AppError from "@shared/errors/AppError";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import FakeUsersRepository from "../domain/repositories/fakes/FakeUsersRepository";
import CreateSessionService from "./CreateSessionsService";

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionService;
let fakeHashProvider: FakeHashProvider;

describe("CreateSession", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createSession = new CreateSessionService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it("should be able to authenticate", async () => {
    const user = await fakeUsersRepository.create({
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
      password: "prego",
    });

    const response = await createSession.execute({
      email: "JorgPrego@gmail.com",
      password: "prego",
    });

    expect(response).toHaveProperty("token");
    expect(response.user).toEqual(user);
  });

  it("should not be able to authenticate with non existent user", async () => {
    expect(
      createSession.execute({
        email: "prego@gmail.com",
        password: "prego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with wrong password", async () => {
    const user = await fakeUsersRepository.create({
      name: "Jorge Prego",
      email: "JorgPrego@gmail.com",
      password: "prego",
    });
    expect(
      createSession.execute({
        email: "JorgPrego@gmail.com",
        password: "pregoprego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
