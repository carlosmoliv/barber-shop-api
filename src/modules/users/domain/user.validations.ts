import Joi from "joi";
import { User } from "@modules/users/infra/typeorm/entities/User";

export const createUserSchema = Joi.object<User>({
  name: Joi.string().max(30).required().messages({
    "any.required": "Name is a required field.",
  }),
  password: Joi.string()
    .trim()
    .pattern(new RegExp("^[a-zA-Z0-9]{8,30}$"))
    .required(),
  email: Joi.string().email().required(),
});
