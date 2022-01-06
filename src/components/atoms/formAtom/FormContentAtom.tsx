import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  type: string;
};

export const FormInputContentAtom: React.FC<Props> = ({ name, type }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const defaultValue = type === 'number' ? 9999 : 'example value';
  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input
        type={type}
        id={name}
        className='border-2 w-full'
        placeholder={name}
        {...register(name, { required: true, value: defaultValue })}
      />
      {errors[name] && <span>This field is required</span>}
    </div>
  );
};
