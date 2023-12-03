import { boolean, object, string, number, InferType, ref, mixed } from "yup";

export const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer().typeError("Please enter a valid number"),
  email: string().email().required(),
  password: string().required(),
  password_repeat: string().test("passwords-match", "Passwords must match", function (value) {
    return this.parent.password === value;
  }),
  gender: string(),
  acceptTOC: boolean()
    .required()
    .transform(function (value, originalValue) {
      return value === "on";
    }),
  picture: string(),
  country: string(),
});

export type User = InferType<typeof userSchema>;
