import constants from '@/lib/static/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Button from '@/lib/components/Button';
import { Controller, useForm } from 'react-hook-form';
import { setIsEnteringUsername, setTimerValue, setUsername } from '../slice';
import CountDown from './CountDown';
import OTPInput from './OTPInput';
import stringHelper from '@/lib/helper/string';
import { User } from 'next-auth';
import {
  usePostApiV1AuthVerifyOtpMutation as verifyOtpApi,
  usePostApiV1AuthSendOtpMutation as sendOtpApi,
} from '@/lib/store/FlexApi';
import { expressToast } from '@/lib/components/Toast';
import { useFormState } from 'react-dom';
import { authenticate } from '@/lib/auth/actions';

type FormValues = { otpValue: string };
const formDefaultValues: FormValues = { otpValue: '' };

const OtpForm = () => {
  const { username } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [sendOtp] = sendOtpApi();
  const [verifyOtp] = verifyOtpApi();
  const [, setSession] = useFormState(authenticate, '');

  const form = useForm<FormValues>({
    defaultValues: formDefaultValues,
  });
  const { control, handleSubmit, formState } = form;
  const { isDirty, isValid, isSubmitting } = formState;

  const onEditUsername = () => dispatch(setIsEnteringUsername(true));

  const onSubmit = async (data: FormValues) => {
    try {
      const result = await verifyOtp({ mobile: username, code: data.otpValue });
      if ('data' in result) {
        const user: User = {
          id: username,
          accessToken: result.data?.data?.access_token,
          refreshToken: result.data?.data?.refresh_token,
        };
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setSession(user);
      }
    } catch (e) {
      if (e instanceof Error) expressToast('error', e.message);
    }
  };

  const onResendCode = async () => {
    try {
      const otpResult = await sendOtp({ mobile: username });
      if ('data' in otpResult) {
        dispatch(setTimerValue(otpResult.data?.data?.ttl ?? constants.OTP_TIMEOUT));
        dispatch(setUsername(username));
      } else if ('error' in otpResult) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expressToast('error', otpResult.error.data.message);
      }
    } catch (e) {
      if (e instanceof Error) expressToast('error', e.message);
    }
  };

  return (
    <div className="mt-16">
      <p className="text-lg text-neutral-dark">کد فعال سازی را وارد کنید.</p>
      <p className="text-sm text-neutral-normal mt-3">
        کد ۵ رقمی به شماره <span className="text-neutral-dark"> {stringHelper.toPersianNumber(username)} </span> ارسال
        شد.
      </p>
      <Button title="ویرایش شماره" variant="link" size="small" onClick={onEditUsername} />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-8">
        <Controller
          control={control}
          name="otpValue"
          rules={{
            required: true,
            validate: (otp) => otp.length === constants.OTP_LENGTH,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <OTPInput length={constants.OTP_LENGTH} focus onChange={onChange} onBlur={onBlur} value={value} />
          )}
        />
        <Button title="تایید" type="submit" disabled={!(isDirty && isValid) || isSubmitting} />
        <CountDown onResendCode={onResendCode} />
      </form>
    </div>
  );
};
export default OtpForm;
