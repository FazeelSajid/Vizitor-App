import { configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from '@react-native-async-storage/async-storage';
import authSlice from "../Slices/StateSlices/AuthStates/authSlice";
import SignInSlice from "../Slices/ApiSlices/AuthApis/SignInSlice/SignInSlice";
import SignUpSlice from "../Slices/ApiSlices/AuthApis/SignUpSlice/SignUpSlice";
import UserExistOrNotSlice from "../Slices/ApiSlices/AuthApis/UserExistOrNotSlice/UserExistOrNotSlice";
import getHostLocation from "../Slices/ApiSlices/AppApis/GetHostLocation/getHostLocation";
import getHostActiveLocation from "../Slices/ApiSlices/AppApis/GetActiveHostLocation/getHostActiveLocation";
import getWindowTimeList from "../Slices/ApiSlices/AppApis/GetWindowTimeLocation/getWindowTimeList";
import getInvites from "../Slices/ApiSlices/AppApis/GetInvites/getInvites";
import getConfiguration from "../Slices/ApiSlices/AppApis/GetConfiguration/getConfiguration";
import getPurposeList from "../Slices/ApiSlices/AppApis/GetPurposeList/getPurposeList";
import addVisit from "../Slices/ApiSlices/AppApis/AddVisits/addVisit";
import getHostInvitedLocation from "../Slices/ApiSlices/AppApis/GetHostInvitedLocationList/getHostInvitedLocation";
import GetVisits from "../Slices/ApiSlices/AppApis/GetVisits/GetVisits";
import AppStatesSlice from "../Slices/StateSlices/AppStates/AppStatesSlice";
import GetVisitDetails from "../Slices/ApiSlices/AppApis/GetVisitDetails/GetVisitDetails";
import getWhereImhost from "../Slices/ApiSlices/AppApis/getWhereImhost/getWhereImhost";
import getProfileDetails from "../Slices/ApiSlices/AppApis/getProfileDetails/getProfileDetails";
import PersistSlice from "../Slices/StateSlices/AppStates/PersistSlice";
// Define the persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Use AsyncStorage for persistence
  whitelist: ['Persistslice'] // Specify the slices you want to persist
};

// Combine all reducers
const rootReducer = combineReducers({
    authSlice: authSlice,
    Persistslice:PersistSlice,
    AppStatesSlice: AppStatesSlice,
    UserExistOrNotSlice: UserExistOrNotSlice,
    SignInSlice: SignInSlice,
    SignUpSlice: SignUpSlice,
    getHostLocation: getHostLocation,
    getHostActiveLocation: getHostActiveLocation,
    getWindowTimeList: getWindowTimeList,
    getInvites: getInvites,
    getConfiguration: getConfiguration,
    getPurposeList: getPurposeList,
    addVisit: addVisit,
    getHostInvitedLocation: getHostInvitedLocation,
    GetVisits: GetVisits,
    GetVisitDetails: GetVisitDetails,
    getWhereImhost: getWhereImhost,
    getProfileDetails: getProfileDetails
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          immutableCheck: false,
          serializableCheck: false,
      }),
});

// Create the persistor
export const persistor = persistStore(store);

// Export the store as default
export default store;
