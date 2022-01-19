import React, { useContext, useState } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { AuthContext } from '../context/AuthContextProvider';
import { addFirebaseData, firebaseCollectionId } from '../lib/firebase';
import { FormInputContentAtom } from './atoms/formAtom/FormContentAtom';
import { FormSelectContentAtom } from './atoms/formAtom/FormSelectContentAtom';
import { ImageDropDown } from './ImageDropDown';

export const Form = () => {
  const user = useContext(AuthContext);
  console.log(user.currentUser?.uid);

  const methods = useForm<FormContents>();
  const onSubmit: SubmitHandler<FormContents> = (content) => {
    console.log(content);
    const newContent = { ...content, created_by: user.currentUser?.uid };
    addFirebaseData(newContent);
  };

  console.log(methods.watch('image'));

  return (
    <FormProvider {...methods}>
      <div className='border-2 rounded-xl w-4/5 bg-gray-200 max-w-md'>
        <form
          className='grid grid-cols-2'
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            name='image'
            control={methods.control}
            render={({ field: { onChange } }) => (
              <ImageDropDown
                onChange={(e: any) => onChange(e.target.files[0])}
                setValue={methods.setValue}
              />
            )}
          />
          <div className=''>
            {/* <label htmlFor='Title'>Title:</label>
        <input
          id='Title'
          className=''
          placeholder='title'
          {...register('title', { required: true, value: 'example value' })}
        />
        {errors.title && <span>This field is required</span>} */}
            <FormInputContentAtom name='title' type='text' />
            <FormSelectContentAtom
              name='genre'
              value={['マンガ', '雑誌', 'ビジネス', '文学', 'IT', '趣味']}
            />
            <FormInputContentAtom name='author' type='text' />
            <FormInputContentAtom name='page' type='number' />
            <FormSelectContentAtom
              name='status'
              value={['未読', '読中', '読了']}
            />
            {/* <select className='' {...register('genre', { required: true })}>
          <option value='マンガ'>マンガ</option>
          <option value='雑誌'>雑誌</option>
          <option value='ビジネス'>ビジネス</option>
          <option value='文学'>文学</option>
          <option value='IT'>IT</option>
          <option value='趣味'>趣味</option>
          </select>
          <input
          className=''
          placeholder='author'
          {...register('author', { required: true, value: 'example value' })}
        />
        {errors.author && <span>This field is required</span>}
        <input
          type='number'
          className=''
          placeholder='page'
          {...register('page', { required: true, value: 2 })}
        />
        {errors.page && <span>This field is required</span>}
        <select
          className=''
          defaultValue='未読'
          {...register('status', { required: true })}
        >
          <option value='未読'>未読</option>
          <option value='読中'>読中</option>
          <option value='読了'>読了</option>
        </select> */}
          </div>
          <input className='' type='submit' />
        </form>
      </div>
    </FormProvider>
  );
};
type BookGenre = 'IT' | '雑誌' | 'ビジネス' | '文学' | 'IT' | '趣味';
