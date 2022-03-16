import React, { useState } from 'react';
import { SummaryMolecules } from '../molecules/SummaryMolecules';

type Props = {
  handleClick: () => void;
  summary: string[];
};

export const Summary: React.FC<Props> = ({ summary, handleClick }) => {
  const [summaryItem, setSummaryItem] = useState<string>('');
  const [test, setTest] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTest(e.target.value);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testTitle = e.target.value;
    setSummaryItem(testTitle);
  };

  return (
    <>
      <div>
        <p>add summary</p>
        <input
          className='text-white border-2 '
          type='text'
          onChange={onChangeText}
          value={summaryItem}
        />
        <button onClick={() => handleClick}>追加</button>
      </div>
      <div>
        <p>要約:</p>
        <div className='bg-indigo-500 p-10 w-full'>
          {summary?.map((item, index) => {
            return (
              <SummaryMolecules
                item={item}
                index={index}
                key={index}
                test={test}
                handleChange={handleChange}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
