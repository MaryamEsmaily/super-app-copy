import constants from '@/lib/static/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Button from '@/lib/components/Button';
import { useEffect } from 'react';
import { decrementTimerValue } from '../slice';

type Props = { onResendCode: () => void };

const SECONDS = 60;
const TWO_DIGIT_NUMBER = 10;

const formatTime = (value: number): string | number => (value < TWO_DIGIT_NUMBER ? `0${value}` : value);

const getTime = (value: number): string => {
  const divisorForMinutes = value % (SECONDS * SECONDS);
  const minutes = Math.floor(divisorForMinutes / SECONDS);

  const divisorForSeconds = divisorForMinutes % SECONDS;
  const seconds = Math.ceil(divisorForSeconds);

  return `${formatTime(minutes)}:${formatTime(seconds)}`;
};

const CountDown = ({ onResendCode }: Props) => {
  const { timerValue } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(decrementTimerValue());
    }, constants.MILLIS);

    return () => clearInterval(intervalId);
  }, [timerValue, dispatch]);

  return (
    <div className="flex justify-center items-center">
      {timerValue === constants.ZERO ? (
        <Button title="ارسال مجدد" variant="outline" size="small" onClick={onResendCode} />
      ) : (
        <div className="text-sm text-neutral-normal flex justify-center">{getTime(timerValue)} تا ارسال مجدد کد</div>
      )}
    </div>
  );
};

export default CountDown;
