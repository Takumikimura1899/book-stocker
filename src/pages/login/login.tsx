import { signInWithGoogle } from '~/src/lib/firebaseAuth';

const Login = () => {
  return (
    <div>
      <button onClick={() => signInWithGoogle()}>
        Googleアカウントでログイン
      </button>
    </div>
  );
};

export default Login;
