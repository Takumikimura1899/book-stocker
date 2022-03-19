import React, { useState } from 'react';
import { SummaryMolecules } from '../molecules/SummaryMolecules';

// type Props = {
//   data: Content;
//   setData: React.Dispatch<React.SetStateAction<Content>>;
//   summary: string[];
// };

type Props = {
  content: Content;
};

export const Summary: React.FC<Props> = ({ content }) => {
  //   const [summaryItem, setSummaryItem] = useState<string>('');
  const [summaryItem, setSummaryItem] = useState<string>('test');
  const [data, setData] = useState(content);
  const { image, title, genre, author, page, status, summary } = data;
  const handleClick = () => {
    console.log(summary, summaryItem);

    const newSummary: string[] = [...summary!, summaryItem];
    setData({ ...data, summary: newSummary });
  };

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
        <button onClick={handleClick}>追加</button>
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
