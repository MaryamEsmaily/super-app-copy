'use client';
import { useAppSelector } from '@/lib/store/hooks';
import LoginForm from './_components/LoginForm';
import OtpForm from './_components/OtpForm';

const AuthPage = () => {
  const { isEnteringUsername, username } = useAppSelector((state) => state.auth);

  return <div>{(isEnteringUsername && <LoginForm />) || (username && <OtpForm />)}</div>;
};

export default AuthPage;
