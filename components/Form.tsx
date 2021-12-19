import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormContents>();
  const onSubmit: SubmitHandler<FormContents> = (data) => console.log(data);

  console.log(watch('title'));

  return (
    <form className='flex flex-col w-4/5' onSubmit={handleSubmit(onSubmit)}>
      <input className='border-8' type='file' {...register('image')} />
      <input
        className='border-8'
        placeholder='title'
        {...register('title', { required: true })}
      />
      {errors.title && <span>This field is required</span>}
      <select className='border-8' {...register('genre', { required: true })}>
        <option value='マンガ'>マンガ</option>
        <option value='雑誌'>雑誌</option>
        <option value='ビジネス'>ビジネス</option>
        <option value='文学'>文学</option>
        <option value='IT'>IT</option>
        <option value='趣味'>趣味</option>
      </select>
      <input
        className='border-8'
        placeholder='author'
        {...register('author', { required: true })}
      />
      {errors.author && <span>This field is required</span>}
      <input
        type='number'
        className='border-8'
        placeholder='page'
        {...register('page', { required: true })}
      />
      {errors.page && <span>This field is required</span>}
      <select
        className='border-8'
        defaultValue='未読'
        {...register('status', { required: true })}
      >
        <option value='未読'>未読</option>
        <option value='読中'>読中</option>
        <option value='読了'>読了</option>
      </select>
      <input className='border-8' type='submit' />
    </form>
  );
};
type BookGenre = 'IT' | '雑誌' | 'ビジネス' | '文学' | 'IT' | '趣味';
