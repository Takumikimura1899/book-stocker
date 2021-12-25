import React from 'react';
import { useForm, useFormContext } from 'react-hook-form';

export const FormInputContentAtom = ({
  name,
  type,
}: {
  name: string;
  type: string;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <label htmlFor={name}>{name}:</label>
      <input
        type={type}
        id={name}
        className=''
        placeholder={name}
        {...register(name, { required: true, value: 'example value' })}
      />
      {errors[name] && <span>This field is required</span>}
    </div>
  );
};
