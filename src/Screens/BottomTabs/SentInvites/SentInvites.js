// import Modaal from './Modal/Modal';
// import { WithNetworkCheck } from '../../../Utils/Utilities';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styles } from './Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useApis from '../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import CustomButton from '../../../Components/Buttons/customButton';
import { COLORS } from '../../../Constants/COLORS';
import ArrowDown from '../../../assets/Svgs/dropDownArrowDown.svg';
import CheckIn from '../../../assets/Svgs/checkIn.svg';
import CheckOut from '../../../assets/Svgs/checkOut.svg';
import Warning from '../../../assets/Svgs/Warning.svg';
import AddInvite from '../../../assets/Svgs/addInvite.svg';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Location from './LocationBottomSheet/LocationBtmSheet';
import Loader from '../../../Components/Loader/loader';
import useAppStates from '../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import EmptyRecord from '../../../assets/Svgs/emptyRecord.svg';
import PopUp from '../../../Components/NotifyPopUp/PopUp';

const SentInvites = ({ navigation }) => {
  const { fetchApis} = useApis();
  const bottomSheetRef = useRef();
  const [selectLocation, setSelectedLocation] = useState(null);
  const { appState, setAppState, PersistedAuth } = useAppStates();
  const [hostLocation, setHostLocation] = useState([]);
  const [invites, setInvites] = useState([]);
  const [windowTimeList, setWindowTimeList] = useState([]);
  const [hostActiveLocation, setHostActiveLocation] = useState([]);

  useEffect(() => {
    const header = {
      "Authorization": `Bearer ${PersistedAuth.authToken}`,
      "Content-Type": "application/json"
    };
    const body = {
      "IsPlatform": false,
      "ClientId": "89248",
      "OrgId": "65",
      "RoleId": "66"
    };

    setAppState({
      isLoading: true,
    })
    
    const getHostLocationList = async () => {
      const endPoint = '/api/general/VizitrUserMyInvite/GetHostLocationList'
      const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        setHostLocation(response.Response.apiResponse)
      }
    };
    const getHostActiveLocation = async () => {
      const endPoint = '/api/general/VizitrUserMyInvite/GetHostActiveLocationList'
      const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        setHostActiveLocation(response.Response.apiResponse)
      }
    };
    const getWindowTimeList = async () => {
      const endPoint = '/api/general/KeyValueApi/WindowTimeList'
      const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        setWindowTimeList(response.Response.apiResponse)
      }
    };
    getHostActiveLocation();
    getWindowTimeList();
    getHostLocationList()

    return () => {
      setAppState({
        isLoading: false,
      })
    };

  }, [PersistedAuth.authToken]);

  useEffect(() => {
    if (hostLocation.length > 0) {
      setSelectedLocation(hostLocation[0]);
    }
  }, [hostLocation]);


  useEffect(() => {

    const fetchInvites = async () => {
      const endPoint = '/api/general/VizitrUserMyInvite/GetInvites'
      const header = {
        "Authorization": `Bearer ${PersistedAuth.authToken}`,
        "Content-Type": "application/json"
      };
      const body = {
        "Data": {
          "BranchID": selectLocation.BranchId
        },
        "DataObj": {},
        "DataInt": {},
        "DataFloat": {},
        "IsPlatform": false,
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66"
      };
      const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        setInvites(response.Response.apiResponse)
        setAppState({
          isLoading: false,
        })
      }
    }
    if (selectLocation) {
      fetchInvites()

    }
  }, [selectLocation]);



  const hideTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
  };


  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);



  const Card = ({item}) =>{
   
   
   return  <TouchableOpacity
    onPress={() =>
      navigation.navigate('InviteDetails', { Invite: item })
    }
    style={styles.LocationIntemContainer}>
    <View style={styles.emailContainer}>
      <Text style={styles.email}>{item.EmailId}</Text>
    </View>
    {item.Company && item.Company !== 'Not Provided' && (
      <Text style={styles.companyName}>{item.Company}</Text>
    )}
    {item.Phone !== 'Not Provided' && (
      <Text style={styles.companyName}>{item.Phone}</Text>
    )}
    <View style={styles.timeContainer}>
      <CheckIn />
      <Text style={styles.time}>{item.ExpectedCheckIn}</Text>
    </View>
    <View style={styles.timeContainer}>
      <CheckOut />
      <Text style={styles.time}>{item.ExpectedCheckOut}</Text>
    </View>
  </TouchableOpacity>
  }
  return (
    <BottomSheetModalProvider style={styles.container}>
      {appState.errorPop && (
        <PopUp
          heading={appState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Sent Invites</Text>
        {hostLocation.length > 0 && (
          <TouchableOpacity
            style={styles.DropdownBtn}
            onPress={handlePresentModalPress}>
            <Text style={styles.DropdownBtnText}>
              {selectLocation &&
                `${selectLocation.CompanyWithBranch.length > 21
                  ? `${selectLocation.CompanyWithBranch.substring(
                    0,
                    21,
                  )}...`
                  : selectLocation.CompanyWithBranch
                }`}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        )}
      </View>

      {hostActiveLocation.length > 0 && <CustomButton
        svg={<AddInvite width={wp(14)} />}
        containerStyle={styles.addInviteBtnContainer}
        onPress={() => navigation.navigate('AddInvite', {windowTimeList, hostActiveLocation})}
      />}

        <FlatList
          style={{ flex: 1, marginTop: hp(3), marginHorizontal: wp(8) }}
          contentContainerStyle={{ flexGrow: 1 }}
          data={invites}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            appState.isLoading ? (
              <View style={styles.LoaderContainer}>
                <Loader size={wp(10)} color={COLORS.primary} />
              </View>
            ) : (
              <View style={styles.LoaderContainer}>
                <EmptyRecord />
                <Text style={styles.ListEmptyComponentTxt}>
                  No Record Found
                </Text>
              </View>
            )
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => {

            return (
             <Card item={item}  />
            );
          }}
        />


      {hostLocation.length > 0 && (
        <Location
          location={hostLocation}
          bottomSheetRef={bottomSheetRef}
          setSelected={setSelectedLocation}
          selectedLocation={selectLocation}
        />
      )}
     
    </BottomSheetModalProvider>
  );
};

export default SentInvites;
