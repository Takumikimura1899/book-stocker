import React from 'react';

type Props = {
  summary: {
    title: string;
    content: string[];
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  //   onBlur:any
};

export const SummaryMolecules: React.FC<Props> = ({
  summary,
  handleChange,
}) => {
  return (
    <>
      {/* <textarea name='' id='' value={test} onChange={(e) => handleChange(e)} /> */}
      {summary.content.map((arry) => {
        return (
          <>
            <p>{arry}</p>
          </>
        );
      })}
    </>
  );
};
