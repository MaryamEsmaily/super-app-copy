import stringHelper from '@/lib/helper/string';
import { ChangeEvent, useRef, useState } from 'react';

type Props = {
  length: number;
  focus?: boolean;
  value?: string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
};

const OTPInput = ({ length, focus = false, value = '', onChange = () => {}, onBlur = () => {} }: Props) => {
  const [otpValue, setOtpValue] = useState(value);
  const ref = useRef<HTMLInputElement>(null);

  const otpOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    let str = e.target.value;
    /* Remove spaces from the input */
    str = str.replace(/\s+/g, '');
    const tmp = stringHelper.toEnglishNumber(str);
    if (tmp.length <= length && !isNaN(Number(tmp))) {
      setOtpValue(tmp);
      onChange(tmp);
    }
  };

  return (
    <div
      className="relative w-full h-12 text-sm text-center leading-tight text-neutral-dark cursor-text"
      onClick={() => ref.current?.focus()}
    >
      <div className="absolute w-full h-full flex justify-center flex-row-reverse gap-4">
        {stringHelper
          .toPersianNumber(otpValue)
          .padEnd(length, ' ')
          .split('')
          .map(
            (
              char,
              index // TODO: fix it
            ) => (
              <span
                key={`${char}-${index}`}
                className="rounded-lg bg-neutral-lighter w-12 h-full flex justify-center items-center"
              >
                {char}
              </span>
            )
          )}
      </div>

      <input
        className="w-0 h-0"
        autoFocus={focus}
        ref={ref}
        value={stringHelper.toEnglishNumber(otpValue)}
        onChange={otpOnChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default OTPInput;
