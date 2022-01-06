import React from 'react';

type Props = {
  value: string;
};

export const NavbarContentAtom: React.FC<Props> = ({ value }) => {
  return (
    <a
      href='#'
      className=' w-1/5 text-center text-gray-600 hover:text-indigo-500 active:text-indigo-700 text-lg font-semibold transition duration-100'
    >
      {value}
    </a>
  );
};
