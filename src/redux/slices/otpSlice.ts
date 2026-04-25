import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

// Thunk 1: Send OTP
export const sendOtp = createAsyncThunk(
  'otp/sendOtp',
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/send-otp`, { email });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to send OTP',
      );
    }
  },
);

// Thunk 2: Verify OTP
export const verifyOtp = createAsyncThunk(
  'otp/verifyOtp',
  async (
    { email, otp }: { email: string; otp: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/verify-otp`, {
        email,
        otp,
      });
      return res.data; // { token, user }
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || 'Verification failed',
      );
    }
  },
);

interface OtpState {
  step: 'email' | 'otp'; // which screen to show
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  user: any | null;
}

const otpSlice = createSlice({
  name: 'otp',
  initialState: {
    step: 'email',
    loading: false,
    error: null,
    successMessage: null,
    user: null,
  } as OtpState,
  reducers: {
    resetOtpState: (state) => {
      state.step = 'email';
      state.error = null;
      state.successMessage = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send OTP
      .addCase(sendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendOtp.fulfilled, (state) => {
        state.loading = false;
        state.step = 'otp'; // move to OTP input screen
        state.successMessage = 'OTP sent! Check your email.';
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Verify OTP
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        // login logic handled in component
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetOtpState, setUser } = otpSlice.actions;
export default otpSlice.reducer;
