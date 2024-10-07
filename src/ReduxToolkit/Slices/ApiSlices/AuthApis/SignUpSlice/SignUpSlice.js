import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bUrl } from '../../../../../Utils/BUrl/BUrl';

const initialState = {
  signup: {
    status: 'idle',
    error: null,
    success: null,
    data: null,
  },
};

export const signup = createAsyncThunk(
  'userSignup',
  async (userData, { rejectWithValue }) => {
    const data = {
      email: userData.email,
      password: userData.password,
      device_id: userData.device_id,
      signup_type: 'email',
    };

    try {
      const response = await fetch(`${bUrl}/API/api/public/full/UserSelfRegister/AddNewUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.msg || 'Something went wrong');
      }
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignupStatus(state) {
      state.signup.status = 'idle';
      state.signup.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signup.pending, state => {
        state.signup.status = 'loading';
        state.signup.error = null;
        state.signup.data = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signup.status = 'succeeded';
        state.signup.data = action.payload.data;
        state.signup.success = action.payload.msg;
      })
      .addCase(signup.rejected, (state, action) => {
        state.signup.status = 'failed';
        state.signup.error = action.payload;
      });
  },
});

export const { resetSignupStatus } = signupSlice.actions;
export default signupSlice.reducer;
