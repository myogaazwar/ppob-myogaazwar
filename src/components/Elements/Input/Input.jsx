const Input = ({
  id,
  name,
  type,
  placeholder,
  value,
  onChange,
  min,
  max,
  disabled,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      min={min}
      maxLength={max}
      disabled={disabled}
      className={`${
        disabled && 'bg-white'
      } w-full px-2 pl-8 h-10 border rounded-md outline-none  focus:border-red-600 placeholder:text-sm text-sm text-slate-500 `}
    />
  );
};

export default Input;
