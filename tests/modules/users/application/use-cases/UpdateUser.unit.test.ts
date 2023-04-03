import { createUserFactory } from "../../../../../src/shared/factories/createCourseFactory";
import { IUserRepository } from "../../../../../src/modules/users/domain/repositories/IUserRepository";
import { UserRepositoryInMemory } from "../../../../../src/modules/users/domain/repositories/in-memory/UserRepositoryInMemory";
import { UpdateUserUseCase } from "../../../../../src/modules/users/application/use-cases/UpdateUserUseCase";
import { CreateUserUseCase } from "../../../../../src/modules/users/application/use-cases/CreateUserUseCase";

describe("Update User", () => {
  let userRepository: IUserRepository;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    updateUserUseCase = new UpdateUserUseCase(userRepository);
  });

  it("should update the user name", async () => {
    const generateUser = createUserFactory();
    const createdUser = await createUserUseCase.execute(generateUser);

    const updateUserData = {
      userId: createdUser.id,
      name: "User name Updated",
      email: createdUser.email,
    };

    const result = await updateUserUseCase.execute(updateUserData);

    expect(result.name).toBe(updateUserData.name);
  });

  it("should update the user email", async () => {
    const generateUser = createUserFactory();

    const createdUser = await createUserUseCase.execute(generateUser);

    const updateUserData = {
      userId: createdUser.id,
      name: createdUser.name,
      email: "johndoe.user.update@example.com",
    };

    const result = await updateUserUseCase.execute(updateUserData);

    expect(result.email).toBe(updateUserData.email);
  });

  it("should throw an error if the email already exists", async () => {
    const generateUser1 = createUserFactory();
    const generateUser2 = createUserFactory({
      email: "johndoe.user.2@example.com",
    });

    const createdUser1 = await createUserUseCase.execute(generateUser1);
    const createdUser2 = await createUserUseCase.execute(generateUser2);

    const updateUserData = {
      userId: createdUser2.id,
      name: createdUser2.name,
      email: createdUser1.email,
    };

    expect(updateUserUseCase.execute(updateUserData)).rejects.toThrowError();
  });
});
