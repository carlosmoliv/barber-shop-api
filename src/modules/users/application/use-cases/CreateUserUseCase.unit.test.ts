import { UserRepositoryInMemory } from "../../domain/repositories/in-memory/UserRepositoryInMemory";
import { UserRole } from "../../domain/user.enums";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create User", () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it("should create a user with the data provided", async () => {
    const data = {
      email: "johndoe.client.1@example.com",
      name: "John Doe Client",
      password: "12345678",
    };

    const user = await createUserUseCase.execute(data);
    expect(user.email).toEqual(data.email);
    expect(user.name).toEqual(data.name);
  });
});
