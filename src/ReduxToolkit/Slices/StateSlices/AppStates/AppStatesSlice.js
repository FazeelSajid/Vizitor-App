import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   email: '',
   sellectedLocation: '',
   dateFrom: '',
   dateTo: '',
   timeFrom: '',
   timeTo: '',
   arrivalWindow: '',
   purpose: '',
   title: '',
   successPop: false,
  successPopMsg: '',
  isLoading: false,
  errorPop: false,
  errorPopMsg: '',
};

const AppStatesSlice = createSlice({
    name: 'appStates',
    initialState,
    reducers: {
        setAppStates: (state, action) => {
            return { ...state, ...action.payload };
        },
        resetAppStates: (state) => {
            return initialState;
        },
    },
});

export const { setAppStates, resetAppStates } = AppStatesSlice.actions;
export default AppStatesSlice.reducer;
