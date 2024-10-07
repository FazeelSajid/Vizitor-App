import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bUrl } from '../../../../../Utils/BUrl/BUrl';

const initialState = {
    status: 'idle',
    error: null,
    data: null,
    authToken: null,
    FullName: null,
    UserId: null,
    LoginUserName: null,
    LoginStatus: null,

};

export const signin = createAsyncThunk(
  'userSignin',
  async (userData, { rejectWithValue }) => {
    const data = {
      LoginId: userData.email,
      Password: userData.password,
      AppType: "Portal",
      OrgId: "65",
      ClientId: "89248"
    }
    
    try {
      const response = await fetch(`${bUrl}/API/api/authentication/signin`, {
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

const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    resetSigninStatus(state) {
      state.status = 'idle',
      state.error = null,
      state.data = null,
      state.authToken = null,
      state.FullName = null,
      state.UserId = null,
      state.LoginUserName = null,
      state.LoginStatus = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signin.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.data = null;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.status = 'succuss';
        state.data = action.payload;
        
        state.authToken = action.payload.AuthToken;
        state.FullName = action.payload.FullName;
        state.UserId = action.payload.UserId;
        state.LoginUserName = action.payload.LoginUserName;
        state.LoginStatus = action.payload.LoginStatus;
      })
      .addCase(signin.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetSigninStatus } = signinSlice.actions;
export default signinSlice.reducer;
