import { ReactNode } from 'react';
import ReactDOM from 'react-dom';

type FullScreenModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Dialog = ({ isOpen, onClose, children }: FullScreenModalProps) => {
  const dialog = (
    <div>
      <div onClick={onClose} className={'fixed overflow-hidden inset-0 bg-black/30 z-40'} />
      <div
        tabIndex={-1}
        role="dialog"
        className="
          bg-neutral-white 
          z-50 fixed overflow-auto
          w-full
          h-full
          max-w-screen-sm
          -translate-x-1/2 translate-y-1/2
          bottom-1/2 left-1/2
          "
      >
        {children}
      </div>
    </div>
  );

  return isOpen && ReactDOM.createPortal(dialog, document?.body);
};

export default Dialog;
