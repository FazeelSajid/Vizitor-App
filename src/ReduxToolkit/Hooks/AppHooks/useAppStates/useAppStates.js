import { useDispatch, useSelector } from "react-redux";
import { setAppStates } from "../../../Slices/StateSlices/AppStates/AppStatesSlice";
import { resetAppStates } from "../../../Slices/StateSlices/AppStates/AppStatesSlice";
import {setPersistedAuth, resetPersistedAuth} from "../../../Slices/StateSlices/AppStates/PersistSlice";

const useAppStates = () => {

    const dispatch = useDispatch();
    
    const appState = useSelector(state => state.AppStatesSlice);

    const setAppState = (newStatus) => {
        dispatch(setAppStates(newStatus));
    };
    const PersistedAuth = useSelector(state => state.Persistslice);

    const setPersistedAuths = (newStatus) => {
      dispatch(setPersistedAuth(newStatus));
  };
    const resetPersistedAuths = () => {
      dispatch(resetPersistedAuth());
  };
    const resetAppState = () =>{
      dispatch(resetAppStates)
    }


  return {
    setAppState,
    appState,
    resetAppState,
    setPersistedAuths,
    PersistedAuth,
    resetPersistedAuths
  }
}

export default useAppStates

