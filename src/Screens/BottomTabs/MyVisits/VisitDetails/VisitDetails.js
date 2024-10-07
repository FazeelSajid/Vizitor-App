// import { WithNetworkCheck } from '../../../../Utils/Utilities';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './Styles';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import Warning from '../../../../assets/Svgs/Warning.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { fonts } from '../../../../../assets/fonts/fonts';
import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import Loader from '../../../../Components/Loader/loader';
import { COLORS } from '../../../../Constants/COLORS';
import PopUp from '../../../../Components/NotifyPopUp/PopUp';

const VisitDetails = ({navigation}) => {
  const {appState, setAppState, PersistedAuth} = useAppStates();
  const {fetchApis} = useApis();
  const [visitDetails, setVisitDetails] = useState([]);
  // console.log(appState.visitId, 'id');

  useEffect(() => {
    // Define an async function inside useEffect
    const fetchData = async () => {
      
      const endPoint = '/api/general/VizitrUserMyVisit/GetVisitDetails'
      const body = {
        "Data": {
            "VisitID": appState.visitId
        },
        "IsPlatform": false,
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66"
    }

    const header = {
        "Authorization": `Bearer ${PersistedAuth.authToken}`,
        "Content-Type": "application/json"  
    };


    const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        
        setAppState({
          isLoading: false,
        })
        setVisitDetails(response.Response.apiResponse[0]);
      }
      // try {
      //   // Use WithNetworkCheck to check network and then call your API
      //   await WithNetworkCheck(
      //     async () => {
      //       const body = {
      //         VisitId: appState.visitId,
      //         authToken: PersistedAuth.authToken,
      //       };
      //       // Dispatch your thunk here
      //       getVisitDetails(body);
      //     },
      //     setAppState, // Pass your state handler here
      //   );
      // } catch (error) {
      //   console.error('Error fetching data: ', error);
      // }
    };

    // Call the async function
    fetchData();
  }, [appState.visitId]);

  // console.log(appState.authToken);
  // console.log(visitDetails , 'visitDetails');

  const Visit = visitDetails

  

  return (
    <ScrollView style={styles.container} contentContainerStyle={{flexGrow: 1}} >
       {appState.errorPop && (
        <PopUp
          heading={appState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      <CustomHeader
        heading={'Visit'}
        leftSvg={<ArrowLeft width={wp(7)} />}
        leftOnpress={() => navigation.goBack()}
        containerStyle={styles.headerContainer}
        headingStyle={{
          marginRight: wp(50),
          fontFamily: fonts.medium,
        }}
      />
      {
        Visit?  <View style={styles.contentContainer}>
        <View style={{alignItems: 'center', marginBottom: hp(2)}}>
          {
            Visit?.QrCodeImg &&
             <Image source={{uri: Visit?.QrCodeImg}} style={{width: wp(60), height: hp(25)}} />
          }
          
        </View>
        {appState.visitInvitedBy && <>
          <Text style={styles.label}>Invited By:</Text>
          <Text style={styles.labelValue}>{appState.visitInvitedBy}</Text>
        </> }
        {appState.visiterName && <>
          <Text style={styles.label}>Name:</Text>
          <Text style={styles.labelValue}>{appState.visiterName}</Text>
        </> }
        {Visit.Title && <>
          <Text style={styles.label}>Meeting Title:</Text>
          <Text style={styles.labelValue}>{Visit.Title}</Text>
        </> }
     
        {appState.phoneNumber && <>
          <Text style={styles.label}>Phone No:</Text>
          <Text style={styles.labelValue}>{appState.phoneNumber}</Text>
        </> }
        {Visit.Date && <>
          <Text style={styles.label}>Created Date:</Text>
          <Text style={styles.labelValue}>{Visit.Date}</Text>
        </> }
        {Visit.Company && <>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.labelValue}>{Visit.Company}</Text>
        </> }
        {appState.branch && <>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.labelValue}>{appState.branch}</Text>
        </> }
      
        {Visit.ExpectedCheckIn && <>
          <Text style={styles.label}>Expected Check-In:</Text>
          <Text style={styles.labelValue}>{Visit.ExpectedCheckIn}</Text>
        </> }
        {Visit.ExpectedCheckOut && <>
          <Text style={styles.label}>Expected Check-Out:</Text>
          <Text style={styles.labelValue}>{Visit.ExpectedCheckOut}</Text>
        </> }
       
        {Visit.Purpose && <>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.labelValue}>{Visit.Purpose}</Text>
        </> }
        
      </View>:<View style={styles.LoaderContainer}>
        <Loader size={wp(10)} color={COLORS.primary} />
      </View> 
      }
     
    </ScrollView>
  );
};

export default VisitDetails;
