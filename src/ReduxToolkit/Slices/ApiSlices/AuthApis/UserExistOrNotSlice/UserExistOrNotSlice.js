import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bUrl } from '../../../../../Utils/BUrl/BUrl';


const initialState = {
    status: 'idle',
    error: null,
    success: null,
    data: null,
};

export const UserExistOrnot = createAsyncThunk(
  'UserExistOrNot',
  async (userEmail, { rejectWithValue }) => {
    const data= {
      Data: {
          EmailId: userEmail
      },
      IsPlatform: false,
      OrgId: "65",
      ClientId: "89248"
  }
  
    try {
      const response = await fetch(`${bUrl}/API/api/public/UserSelfRegister/UserExistOrNot`, {
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

const UserExistOrNotSlice = createSlice({
  name: 'UserExistOrNot',
  initialState,
  reducers: {
    resetUserExistOrNotStatus(state) {
      state.status = 'idle',
      state.error = null,
      state.success = null,
      state. data = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(UserExistOrnot.pending, state => {
        state.status = 'loading';
        state.error = null;
        state.data = null;
      })
      .addCase(UserExistOrnot.fulfilled, (state, action) => {
        
        state.status = 'succuss';
        state.data = action.payload;
        state.success = action.payload.msg;
      })
      .addCase(UserExistOrnot.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetUserExistOrNotStatus } = UserExistOrNotSlice.actions;
export default UserExistOrNotSlice.reducer;
