import stringHelper from '@/lib/helper/string';
import { useEffect, useState } from 'react';

type InputType = 'text' | 'number' | 'password' | 'phoneNumber' | 'email';
type Size = 'small' | 'normal';

type Props = {
  label: string;
  type?: InputType;
  name: string;
  placeHolder?: string;
  disabled?: boolean;
  maxLength?: number;
  onChange?: (newValue: string) => void;
  value?: string;
  size?: Size;
  autoFocus?: boolean;
};

const sizeClassName: Record<Size, string> = {
  small: 'w-36',
  normal: 'w-full',
};

const TextInput = ({
  label,
  value,
  name,
  placeHolder,
  disabled = false,
  type = 'text',
  size = 'normal',
  onChange,
  autoFocus,
}: Props) => {
  const [inputValue, setInputValue] = useState(value || '');

  useEffect(() => {
    if (value) setInputValue(value);
  }, [value]);

  const inputOnChange = (value: string) => {
    const tmpValue = stringHelper.toEnglishNumber(value);

    onChange && onChange(tmpValue);
    setInputValue(tmpValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const persianNumbers = /[\u06F0-\u06F9]/; // Persian digits
    const allowedKeys = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete', 'Tab'];
    const englishNumbers = /[0-9]/;

    if (
      (type === 'number' || type === 'phoneNumber') &&
      !englishNumbers.test(e.key) &&
      !persianNumbers.test(e.key) &&
      !allowedKeys.includes(e.key)
    ) {
      e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (type === 'number' || type === 'phoneNumber') {
      const paste = e.clipboardData.getData('text');
      const persianAndEnglishNumbers = /^[0-9\u06F0-\u06F9]*$/;

      if (!persianAndEnglishNumbers.test(paste)) {
        e.preventDefault();
      }
    }
  };

  return (
    <div className={`flex flex-col space-y-2 ${sizeClassName[size]}`}>
      <label className="text-sm leading-6 bg-white" htmlFor={name}>
        {label}
      </label>
      <input
        className={`h-11 w-full px-2 text-sm rounded-lg outline-none placeholder:text-transparent focus:outline-none bg-gray-100 ${
          type === 'phoneNumber' || type === 'number' ? 'ltr' : 'rtl'
        }`}
        autoFocus={autoFocus}
        disabled={disabled}
        alt={label}
        autoComplete="on"
        placeholder={placeHolder}
        onChange={(e) => inputOnChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        value={stringHelper.toPersianNumber(inputValue)}
        type={type === 'password' ? 'password' : 'text'}
        id={name}
      />
    </div>
  );
};

export default TextInput;
