import { ParsedUrlQuery } from 'querystring';
import React, { useState } from 'react';
import { updateSummary } from '~/src/lib/firebase';
import { SummaryMolecules } from '../molecules/SummaryMolecules';

// type Props = {
//   data: Content;
//   setData: React.Dispatch<React.SetStateAction<Content>>;
//   summary: string[];
// };

type Props = {
  summary: ContentSummary;
  params?: Params;
};

interface Params extends ParsedUrlQuery {
  uid: string;
  contentId: string;
}

export const Summary: React.FC<Props> = ({ summary, params }) => {
  const [summaryData, setSummaryData] = useState<ContentSummary>(summary);
  const [summaryItem, setSummaryItem] = useState<string>('test');

  const handleClick = () => {
    console.log(summaryData, summaryItem);

    const newSummary: ContentSummary = [
      ...summaryData,
      { title: summaryItem, content: [] },
    ];
    setSummaryData(newSummary);
  };

  //   const [test, setTest] = useState<string>('');
  //   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //     setTest(e.target.value);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testTitle = e.target.value;
    setSummaryItem(testTitle);
  };

  const handleUpdate = (
    summaryData: ContentSummary,
    params: ParsedUrlQuery
  ) => {
    updateSummary(params, summaryData);
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
        <button onClick={() => handleUpdate(summaryData, params!)}>更新</button>
      </div>
      <div>
        <p>要約:</p>
        <div className='bg-indigo-500 p-10 w-full'>
          {summaryData.map((summary) => {
            const id = Math.random() * 1000;
            // return (
            //   <SummaryMolecules
            //     item={item}
            //     index={index}
            //     key={index}
            //     test={test}
            //     handleChange={handleChange}
            //   />
            return (
              <SummaryItem
                key={id}
                summary={summary}
                summaryData={summaryData}
                setSummaryData={setSummaryData}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

const SummaryItem = ({
  summary,
  summaryData,
  setSummaryData,
}: {
  summary: {
    title: string;
    content: string[];
  };
  summaryData: any;
  setSummaryData: any;
}) => {
  const [content, setContent] = useState<string>('contentはここです');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  const handleOnBlur = () => {
    // setSummaryData();
  };

  const handleOnClick = () => {
    console.log(content);
    const copyContent = summary.content;
    const newContent = [...copyContent, content];
    // setSummaryData([...summaryData,])
    setSummaryData([{ ...summaryData, content: newContent }]);
  };

  return (
    <>
      <div className='border-2 w-1/4 rounded-md my-4 bg-teal-300 pl-4'>
        <p>{summary.title}</p>
        <div className='flex'>
          <input
            className='w-3/5'
            type='text'
            value={content}
            onChange={handleChange}
          />
          <button onClick={handleOnClick}>追加</button>
        </div>
        <SummaryMolecules summary={summary} handleChange={handleChange} />
      </div>
    </>
  );
};
