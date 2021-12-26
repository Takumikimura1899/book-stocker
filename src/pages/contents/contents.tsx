import React from 'react';
import { getFirebaseCollection, getFirebaseData } from '../../lib/firebase';
const Contents = () => {
  const getCollection = () => {
    getFirebaseCollection('bookInfo');
  };
  const getData = async () => {
    const id = await getFirebaseCollection('bookInfo');
    getFirebaseData('bookInfo', id);
  };
  return (
    <div>
      <button onClick={getCollection}>getCollection</button>
      <br />
      <button onClick={getData}>getData</button>
    </div>
  );
};

export default Contents;
