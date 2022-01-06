import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Select from 'react-select';

type Props = {
  name: string;
  value: string[];
};

export const FormSelectContentAtom: React.FC<Props> = ({ name, value }) => {
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
      <label htmlFor={name}>{name}:</label>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange } }) => {
          return (
            <Select
              defaultValue={options[0]}
              instanceId={name}
              inputId={name}
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
