import React from 'react';

type Props = {
  title: string;
  value: string | number;
  className?: string;
};

export const MainPageContentAtom: React.FC<Props> = ({
  title,
  value,
  className,
}) => {
  return (
    <div className={`text-center my-auto ${className}`}>
      <span>{title}</span>
      {value}
    </div>
  );
};
