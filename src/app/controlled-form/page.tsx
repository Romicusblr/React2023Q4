"use client";
import { InputRadio, InputText } from "@/components/Input";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { User, userSchema } from "@/lib/dtos/User";
import { setControlledUser } from "@/lib/userSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";

const ControlledFormPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userBefore = useAppSelector((state) => state.user.controlled);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    defaultValues: userBefore
  });
  const onSubmit: SubmitHandler<User> = (data) => {
    dispatch(setControlledUser(data));
    router.push("/");
  };
  console.log("🚀 ~ file: page.tsx:19 ~ errors:", errors);

  const ErrorText: React.FC<{ prop: keyof User }> = ({ prop }) => {
    return <span className="align-top text-xs text-red-500 ml-1">{errors[prop]?.message}</span>;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto my-4">
      <div className="mb-5">
        <label htmlFor="name" className=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your name
          <ErrorText prop="name" />
        </label>
        <input {...register("name")} type="text" className="input-text" />
      </div>
      <div className="mb-5">
        <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your age
          <ErrorText prop="age" />
        </label>
        <input {...register("age")} type="text" className="input-text" />
      </div>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your email
          <ErrorText prop="email" />
        </label>
        <input {...register("email")} type="email" className="input-text" />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your password
          <ErrorText prop="password" />
        </label>
        <input {...register("password")} type="password" className="input-text" />
      </div>
      <div className="mb-5">
        <label htmlFor="password_repeat" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Repeat password
          <ErrorText prop="password_repeat" />
        </label>
        <input {...register("password_repeat")} type="password" className="input-text" />
      </div>
      <div className="mb-5">
        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Your gender
          <ErrorText prop="gender" />
        </h3>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                value="Male"
                {...register("gender")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="horizontal-list-radio-license"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Male
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center ps-3">
              <input
                type="radio"
                value="Female"
                {...register("gender")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              />
              <label
                htmlFor="horizontal-list-radio-license"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Female
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-5">
        <label htmlFor="acceptTOC" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Accept T&C
          <ErrorText prop="acceptTOC" />
        </label>
        <input {...register("acceptTOC")} type="checkbox" className="input-text" />
      </div>
      {/* <InputText name="picture" defaultValue={userBefore.picture} />
      <InputText name="country" defaultValue={userBefore.country} /> */}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default ControlledFormPage;
