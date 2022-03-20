import React from 'react';

type Props = {
  item: string;
  test: string;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const SummaryMolecules: React.FC<Props> = ({
  item,
  test,
  handleChange,
}) => {
  return (
    <div className='border-2 w-1/4 rounded-md my-4 bg-teal-300 pl-4'>
      <p>{item}</p>
      <textarea name='' id='' value={test} onChange={(e) => handleChange(e)} />
    </div>
  );
};
