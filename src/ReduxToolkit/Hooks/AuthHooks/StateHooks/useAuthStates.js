import { useDispatch, useSelector } from "react-redux";
import { resetAuthStates, setAuthStates } from "../../../Slices/StateSlices/AuthStates/authSlice";



const useAuthStates = () => {

    const dispatch = useDispatch();
    
    const authState = useSelector(state => state.authSlice);

    const setAuthState = (newStatus) => {
        dispatch(setAuthStates(newStatus));
    };
   

    const resetAuthState = () =>{
      dispatch(resetAuthStates())
    }

  return {
    setAuthState,
    authState,
    resetAuthState,
    
  }
}

export default useAuthStates

