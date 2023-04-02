import { UserRepositoryInMemory } from "../../../../../src/modules/users/domain/repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../../../../../src/modules/users/application/use-cases/CreateUserUseCase";
import { sequelizeInstance } from "../../../../../src/shared/infra/database/sequelize";

describe("Create User", () => {
  let userRepositoryInMemory: UserRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    return sequelizeInstance().sync();
  });

  afterAll(async () => {
    await sequelizeInstance().close();
  });

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
