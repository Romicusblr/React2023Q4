type InputRadioProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  values: string[];
  label?: string;
};

type InputRadioValueProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  value: string;
};

const RadioValue: React.FC<InputRadioValueProps> = ({ name, value, ...rest }) => {
  return (
    <div className="flex items-center ps-3">
      <input
        type="radio"
        value={value}
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      <label
        htmlFor="horizontal-list-radio-license"
        className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {value}
      </label>
    </div>
  );
};

const InputRadio: React.FC<InputRadioProps> = ({ name, values, label = `Your ${name}` }) => {
  return (
    <div className="mb-5">
      <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</h3>
      <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        {values?.map((v) => {
          return (
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <RadioValue name={name} value={v} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default InputRadio;
