import "reflect-metadata";
import FakeUsersRepository from "@modules/users/domain/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import UpdateProfileService from "../UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;

describe("Show profile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(fakeUsersRepository);
  });

  it("should be able to update an user", async () => {
    const user = await updateProfile.execute({
      user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "Prego@gmail.com",
      password: "Prego12345",
      old_password: "prego",
    });

    return user;
  });

  it("should not be able to find the user by id", async () => {
    await updateProfile.execute({
      user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "Prego@gmail.com",
      password: "prego",
      old_password: "prego",
    });

    expect(
      updateProfile.execute({
        user_id: "Fake id",
        name: "Jorge Prego",
        email: "Prego@gmail.com",
        password: "prego",
        old_password: "prego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to updade the email to one in use", () => {
    expect(
      updateProfile.execute({
        user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
        name: "Jorge Prego",
        email: "Zezo@gmail.com",
        password: "prego",
        old_password: "prego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not allow the user to update without inserting the old password", () => {
    expect(
      updateProfile.execute({
        user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
        name: "Jorge Prego",
        email: "Prego@gmail.com",
        password: "prego",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not allow the user to update with the wrong old password", async () => {
    await expect(
      updateProfile.execute({
        user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
        name: "Jorge Prego",
        email: "Prego@gmail.com",
        password: "prego",
        old_password: "Wrong password",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
