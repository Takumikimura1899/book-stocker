import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

type Inputs = {
  title: string;
  genre: string;
};

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('title')); // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className='flex flex-col w-4/5' onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input className='border-8' placeholder='title' {...register('title')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input className='border-8' {...register('genre', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.genre && <span>This field is required</span>}

      <input className='border-8' type='submit' />
    </form>
  );
};
