import React, { useCallback, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyVisits from '../../Screens/BottomTabs/MyVisits/MyVisits';
import FrequentVisitors from '../../Screens/BottomTabs/FrequentVisitors/FrequentVisitors';
import FrequentLocations from '../../Screens/BottomTabs/FrequentLocations/FrequentLocations';
import MyProfile from '../../Screens/BottomTabs/MyProfile/MyProfile';
import { COLORS } from '../../Constants/COLORS';
import VisitsGray from '../../assets/Svgs/visitsGray.svg';
import VisitsPink from '../../assets/Svgs/visitsPink.svg';
import InvitesGray from '../../assets/Svgs/invitesGray.svg';
import InvitesPink from '../../assets/Svgs/invitesPink.svg';
import FrequentGray from '../../assets/Svgs/frequentGray.svg';
import FrequentPink from '../../assets/Svgs/frequentPink.svg';
import LocationGray from '../../assets/Svgs/locationGray.svg';
import LocationPink from '../../assets/Svgs/locationPink.svg';
import ProfileGray from '../../assets/Svgs/profileGray.svg';
import ProfilePink from '../../assets/Svgs/profilePink.svg';
import SentInvites from '../../Screens/BottomTabs/SentInvites/SentInvites';
import { Platform } from 'react-native';


const Tab = createBottomTabNavigator();

const BottomTabs = () => {


  return (
    
      <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: COLORS.secondry,
        // tabBarInactiveTintColor: COLORS.grayText,
        // tabBarShowLabel: false,
        tabBarStyle: [{
          backgroundColor: COLORS.white,
          height: hp('8%'),
          paddingBottom: hp('1%'),
          
          
          // display: route.name === 'MyProfile' ? 'none' : 'flex', // Hide tab bar on Events screen
        }, Platform.OS === 'ios' && {paddingBottom: hp('2%'), height: hp('9%')}],
        tabBarIcon: ({ focused, color, size }) => {

          if (route.name === 'MyVisits') {
            return focused ? (
              <VisitsPink width={wp(8)}/>
            ) : (
              <VisitsGray width={wp(8)} />
            );
          } else if (route.name === 'MyInvites') {
            return focused ? (
              <InvitesPink width={wp(9)}/>
            ) : (
              <InvitesGray width={wp(9)} />
            );
          } else  if (route.name === 'FrequentVisitors') {
            return focused ? (
              <FrequentPink width={wp(8)}/>
            ) : (
              <FrequentGray width={wp(8)} />
            );
          } else if (route.name === 'FrequentLocations') {
            return focused ? (
              <LocationPink width={wp(4)} />
            ) : (
              <LocationGray width={wp(4)} />
            );
          } else {
            return focused ? (
              <ProfilePink width={wp(8)} />
            ) : (
              <ProfileGray
                width={wp(8)}
               
              />
            );
          }
        },
      })}
      >

        <Tab.Screen name='MyVisits' component={MyVisits} />
        <Tab.Screen name='MyInvites' component={SentInvites} />
        {/* <Tab.Screen name='FrequentVisitors' component={FrequentVisitors} />
        <Tab.Screen name='FrequentLocations' component={FrequentLocations} /> */}
        <Tab.Screen name='MyProfile' component={MyProfile} />
        
       
      </Tab.Navigator>
    
  );
};

export default BottomTabs;

const styles = {

};
