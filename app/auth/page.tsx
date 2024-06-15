'use client';
import BackIcon from '@/public/arrow-right.svg';
import { useState } from 'react';
import Button from '@/lib/components/Button';
import Image from 'next/image';
import { Scanner } from '@/lib/components/Scanner';
import Dialog from '@/lib/components/Dialog';

const AuthPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setScanResult(null);
  };

  return (
    <>
      {/* scanner */}
      <Button title="اسکن" variant="outline" onClick={openModal} />

      <Dialog isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-5 space-y-4 h-28">
          <div className="flex items-center gap-2">
            <button onClick={closeModal}>
              <Image src={BackIcon} alt="Back icon" />
            </button>
            <p className="text-lg text-neutral-dark">اسکن</p>
          </div>
          <p className="text-sm text-neutral-normal ">بارکد یا QR code در مرکز توزیع را اسکن کنید</p>
        </div>
        <div className="h-screen max-h-[calc(100vh-112px)] relative">
          <Scanner onScan={(value) => setScanResult(value)} />
          {scanResult ? (
            <div>
              <div className="absolute w-full h-full top-0 bg-success-normal opacity-20" />
              <div className="flex justify-center items-center h-full">
                <div className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-60 bg-error-lighter flex justify-center items-center">
                  ?;lj
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="absolute w-full h-full top-0 bg-error-normal opacity-20" />
              <div className="flex justify-center items-center h-full">
                <div className="absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-full opacity-60 bg-error-lighter flex justify-center items-center">
                  &times;
                </div>
              </div>
            </div>
          )}
          <div className="absolute bottom-0 px-5 py-2 text-neutral-dark bg-neutral-white w-full">۴ تا از ۱۸ بسته</div>
        </div>
      </Dialog>
    </>
  );
};
export default AuthPage;
