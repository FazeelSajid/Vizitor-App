// import { data, list } from '../../../Utils/DummyData';
// import useAuthStates from '../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
// import { fonts } from '../../../../assets/fonts/fonts';
// import { WithNetworkCheck } from '../../../Utils/Utilities';
// import { useDispatch } from 'react-redux';
// import { GetHostInvitedLocation } from '../../../ReduxToolkit/Slices/ApiSlices/AppApis/GetHostInvitedLocationList/getHostInvitedLocation';
// import { getVisit } from '../../../ReduxToolkit/Slices/ApiSlices/AppApis/GetVisits/GetVisits';
// import DropdownComponent from '../../../Components/DropDown/dropdownPicker';
// import useAuthApis from '../../../ReduxToolkit/Hooks/AuthHooks/ApiHooks/useAuthApis';

import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { styles } from './Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useApis from '../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import CustomButton from '../../../Components/Buttons/customButton';
import { COLORS } from '../../../Constants/COLORS';
import ArrowDown from '../../../assets/Svgs/dropDownArrowDown.svg';
import EmptyRecord from '../../../assets/Svgs/emptyRecord.svg';
import QR from '../../../assets/Svgs/Qr.svg';
import CheckIn from '../../../assets/Svgs/checkIn.svg';
import Warning from '../../../assets/Svgs/Warning.svg';
import CheckOut from '../../../assets/Svgs/checkOut.svg';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Location from './LocationBottomSheet/LocationBtmSheet';
import Loader from '../../../Components/Loader/loader';
import PopUp from '../../../Components/NotifyPopUp/PopUp';
import useAppStates from '../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';

const MyVisits = ({ navigation }) => {
  const {
    fetchApis
  } = useApis();
  const { setAppState, appState, PersistedAuth } = useAppStates()
  const bottomSheetRef = useRef();
  const [hostInvitedLocation, setHostInvitedLocation] = useState([]);
  const [getVisitsState, setGetVisitsState] = useState([]);
  const [selectLocation, setSelectedLocation] = useState();

  useEffect(() => {
    const fetchData = async () => {

      setAppState({
        isLoading: true,
      })
      const endPoint = '/api/general/VizitrUserMyVisit/GetHostInvitedLocationList'
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
      const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);
      if (response) {
        setHostInvitedLocation(response.Response.apiResponse);
      }
    };

    fetchData();

    return () => {
      setAppState({
        isLoading: false,
      })
    };
  }, []);

  useEffect(() => {
    if (hostInvitedLocation.length > 0) {
      setSelectedLocation(hostInvitedLocation[0]);
    }
  }, [hostInvitedLocation]);

  useEffect(() => {
    setAppState({
      isLoading: true,
    })

    const fetchVisits = async () => {
      const endPoint = '/api/general/VizitrUserMyVisit/GetVisit'
      const header = {
        "Authorization": `Bearer ${PersistedAuth.authToken}`,
        "Content-Type": "application/json"
      };
      const body = {
        "Data": {
          "BranchID": selectLocation.BranchID
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
        setGetVisitsState(response.Response.apiResponse)
        setAppState({
          isLoading: false,
        })
      }
    }
    if (selectLocation) {
      fetchVisits()
    }
  }, [selectLocation]);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
    //  hideTabBar()
  }, []);

  const handleCloseModalPress = useCallback(() => {
    bottomSheetRef.current?.dismiss();
    // showTabBar();
  }, []);

  const Card = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('VisitDetails')

          setAppState({
            visitId: item.VisitID,
            visitInvitedBy: item.GmailId,
            phoneNumber: item.MobileNumber,
            visiterName: item.FullName,
            purpose: item.Purpose,
            branch: item.Branch,
            isLoading: true,
            company: item.Company
          })
        }
        }
        style={styles.LocationIntemContainer}>
        <View style={styles.emailContainer}>
          {item.GmailId !== 'Not Provided' && <Text style={styles.email}>{item.GmailId}</Text>}
          <CustomButton
            svg={<QR />}
            onPress={() =>
              navigation.navigate('VisitDetails', { VisitID: item.VisitID })
            }
          />
        </View>
        {item.companyName !== 'Not Provided' && <Text style={styles.companyName}>{item.Company}</Text>}

        {item.MobileNumber !== 'Not Provided' && <Text style={styles.companyName}>{item.MobileNumber}</Text>}
        <View style={styles.timeContainer}>
          <CheckIn />
          <Text style={styles.time}>{item.ExpectedCheckIn}</Text>
        </View>
        <View style={styles.timeContainer}>
          <CheckOut />
          <Text style={styles.time}>{item.ExpectedCheckOut}</Text>
        </View>
      </TouchableOpacity>
    )
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
        <Text style={styles.heading}>My Visits</Text>
        {hostInvitedLocation.length > 0 && (
          <TouchableOpacity style={styles.DropdownBtn} onPress={handlePresentModalPress}  >
            <Text style={styles.DropdownBtnText}>
              {selectLocation &&
                `${selectLocation.CompanyWIthBranch.length > 20
                  ? `${selectLocation.CompanyWIthBranch.substring(0, 20)}...`
                  : selectLocation.CompanyWIthBranch
                }`}
            </Text>
            <ArrowDown />
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        style={{ flex: 1, marginTop: hp(3), marginHorizontal: wp(8) }}
        contentContainerStyle={{ flexGrow: 1, }}
        data={getVisitsState}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          appState.isLoading ? <View style={styles.LoaderContainer}>
            <Loader size={wp(10)} color={COLORS.primary} />
          </View> : <View style={styles.LoaderContainer}>
            <EmptyRecord />
            <Text style={styles.ListEmptyComponentTxt} >No Record Found</Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <Card item={item} />
          )
        }}
      />

      {hostInvitedLocation.length > 0 && (
        <Location
          location={hostInvitedLocation}
          bottomSheetRef={bottomSheetRef}
          setSelected={setSelectedLocation}
          selectLocation={selectLocation}
          onClose={handleCloseModalPress}
        />
      )}
    </BottomSheetModalProvider>
  );
};

export default MyVisits;
