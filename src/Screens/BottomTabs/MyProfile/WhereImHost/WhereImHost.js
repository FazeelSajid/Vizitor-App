import { ScrollView, StyleSheet, Text, View, StatusBar, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Svgs from '../../../../assets/Svgs/Svgs';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import CustomButton from '../../../../Components/Buttons/customButton';
import { fonts } from '../../../../../assets/fonts/fonts';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { COLORS } from '../../../../Constants/COLORS';
import CompanyHostsItem from '../../../../Components/CompanyHostsItem/CompanyHostsItem';
import { styles } from './Styles';
import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { WithNetworkCheck } from '../../../../Utils/Utilities';
import Loader from '../../../../Components/Loader/loader';
import EmptyRecord from '../../../../assets/Svgs/emptyRecord.svg';
import Warning from '../../../../assets/Svgs/Warning.svg';
import { getWhereImHost } from '../../../../ReduxToolkit/Slices/ApiSlices/AppApis/getWhereImhost/getWhereImhost';
import { useDispatch } from 'react-redux';
import PopUp from '../../../../Components/NotifyPopUp/PopUp';
const WhereImHost = ({ navigation }) => {


  const {  fetchApis } = useApis()
  const { appState, setAppState,PersistedAuth } = useAppStates()

  const [whereImHost, setWhereImHost] = useState([])


  const dispatch = useDispatch()
  useEffect(() => {
    const fetchData = async () => {

      setAppState({
        isLoading: true,
      })

      const endPoint = '/api/general/VizitrUserProfile/GetHostLocationList'

      const body = {
        "IsPlatform": false,
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66"
    };

    const header = {
        "Authorization": `Bearer ${PersistedAuth.authToken}`,
        "Content-Type": "application/json"  
    };

    const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);

    if (response) {
      setAppState({
        isLoading: false,
      })
      setWhereImHost(response.Response.apiResponse);
    }
    };
    fetchData()


    return () => {
      setAppState({
        isLoading: false,
      })
    };
  }, [PersistedAuth.authToken])


  // console.log(whereImHost, 'whereImHost');




  return (
    <View style={styles.container}>
      {appState.errorPop && (
        <PopUp
          heading={appState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <CustomHeader
        leftSvg={<ArrowLeft />}
        leftOnpress={() => navigation.goBack()}
        heading={'Company Hosts'}
        headingStyle={styles.heading}
        containerStyle={{ alignItems: 'center' }}
      />

      <FlatList data={whereImHost} keyExtractor={(item, index) => index.toString()} ListEmptyComponent={
        appState.isLoading ? <View style={styles.LoaderContainer}>
          <Loader size={wp(10)} color={COLORS.primary} />
        </View> : <View style={styles.LoaderContainer}>
          <EmptyRecord />
          <Text style={styles.ListEmptyComponentTxt} >No Record Found</Text>
        </View>
      } 
      renderItem={({item})=>{
        return(
          <CompanyHostsItem item={item} />
        )
      }}
      contentContainerStyle={{flexGrow: 1}}
      style={{flex: 1}}
      />


     
      




    </View>
  );
};

export default WhereImHost;


