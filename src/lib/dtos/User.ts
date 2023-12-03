import { boolean, object, string, number, InferType } from "yup";

export const userSchema = object({
  name: string().required(),
  age: number().required().positive().integer().typeError("Please enter a valid number"),
  email: string().email().required(),
  password: string().required(),
  password_repeat: string().test("passwords-match", "Passwords must match", function (value) {
    return this.parent.password === value;
  }),
  gender: string().required("You should choose gender"),
  acceptTOC: boolean()
    .required()
    .isTrue("You should confirm T&C")
    .transform(function (value, originalValue) {
      return value === "on" || value === true;
    }),
  picture: string(),
  country: string(),
});

export type User = InferType<typeof userSchema>;
