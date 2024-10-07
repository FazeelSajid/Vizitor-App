
import { createStackNavigator } from '@react-navigation/stack';
import CreateAcc from '../../Screens/AuthStack/CreateAcc/CreateAcc';
import SignIn from '../../Screens/AuthStack/SignIn/SignIn';
import SignUp from '../../Screens/AuthStack/SignUp/SignUp';

import ImagePreviewScreen from '../../Screens/AuthStack/ImagePreivewScreen/ImagePreviewScreen';
import useAuthStates from '../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import Onboarding from '../../Screens/AuthStack/OnBording/Onbording';
import useAppStates from '../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';


const Stack = createStackNavigator();



const AuthStack = () => {
const {appState} = useAppStates()

  return (
   <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName={appState.isLogout ?'SignIn' :'Onbording'} >
    <Stack.Screen name='Onbording' component={Onboarding} />
    <Stack.Screen name='CreateAcc' component={CreateAcc} />
    <Stack.Screen name='SignIn' component={SignIn} />
    <Stack.Screen name='SignUp' component={SignUp} />
    <Stack.Screen name='ImagePreview' component={ImagePreviewScreen} />
   </Stack.Navigator>
  )
}

export default AuthStack
