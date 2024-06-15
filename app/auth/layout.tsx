'use client';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import BackIcon from '@/public/arrow-right.svg';
import Image from 'next/image';
import { ReactNode } from 'react';
import { setIsEnteringUsername } from './slice';
import Logo from '@/lib/components/Logo';

type AuthProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthProps) => {
  const { isEnteringUsername } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <div className="px-9">
      {!isEnteringUsername && (
        <button onClick={() => dispatch(setIsEnteringUsername(true))} className="absolute top-3">
          <Image src={BackIcon} alt="Back icon" />
        </button>
      )}
      <div className="flex justify-center mt-12">
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
