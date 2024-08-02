import "reflect-metadata";
import FakeUsersRepository from "@modules/users/domain/repositories/fakes/FakeUsersRepository";
import AppError from "@shared/errors/AppError";
import ShowProfileService from "../ShowProfileService";
import UpdateProfileService from "../UpdateProfileService";

let fakeUsersRepository: FakeUsersRepository;
let updateProfile: UpdateProfileService;
let showProfile: ShowProfileService;

describe("Show profile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateProfile = new UpdateProfileService(fakeUsersRepository);
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it("should be able to show an user", async () => {
    await updateProfile.execute({
      user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "Prego@gmail.com",
    });

    expect(
      showProfile.execute({
        user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      }),
    );
  });

  it("should not be able to show a non existent user", async () => {
    await updateProfile.execute({
      user_id: "c3150c21-425e-456b-bec3-155bf531bf8f",
      name: "Jorge Prego",
      email: "Prego@gmail.com",
    });

    expect(
      showProfile.execute({
        user_id: "Fake id",
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
