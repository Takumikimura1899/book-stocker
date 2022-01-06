import React from 'react';

type Props = {
  title: string;
  value: string | number;
};

export const MainPageContentAtom: React.FC<Props> = ({ title, value }) => {
  return (
    <div>
      <span>{title}</span>
      {value}
    </div>
  );
};
