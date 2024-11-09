import React from 'react';
import Input from './Input';
import LabelIcon from './Label_Icon';

import LabelPassword from './Label_Password';

const InputForm = ({
  id,
  name,
  type,
  label,
  placeholder,
  icon,
  iconEye,
  value,
  onChange,
  max,
  min,
  disabled,
}) => {
  return (
    <div
      className={`${
        label && 'flex flex-col gap-y-2'
      }  relative mt-5 text-slate-400`}
    >
      <LabelIcon htmlFor={name}>{icon}</LabelIcon>
      {(id === 'password' || id === 'confirmPassword') && (
        <LabelPassword toggle={iconEye} />
      )}

      {label && <label htmlFor={name}>{label}</label>}
      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
        disabled={disabled}
      />
    </div>
  );
};

export default InputForm;
