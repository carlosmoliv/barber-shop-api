import { ICreateUserDTO } from "../../modules/users/domain/dtos/ICreateUserDTO";

export const createUserFactory = ({
  name = "Test User",
  email = "johndoe.user@example.com",
  password = "123456",
} = {}): ICreateUserDTO => {
  return {
    name,
    email,
    password,
  };
};
