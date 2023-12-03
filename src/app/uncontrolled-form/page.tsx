"use client";
import { InputRadio, InputText } from "@/components/Input";
import { FormEvent } from "react";

const UncontrolledFormPage: React.FC = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());
    console.log(data); // Process the form data
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto my-4">
      <InputText name="name" placeholder="John Doe" />
      <InputText name="age" placeholder="age" required />
      <InputText name="email" type="email" placeholder="email@example.com" required />
      <InputText name="password" type="password" placeholder="password" required />
      <InputText
        name="password_repeat"
        type="password"
        label="Repeat password"
        placeholder="repeat password"
        required
      />
      <InputRadio name="gender" values={["Male", "Female"]} />
      <InputText name="acceptTOC" type="checkbox" label="Accept T&C" required />
      <InputText name="picture" />
      <InputText name="country" />

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledFormPage;
