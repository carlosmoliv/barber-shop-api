import { createUserFactory } from "../../../../../src/shared/factories/createCourseFactory";
import { IUserRepository } from "../../../../../src/modules/users/domain/repositories/IUserRepository";
import { UserRepositoryInMemory } from "../../../../../src/modules/users/domain/repositories/in-memory/UserRepositoryInMemory";
import { UpdateUserUseCase } from "../../../../../src/modules/users/application/use-cases/UpdateUserUseCase";

describe("Update User", () => {
  let updateUserUseCase: UpdateUserUseCase;
  let userRepository: IUserRepository;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });

  it("should update the user name", async () => {
    const generateUser = createUserFactory();
    const createdUser = await userRepository.create(generateUser);

    const updateUserData = {
      userId: createdUser.id,
      name: "User name Updated",
      email: "johndoe.user@example.com",
    };

    const result = await updateUserUseCase.execute(updateUserData);

    expect(result.name).toBe(updateUserData.name);
  });
});
