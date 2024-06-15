import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import SessionProvider from './SessionProvider';
import ExpressToastContainer from '@/lib/components/Toast';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: 'Super App',
  description: 'Generated by create next app',
};

const defaultFontFamily = localFont({
  src: '../public/font/IRANYekanXVF.woff2',
  variable: '--default-font-family',
});

export default function RootLayout({ children }: Props) {
  return (
    <html lang="fa" dir="rtl" className={`${defaultFontFamily.variable} font-display bg-neutral-white`}>
      <body className="m-0 p-0 flex justify-center bg-neutral-light">
        <div className="w-full max-w-screen-sm bg-neutral-white h-screen">
          <SessionProvider>
            <StoreProvider>{children}</StoreProvider>
          </SessionProvider>
        </div>
        <ExpressToastContainer />
      </body>
    </html>
  );
}
