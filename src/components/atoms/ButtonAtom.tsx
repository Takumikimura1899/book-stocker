import React from 'react';

type Props = React.ComponentProps<'button'>;

export const ButtonAtom = ({ onClick, title }: Props) => {
  return (
    <button
      className='border-solid border-2 hover:cursor-pointer'
      onClick={onClick}
    >
      {title}
    </button>
  );
};
