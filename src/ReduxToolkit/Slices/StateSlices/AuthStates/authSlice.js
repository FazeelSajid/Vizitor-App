import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  email: '',
  password: '',
  showPopUpModal: false,
  successPop: false,
  successPopMsg: '',
  isLoading: false,
  errorPop: false,
  errorPopMsg: '',

  firstName: '',
  lastName: '',
  phoneNumber: '',
  countryCode: '1',
  countrySign: 'US',
  isPickerVisible: false,
  IdImage: null,
  Selfie: null,
  isLogOut: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStates: (state, action) => {
      return {...state, ...action.payload};
    },
    resetAuthStates: state => {
      return initialState;
    },
  },
});

export const {setAuthStates, resetAuthStates} = authSlice.actions;
export default authSlice.reducer;
