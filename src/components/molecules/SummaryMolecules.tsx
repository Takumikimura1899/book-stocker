import React from 'react';

type Props = {
  summary: {
    title: string;
    item: {
      itemId: string | number;
      itemData: string;
    }[];
  };
  //   onBlur:any
};

export const SummaryMolecules: React.FC<Props> = ({ summary }) => {
  return (
    <>
      {/* <textarea name='' id='' value={test} onChange={(e) => handleChange(e)} /> */}
      {summary.item.map(({ itemData, itemId }) => {
        return (
          <div key={itemId}>
            <p>{itemData}</p>
          </div>
        );
      })}
    </>
  );
};
