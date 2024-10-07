import {createStackNavigator} from '@react-navigation/stack';
import BottomTabs from '../BottomTabs/BottomTabs';
import VisitDetails from '../../Screens/BottomTabs/MyVisits/VisitDetails/VisitDetails';
import InviteDetails from '../../Screens/BottomTabs/SentInvites/InviteDetails/InviteDetails';
import AddInvite from '../../Screens/BottomTabs/SentInvites/Add Invite/AddInvite';
import PrivacyPolicy from '../../Screens/BottomTabs/MyProfile/PrivacyPolicy/PrivacyPolicy';
import TermsCondition from '../../Screens/BottomTabs/MyProfile/Terms&Condition/Terms&Condition';
import WhereImHost from '../../Screens/BottomTabs/MyProfile/WhereImHost/WhereImHost';
import EditProfile from '../../Screens/BottomTabs/MyProfile/EditProfile/EditProfile';
import ImagePreviewScreen from '../../Screens/BottomTabs/MyProfile/EditProfile/ImagePreivewScreen/ImagePreviewScreen';

const Stack = createStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='BottomTabs'
      >
      <Stack.Screen name='BottomTabs' component={BottomTabs} />
      <Stack.Screen name='VisitDetails' component={VisitDetails} />
      <Stack.Screen name='InviteDetails' component={InviteDetails} />
      <Stack.Screen name='AddInvite' component={AddInvite} />
      <Stack.Screen name='privacy' component={PrivacyPolicy} />
      <Stack.Screen name='TermsCondition' component={TermsCondition} />
      <Stack.Screen name='WhereImHost' component={WhereImHost} />
      <Stack.Screen name='EditProfile' component={EditProfile} />
    <Stack.Screen name='ImagePreview' component={ImagePreviewScreen} />
      
      


    
    </Stack.Navigator>
  );
};

export default MainStack;
