import constants from '@/lib/static/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  username: string;
  otpValue: string;
  isEnteringUsername: boolean;
  isNewUser: boolean;
  timerValue: number;
  otpExpireTime: number;
};

const initialState: AuthState = {
  username: '',
  otpValue: '',
  isEnteringUsername: true,
  isNewUser: false,
  timerValue: constants.OTP_TIMEOUT,
  otpExpireTime: constants.ZERO,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.isEnteringUsername = false;
    },
    setOtpValue(state, action: PayloadAction<string>) {
      state.otpValue = action.payload;
    },
    setIsEnteringUsername(state, action: PayloadAction<boolean>) {
      state.isEnteringUsername = action.payload;
    },
    setIsNewUser(state, action: PayloadAction<boolean>) {
      state.isNewUser = action.payload;
    },
    decrementTimerValue(state) {
      state.timerValue = Math.max(Math.ceil((state.otpExpireTime - Date.now()) / constants.MILLIS), constants.ZERO);
    },
    setTimerValue(state, action: PayloadAction<number>) {
      state.timerValue = action.payload;
      state.otpExpireTime = Date.now() + action.payload * constants.MILLIS;
    },
  },
});

export const { setTimerValue, decrementTimerValue, setIsNewUser, setUsername, setOtpValue, setIsEnteringUsername } =
  authSlice.actions;
export default authSlice.reducer;
