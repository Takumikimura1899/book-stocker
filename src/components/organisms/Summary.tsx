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
  const [summaryDataTitle, setSummaryTitle] = useState<string>('test');

  const handleAddItem = () => {
    console.log(summaryData, summaryDataTitle);

    const id = Math.random() * 1000;
    const newSummary: ContentSummary = [
      ...summaryData,
      {
        id: id,
        title: summaryDataTitle,
        item: [{ itemId: 0, itemData: 'addItemData' }],
      },
    ];
    setSummaryData(newSummary);
  };

  //   const [test, setTest] = useState<string>('');
  //   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //     setTest(e.target.value);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testTitle = e.target.value;
    setSummaryTitle(testTitle);
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
          value={summaryDataTitle}
        />
        <button className='mx-4' onClick={handleAddItem}>
          アイテムを追加
        </button>
        <button onClick={() => handleUpdate(summaryData, params!)}>更新</button>
      </div>
      <div>
        <p>要約:</p>
        <div className='bg-indigo-500 p-10 w-full'>
          {summaryData.map((summary) => {
            const { id } = summary;

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
                id={id}
                summary={summary}
                setSummaryData={setSummaryData}
                summaryData={summaryData}
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
  id,
  setSummaryData,
  summaryData,
}: {
  summary: {
    id: string | number;
    title: string;
    item: {
      itemId: string | number;
      itemData: string;
    }[];
  };
  id: number | string;
  setSummaryData: React.Dispatch<React.SetStateAction<ContentSummary>>;
  summaryData: ContentSummary;
}) => {
  const [content, setContent] = useState<string>('contentはここです');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
    console.log(e.target.value);
  };

  const handleOnBlur = () => {
    // setSummaryData();
  };

  const handleOnClick = (id: number | string) => {
    // idはちゃんとつけましょう！
    const itemId = Math.random() * 1000;
    const newSummary = summaryData.map((summary) =>
      summary.id === id
        ? {
            ...summary,
            item: [...summary.item, { itemId: itemId, itemData: content }],
          }
        : summary
    );
    setSummaryData(newSummary);
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
          <button onClick={() => handleOnClick(id)}>メモ追加</button>
        </div>
        <SummaryMolecules summary={summary} />
      </div>
    </>
  );
};
