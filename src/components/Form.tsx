import React, { useContext } from 'react';
import {
  useForm,
  Controller,
  SubmitHandler,
  FormProvider,
} from 'react-hook-form';
import { genre, status } from '../constant/Constant';
import { AuthContext } from '../context/AuthContextProvider';
import { addFirebaseData } from '../lib/firebase';
import { FormInputContentAtom } from './atoms/formAtom/FormContentAtom';
import { FormSelectContentAtom } from './atoms/formAtom/FormSelectContentAtom';
import { ImageDropDown } from './ImageDropDown';

export const Form = () => {
  const user = useContext(AuthContext);
  console.log(user.currentUser?.uid);
  const uid = user.currentUser?.uid;
  const methods = useForm<FormContents>();
  const onSubmit: SubmitHandler<FormContents> = (content) => {
    console.log(content);
    const newContent = {
      ...content,
      created_by: uid,
      summary: [{ title: 'テスト', content: ['test'] }],
    };
    addFirebaseData(newContent, uid);
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
            <FormInputContentAtom name='title' type='text' />
            <FormSelectContentAtom name='genre' value={genre} />
            <FormInputContentAtom name='author' type='text' />
            <FormInputContentAtom name='page' type='number' />
            <FormSelectContentAtom name='status' value={status} />
          </div>
          <input className='' type='submit' />
        </form>
      </div>
    </FormProvider>
  );
};
