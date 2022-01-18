import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Layout } from '~/src/components/layout/Layout';
import { AuthContext } from '~/src/context/AuthContextProvider';
import { signInWithGoogle, logOut, userCheck } from '~/src/lib/firebaseAuth';

const Login = () => {
  const { currentUser } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    currentUser && router.push(`/mypage/${currentUser.uid}`);
  }, [currentUser, router]);
  return (
    <Layout>
      <div>
        <button onClick={() => signInWithGoogle()}>
          Googleアカウントでログイン
        </button>
        <button onClick={() => logOut()}>ログアウト</button>
        <button onClick={() => userCheck()}>ユーザーIDチェック</button>
      </div>
    </Layout>
  );
};

export default Login;
