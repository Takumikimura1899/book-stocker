import React, { useState } from 'react';
import { ButtonAtom } from '../atoms/ButtonAtom';
import { MemoEditModal } from './MemoEditModal';

type Props = {
  summary: {
    title: string;
    item: {
      itemId: string | number;
      itemData: string;
    }[];
  };
};

export const SummaryEdit: React.FC<Props> = ({ summary }) => {
  const [isOpen, setIsOpen] = useState(false);
  const onClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {/* <textarea name='' id='' value={test} onChange={(e) => handleChange(e)} /> */}
      {summary.item.map(({ itemData, itemId }) => {
        return (
          <div key={itemId} className='flex'>
            <p>{itemData}</p>
            <ButtonAtom title='編集する' onClick={onClick} />
            {isOpen && <MemoEditModal />}
          </div>
        );
      })}
    </>
  );
};
