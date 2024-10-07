import {createSlice} from '@reduxjs/toolkit';

const initialState = {
//   isAuthenticated: false,
    authToken: null,
    email: ''
};

const PersistedSlice = createSlice({
  name: 'persistedAuth',
  initialState,
  reducers: {
    setPersistedAuth: (state, action) => {
      return {...state, ...action.payload};
    },
    resetPersistedAuth: state => {
      return initialState;
    },
  },
});

export const {setPersistedAuth, resetPersistedAuth} = PersistedSlice.actions;
export default PersistedSlice.reducer;
