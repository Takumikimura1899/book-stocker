import { Dialog } from '@headlessui/react';
import { ParsedUrlQuery } from 'querystring';
import React, { useRef, useState } from 'react';
import { updateSummary } from '~/src/lib/firebase';
import { ButtonAtom } from '../atoms/ButtonAtom';
import { MemoModal } from '../molecules/MemoModal';
import { SummaryMolecules } from '../molecules/SummaryMolecules';
import { nanoid } from 'nanoid';

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
  const [summaryData, setSummaryData] = useState<Summary[]>(summary);
  const [addSummaryDataTitle, setAddSummaryTitle] = useState<string>('test');
  const [newMemo, setNewMemo] = useState<string>('');

  const handleAddItem = () => {
    console.log(summaryData, addSummaryDataTitle);

    const summaryId = nanoid();
    const itemId = nanoid();

    const newSummary = [
      ...summaryData,
      {
        id: summaryId,
        title: addSummaryDataTitle,
        item: [{ itemId: itemId, itemData: 'addItemData' }],
      },
    ];
    setSummaryData(newSummary);
  };

  //   const [test, setTest] = useState<string>('');
  //   const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
  //     setTest(e.target.value);

  const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const testTitle = e.target.value;
    setAddSummaryTitle(testTitle);
  };

  const handleUpdate = (summaryData: Summary[], params: ParsedUrlQuery) => {
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
          value={addSummaryDataTitle}
        />
        <ButtonAtom title='アイテムを追加' onClick={handleAddItem} />
        <ButtonAtom
          onClick={() => handleUpdate(summaryData, params!)}
          title='保存する'
        />
      </div>
      <div>
        <p>要約:</p>
        <div className='bg-indigo-500 p-10 w-full'>
          {summaryData.map((summary) => {
            return (
              <SummaryItem
                key={summary.id}
                summary={summary}
                summaryData={summaryData}
                newMemo={newMemo}
                setNewMemo={setNewMemo}
                setSummaryData={setSummaryData}
                handleUpdate={() => handleUpdate(summaryData, params!)}
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
  newMemo,
  setNewMemo,
  setSummaryData,
  handleUpdate,
}: {
  summary: Summary;
  summaryData: Summary[];
  newMemo: string;
  setNewMemo: React.Dispatch<React.SetStateAction<string>>;
  setSummaryData: React.Dispatch<React.SetStateAction<ContentSummary>>;
  handleUpdate: () => void;
}) => {
  // const [newMemo, setNewMemo] = useState<string>('');
  const [isMemoModalOpen, setIsMemoModalOpen] = useState(false);
  const completeButtonRef = useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMemo(e.target.value);
    console.log(e.target.value);
  };

  const handleOnBlur = () => {
    // setSummaryData();
  };

  const handleOnClick = (id: number | string) => {
    const itemId = nanoid();
    const newSummary = summaryData.map((summary) =>
      summary.id === id
        ? {
            ...summary,
            item: [...summary.item, { itemId: itemId, itemData: newMemo }],
          }
        : summary
    );
    setSummaryData(newSummary);
  };

  return (
    <>
      {isMemoModalOpen && (
        <MemoModal
          isOpen={isMemoModalOpen}
          summary={summary}
          content={newMemo}
          id={summary.id}
          setIsMemoModalOpen={setIsMemoModalOpen}
          handleChange={handleChange}
          handleOnClick={handleOnClick}
          handleUpdate={handleUpdate}
        />
      )}
      <div className='border-2 w-1/4 rounded-md my-4 bg-teal-300 pl-4'>
        <div className='flex'>
          <p>{summary.title}</p>
          <ButtonAtom
            onClick={() => setIsMemoModalOpen(true)}
            title='編集する'
          />
        </div>
        <SummaryMolecules summary={summary} />
      </div>
    </>
  );
};
