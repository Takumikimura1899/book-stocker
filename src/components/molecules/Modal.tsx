import { Dialog } from '@headlessui/react';
import React from 'react';
import { ButtonAtom } from '../atoms/ButtonAtom';
import { SummaryEdit } from './SummaryEdit';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  summary: Summary;
  content: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: number | string;
  handleOnClick: (id: number | string) => void;
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  summary,
  content,
  setIsOpen,
  id,
  handleChange,
  handleOnClick,
}) => {
  return (
    <Dialog
      // initialFocus={completeButtonRef}
      open={isOpen}
      onClose={() => setIsOpen(false)}
      as='div'
      // static={true}
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? 'bg-gray-900 bg-opacity-80' : ''
      } `}
    >
      <div className='flex items-center justify-center min-h-screen '>
        <Dialog.Overlay className='' />
        <div className='flex flex-col items-center justify-center p-4 rounded-xl bg-green-300 '>
          <Dialog.Title className=' text-3xl'>{summary.title}</Dialog.Title>
          <Dialog.Description>メモの内容を編集します</Dialog.Description>
          <input
            className='w-3/5'
            type='text'
            value={content}
            onChange={handleChange}
          />
          <button onClick={() => handleOnClick(id)}>メモ追加</button>
          <SummaryEdit summary={summary} />
          <ButtonAtom
            onClick={() => setIsOpen(false)}
            title='モーダルを閉じる'
          />
          <ButtonAtom
            onClick={() => setIsOpen(false)}
            title='モーダルを閉じる'
          />
          {/* <button onClick={() => setIsOpen(false)}>Cancel</button> */}
        </div>
      </div>
    </Dialog>
  );
};
