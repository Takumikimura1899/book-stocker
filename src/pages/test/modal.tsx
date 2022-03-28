import React from 'react';
import { MemoModal } from '~/src/components/organisms/MemoModal';
import { Summary } from '~/src/components/organisms/Summary';
import { testContent, testParam } from '~/src/constant/Constant';

const Modal = () => {
  return <Summary summary={testContent} params={testParam} />;
};

export default Modal;
