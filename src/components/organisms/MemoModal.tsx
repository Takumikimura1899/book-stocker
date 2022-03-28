import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { testContent, testParam } from '~/src/constant/Constant';
import { Summary } from './Summary';

export const MemoModal = () => {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <>
      {/* <Summary summary={testContent} params={testParam} /> */}
      let [isOpen, setIsOpen] = useState(true); return (
      <>
        {/* <Summary summary={testContent} params={testParam} /> */}
        <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
          <Dialog.Overlay />

          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>
            This will permanently deactivate your account
          </Dialog.Description>

          <p>
            Are you sure you want to deactivate your account? All of your data
            will be permanently removed. This action cannot be undone.
          </p>

          <button onClick={() => setIsOpen(false)}>Deactivate</button>
          <button onClick={() => setIsOpen(false)}>Cancel</button>
        </Dialog>
      </>
    </>
  );
};
