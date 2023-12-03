type InputTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  type?: string;
};

const InputText: React.FC<InputTextProps> = ({ name, type = "text", label=`Your ${name}`, ...rest }) => {
  return (
    <div className="mb-5">
      <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input type={type} name={name} className="input-text" {...rest} />
    </div>
  );
};

export default InputText;
