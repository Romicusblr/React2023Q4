"use client";
import { InputRadio, InputText } from "@/components/Input";
import { FormEvent } from "react";
import { setUncontrolledUser } from "@/lib/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { userSchema } from "@/lib/dtos/User";
import { ValidationError } from "yup";

const UncontrolledFormPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const userBefore = useAppSelector((state) => state.user.uncontrolled);
  console.log("🚀 ~ file: page.tsx:12 ~ userBefore:", userBefore);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      const user = await userSchema.validate(data);
      console.log("data", data); // Process the form data
      console.log("user", user); // Process the form data
      dispatch(setUncontrolledUser(user));
    } catch (err) {
      if (err instanceof ValidationError) {
        console.log(err.name);
        console.log(err.errors);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-4">
      <InputText name="name" placeholder="John Doe" defaultValue={userBefore.name} />
      <InputText name="age" placeholder="age" defaultValue={userBefore.age} />
      <InputText name="email" type="email" placeholder="email@example.com" defaultValue={userBefore.email} />
      <InputText name="password" type="password" placeholder="password" />
      <InputText name="password_repeat" type="password" label="Repeat password" placeholder="repeat password" />
      <InputRadio name="gender" values={["Male", "Female"]} defaultValue={userBefore.gender} />
      <InputText name="acceptTOC" type="checkbox" label="Accept T&C" defaultChecked={userBefore.acceptTOC} />
      <InputText name="picture" defaultValue={userBefore.picture} />
      <InputText name="country" defaultValue={userBefore.country} />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledFormPage;
