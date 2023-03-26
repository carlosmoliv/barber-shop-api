import { AppError } from "../../../../shared/errors/AppError";
import { UserRepositoryInMemory } from "../../domain/repositories/in-memory/UserRepositoryInMemory";
import { Role } from "../../domain/user.enums";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { LogInUserUseCase } from "./LogInUserUseCase";

describe("Login User by Role", () => {
  let userRepository: UserRepositoryInMemory;
  let loginUserByRole: LogInUserUseCase;
  let createUserByRole: CreateUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    loginUserByRole = new LogInUserUseCase(userRepository);
    createUserByRole = new CreateUserUseCase(userRepository);
  });

  it("should login a user admin and provide a token", async () => {
    const user = await createUserByRole.execute(
      {
        name: "John Doe",
        email: "johndoe.admin.1@example.com",
        password: "12345678",
      },
      Role.admin
    );

    const result = await loginUserByRole.execute(
      {
        email: user.email,
        password: "12345678",
      },
      Role.admin
    );

    expect(result.token).toBeDefined();
  });

  it("shouldn't login a user with invalid credentials", async () => {
    const data = {
      email: "johndoe.admin.1@example.com",
      password: "87654321",
    };

    await expect(loginUserByRole.execute(data, Role.admin)).rejects.toEqual(
      new AppError("AuthenticationError", "Invalid credentials.", 401)
    );
  });
});
