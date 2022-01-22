import type { NextPage } from 'next';
import Link from 'next/link';
import { Layout } from '../components/layout/Layout';

const Home: NextPage = () => {
  return (
    <>
      <Layout>
        <Link href={'/mypage/myPage'}>myPage</Link>
        <Link href={'/addpage/addpage'}>addPage</Link>
      </Layout>
    </>
  );
};

export default Home;
