import { signInWithGoogle, logOut, userCheck } from '~/src/lib/firebaseAuth';

const Login = () => {
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>
        Googleアカウントでログイン
      </button>
      <button onClick={() => logOut()}>ログアウト</button>
      <button onClick={() => userCheck()}>ユーザーIDチェック</button>
    </div>
  );
};

export default Login;
