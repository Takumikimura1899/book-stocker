import React, { useState } from 'react';
import { SummaryMolecules } from '../molecules/SummaryMolecules';

// type Props = {
//   data: Content;
//   setData: React.Dispatch<React.SetStateAction<Content>>;
//   summary: string[];
// };

type Props = {
  summary: ContentSummary;
};

export const Summary: React.FC<Props> = ({ summary }) => {
  const [summaryData, setSummaryData] = useState<ContentSummary>(summary);
  const [summaryItem, setSummaryItem] = useState<string>('test');

  const handleClick = () => {
    console.log(summaryData, summaryItem);

    const newSummary: string[] = [...summaryData, summaryItem];
    setSummaryData(newSummary);
  };

  //   const [test, setTest] = useState<string>('');
  //   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //     setTest(e.target.value);

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
          {summaryData.map((item) => {
            const id = Math.random() * 1000;
            // return (
            //   <SummaryMolecules
            //     item={item}
            //     index={index}
            //     key={index}
            //     test={test}
            //     handleChange={handleChange}
            //   />
            return <SummaryItem key={id} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

const SummaryItem = ({ item }: { item: any }) => {
  const [test, setTest] = useState<string>('test');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setTest(e.target.value);

  return (
    <SummaryMolecules item={item} test={test} handleChange={handleChange} />
  );
};
