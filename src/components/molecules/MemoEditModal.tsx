import { Dialog } from '@headlessui/react';
import React from 'react';
import { ButtonAtom } from '../atoms/ButtonAtom';
import { SummaryEdit } from './SummaryEdit';

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemData: string;
};

export const MemoEditModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  itemData,
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
          <Dialog.Title className=' text-3xl'>{itemData}</Dialog.Title>
          <Dialog.Description>メモの内容を編集します</Dialog.Description>
          <ButtonAtom
            onClick={() => setIsOpen(false)}
            title='モーダルを閉じる'
          />
          <button onClick={() => console.log(itemData)}>log</button>
        </div>
      </div>
    </Dialog>
  );
};
