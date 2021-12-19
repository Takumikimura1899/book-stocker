import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { Form } from '../components/Form';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <>
      <div className='text3xl font-bold underline text-indigo-500'>
        Hello World!
      </div>
      <Form />
    </>
  );
};

export default Home;
