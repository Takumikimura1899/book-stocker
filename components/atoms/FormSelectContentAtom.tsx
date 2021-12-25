import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

export const FormSelectContentAtom = ({
  name,
  value,
}: {
  name: string;
  value: string[];
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const options = value.map((elem) => {
    return {
      value: elem,
      label: elem,
    };
  });
  return (
    <div>
      {/* <label htmlFor={name}>{name}:</label> */}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => {
          return (
            <Select
              instanceId={name}
              aria-label={name}
              options={options}
              onChange={(value) => onChange(value?.value)}
            />
          );
        }}
      />

      {/* <select className='' {...register(name, { required: true })}>
        {value.map((elem) => {
          <option key={elem} value={elem}>
            {elem}
          </option>;
        })}
      </select> */}
    </div>
  );
};
