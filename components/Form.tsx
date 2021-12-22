import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ImageDropDown } from './ImageDropDown';

export const Form = ({ setImage }: any) => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useForm<FormContents>();
  const onSubmit: SubmitHandler<FormContents> = (data) => {
    console.log(data);
    setImage(data.image);
    localStorage.setItem('info', JSON.stringify(data));
  };

  console.log(watch('image'));

  return (
    <form className='flex flex-col w-1/4' onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='image'
        control={control}
        render={({ field: { onChange } }) => (
          <ImageDropDown
            onChange={(e: any) => onChange(e.target.files[0])}
            setValue={setValue}
          />
        )}
      />
      <input
        className='border-8'
        placeholder='title'
        {...register('title', { required: true, value: 'example value' })}
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
        {...register('author', { required: true, value: 'example value' })}
      />
      {errors.author && <span>This field is required</span>}
      <input
        type='number'
        className='border-8'
        placeholder='page'
        {...register('page', { required: true, value: 2 })}
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