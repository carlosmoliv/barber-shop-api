import { UserRepositoryInMemory } from "../../domain/repositories/in-memory/UserRepositoryInMemory";
import { UserRole } from "../../domain/user.enums";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User by Role", () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should create a user admin if role admin is provided", async () => {
    const data = {
      email: "johndoe.admin.1@example.com",
      name: "John Doe Admin",
      password: "12345678",
    };

    const user = await createUserUseCase.execute(data, UserRole.admin);

    expect(user.role).toEqual(UserRole.admin);
  });
});
