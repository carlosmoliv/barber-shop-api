import { AppError } from "../AppError";

export class EmailAlreadyExistsError extends AppError {
  constructor(message = "The email provided is alread in use") {
    super("EmailAlreadyExistsError", message);
  }
}
