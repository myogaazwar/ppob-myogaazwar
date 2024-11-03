import React from 'react';
import Input from './Input';
import LabelIcon from './Label_Icon';

import LabelPassword from './Label_Password';

const InputForm = ({
  id,
  name,
  type,
  placeholder,
  icon,
  iconEye,
  value,
  onChange,
  max,
  min,
}) => {
  return (
    <div className='relative mt-5 text-slate-400'>
      <LabelIcon htmlFor={name}>{icon}</LabelIcon>
      {(id === 'password' || id === 'confirmPassword') && (
        <LabelPassword toggle={iconEye} />
      )}

      <Input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        max={max}
        min={min}
      />
    </div>
  );
};

export default InputForm;
