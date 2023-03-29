import { UserRepositoryInMemory } from "../../../../../src/modules/users/domain/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../../../src/modules/users/application/use-cases/CreateUserUseCase";
import { LogInUserUseCase } from "../../../../../src/modules/users/application/use-cases/LogInUserUseCase";

describe("Login User by Role", () => {
  let userRepository: UserRepositoryInMemory;
  let loginUser: LogInUserUseCase;
  let createUser: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    loginUser = new LogInUserUseCase(userRepository);
    createUser = new CreateUserUseCase(userRepository);
  });

  it("should login a user and provide a token", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe.client.1@example.com",
      password: "12345678",
    });

    const result = await loginUser.execute({
      email: user.email,
      password: "12345678",
    });

    expect(result.token).toBeDefined();
  });

  // it("shouldn't login a user with invalid credentials", async () => {
  //   const data = {
  //     email: "johndoe.client.1@example.com",
  //     password: "87654321",
  //   };

  //   await expect(loginUser.execute(data)).rejects.toEqual(
  //     new AppError("AuthenticationError", "Invalid credentials.", 401)
  //   );
  // });
});
