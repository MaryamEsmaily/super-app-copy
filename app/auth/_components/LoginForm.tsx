import regexHelper from '@/lib/helper/regex';
import constants from '@/lib/static/constants';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import Button from '@/lib/components/Button';
import TextInput from '@/lib/components/TextInput';
import { Controller, useForm } from 'react-hook-form';
import { setIsEnteringUsername, setTimerValue, setUsername } from '../slice';
import { usePostApiV1AuthSendOtpMutation as sendOtpApi } from '@/lib/store/FlexApi';
import { expressToast } from '@/lib/components/Toast';
type FormValues = { username: string };
const formDefaultValues: FormValues = {
  username: '',
};

const LoginForm = () => {
  const { username } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const [sendOtp] = sendOtpApi();

  const form = useForm<FormValues>({
    defaultValues: formDefaultValues,
  });
  const { handleSubmit, control, formState } = form;
  const { isDirty, isValid, isSubmitting } = formState;

  const onSubmit = async (data: FormValues) => {
    if (data.username === username) {
      dispatch(setIsEnteringUsername(false));
    }
    try {
      const otpResult = await sendOtp({ mobile: data.username });
      if ('data' in otpResult) {
        dispatch(setTimerValue(otpResult.data?.data?.ttl ?? constants.OTP_TIMEOUT));
        dispatch(setUsername(data.username));
      } else if ('error' in otpResult) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expressToast('error', otpResult.error.data?.message);
      }
    } catch (e) {
      if (e instanceof Error) expressToast('error', e.message);
    }
  };

  return (
    <div className="mt-32">
      <p className="text-lg text-neutral-dark my-8">ورود یا ثبت‌نام</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="username"
          rules={{
            required: true,
            pattern: regexHelper.phoneNumber,
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              label="شماره موبایل"
              type="phoneNumber"
              name="phoneNumber"
              placeHolder="09123456789"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button className="mt-8" title="ادامه" type="submit" disabled={!(isDirty && isValid) || isSubmitting} />
      </form>
    </div>
  );
};

export default LoginForm;
