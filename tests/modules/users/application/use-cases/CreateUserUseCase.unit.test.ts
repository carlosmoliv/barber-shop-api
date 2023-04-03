import { UserRepositoryInMemory } from "@modules/users/domain/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "@modules/users/application/use-cases/CreateUserUseCase";

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
