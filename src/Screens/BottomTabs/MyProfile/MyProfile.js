import { Alert, Image, ImageBackground, Share, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import { COLORS } from '../../../Constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../assets/fonts/fonts';
// import Premium from '../../../../assets/svgs/premium.svg';
// import Password from '../../../../assets/svgs/LockFilled.svg';
// import Feedback from '../../../../assets/svgs/feedback.svg';
// import FAQS from '../../../../assets/svgs/faqs.svg';
// import Privacy from '../../../../assets/svgs/privacy.svg';
import Support from '../../../assets/Svgs/support.svg';
import ArrowRight from '../../../assets/Svgs/arrowRight.svg';
import Warning from '../../../assets/Svgs/Warning.svg';
import LogOut from '../../../assets/Svgs/logout.svg';
import PopUpModal from '../../../Components/PopupModal/PopUpModal';
import CustomButton from '../../../Components/Buttons/customButton';
import useAuthStates from '../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import useAuthApis from '../../../ReduxToolkit/Hooks/AuthHooks/ApiHooks/useAuthApis';
import { styles } from './Styles';
import useApis from '../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import useAppStates from '../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { useDispatch } from 'react-redux';
import { getprofileDetails } from '../../../ReduxToolkit/Slices/ApiSlices/AppApis/getProfileDetails/getProfileDetails';
import { WithNetworkCheck } from '../../../Utils/Utilities';
import Loader from '../../../Components/Loader/loader';
import PopUp from '../../../Components/NotifyPopUp/PopUp';
import Clipboard from '@react-native-clipboard/clipboard';


const MyProfile = ({ navigation }) => {
  const dispatch = useDispatch()
  const [DeletePopUp, setDeletePopUp] = useState(false);
  const [contactPopUp, setContactPopUp] = useState(false);
  const [LogOutPopUp, setLogOutPopUp] = useState(false);
  const { setAuthState } = useAuthStates();
  const { resetUserExistOrNot, resetSigninState, resetSignupState } =
    useAuthApis();
    const {fetchApis} = useApis();

  const { appState, setAppState, resetPersistedAuths, PersistedAuth } = useAppStates()


  useEffect(() => {
    const fetchData = async () => {

      setAppState({
        isLoading: true,
      })

      const endPoint = '/api/general/VizitrUserProfile/Get'
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
        setAppState({
          isLoading: false,
        })

        const responsee = response.Response.apiResponse[0]
        // console.log(response);

        setAppState({
          firstName: responsee.FirstName || '',
          lastName: responsee.LastName || '',
          emailId: responsee.EmailID || '',
          mobileNumber: responsee.MobileNumber || '',
          idFile: responsee.IdFile || '',
          Selfie: responsee.SelfieFile || '',
        });
      }
    };
    fetchData()


    return () => {
      setAppState({
        isLoading: false,
      })
    };
  }, [PersistedAuth.authToken])

  //  console.log(ProfileDetails);
  const onShare = async () => {
    const appLink = ' https://user.vizitr.com/portal/login'
    try {
      Clipboard.setString(appLink);
      // Alert.alert('Link Copied', 'The app download link has been copied to the clipboard.');

      // Now, trigger the share action
      const result = await Share.share({
        message: `Check out this awesome app! Download it here: ${appLink}`,
      });


      // Check if the user shared the app or canceled the action
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // User shared with an app activity (like WhatsApp, Email, etc.)
          console.log('Shared with activity: ' + result.activityType);
        } else {
          // User shared without specifying an activity
          console.log('App shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // User dismissed the share dialog
        console.log('User dismissed the share dialog');
      }
    } catch (error) {
      console.log('Error', error.message);
    }
  };



  const options = [
    {
      title: 'Where I am a Host',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      navigateTo: 'WhereImHost',
    },
    {
      title: 'Privacy Policy',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      navigateTo: 'privacy',
    },
    {
      title: 'Terms and Conditions',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      navigateTo: 'TermsCondition',
    },
  ];

  const btns  = [
    {
      text: 'Rate App',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      onPress: ()=> console.log('Rate App Btn Pressed')
      
    },
    {
      text: 'Contact Support',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      onPress: ()=> setContactPopUp(true)
    },
    {
      text: 'Share App',
      svg: <ArrowRight width={wp(3)} height={wp(3)} />,
      onPress: onShare
    }
  ]
  // https://randomuser.me/api/portraits/men/1.jpg
  const navigateTo = screen => {
    navigation.navigate(screen);
  };



  // console.log(appState.Selfie, 'Selfie');


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
      {
        appState.Selfie ? <View style={styles.headerContainer}>
          <ImageBackground
            source={require('../../../assets/Images/borderImage.png')}
            style={{
              height: hp(20),
              width: wp(34),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={{ uri: appState.Selfie }}
              style={{
                height: hp(12),
                width: wp(24),
                borderRadius: 100,
                marginBottom: hp(1),
              }}
            />
          </ImageBackground>

          <View style={styles.headerContentContainer}>
            <Text style={styles.heading}>{appState.firstName} {appState.lastName}</Text>
            <Text style={styles.email}>{appState.emailId}</Text>
            <Text style={styles.email}>{appState.mobileNumber}</Text>

            <CustomButton
              text={'Edit Profile'}
              containerStyle={styles.editBtn}
              textStyle={styles.btnText}
              onPress={() => navigateTo('EditProfile')}
              pressedRadius={wp(10)}
            />
          </View>
        </View> : <View style={styles.LoaderContainer}>
          <Loader size={wp(10)} color={COLORS.primary} />
        </View>


      }
      <View style={{ marginTop: wp(0) }}>
        {options.map((option, index) => (
          <CustomButton
            rightSvg={option.svg}
            text={option.title}
            key={index}
            containerStyle={styles.optionContainer}
            textStyle={{
              color: COLORS.darkTextColor,
              fontSize: wp(4.6),
              marginLeft: wp(4),
              fontFamily: fonts.regular,
            }}
            onPress={() => option.navigateTo && navigateTo(option.navigateTo)}
            contentContainer={{ justifyContent: 'space-between' }}
          />
        ))}

        {
          btns.map((item, index)=>{
            return (
              <CustomButton
                rightSvg={item.svg}
                text={item.text}
                key={index}
                containerStyle={styles.optionContainer}
                textStyle={styles.optionBtnTxt}
                onPress={item.onPress}
                contentContainer={{ justifyContent: 'space-between' }}
              />
            )
          })
        }
        {/* <CustomButton
          rightSvg={<ArrowRight width={wp(3)} height={wp(3)} />}
          text={'Contact Support'}
          // key={index}
          containerStyle={styles.optionContainer}
          textStyle={{
            color: COLORS.darkTextColor,
            fontSize: wp(4.6),
            marginLeft: wp(4),
            fontFamily: fonts.regular,
          }}
          onPress={() => setContactPopUp(true)}
          contentContainer={{ justifyContent: 'space-between' }}
        />
        <CustomButton
          rightSvg={<ArrowRight width={wp(3)} height={wp(3)} />}
          text={'Contact Support'}
          // key={index}
          containerStyle={styles.optionContainer}
          textStyle={{
            color: COLORS.darkTextColor,
            fontSize: wp(4.6),
            marginLeft: wp(4),
            fontFamily: fonts.regular,
          }}
          onPress={() => setContactPopUp(true)}
          contentContainer={{ justifyContent: 'space-between' }}
        /> */}
        <CustomButton
          // svg={<Support width={wp(7)} height={wp(7)} />}
          text={'Log Out'}
          // key={index}
          containerStyle={styles.optionContainer}
          textStyle={{
            color: 'red',
            fontSize: wp(4.5),
            marginLeft: wp(4),
          }}
          onPress={() => setLogOutPopUp(true)}
        />
        <CustomButton
          // svg={<Support width={wp(7)} height={wp(7)} />}
          text={'Delete Account'}
          // key={index}
          containerStyle={styles.optionContainer}
          textStyle={{
            color: 'red',
            fontSize: wp(4.5),
            marginLeft: wp(4),
          }}
          onPress={() => setDeletePopUp(true)}
        />
      </View>
      <PopUpModal
        visible={contactPopUp}
        svg={<Support width={wp('16%')} height={hp('8%')} />}
        btn1Press={() => {
          setContactPopUp(false);
        }}
        message={`Need support? Contact us at [support@visitor.com].`}
        btn1Txt="Ok"
        btn1style={styles.contactModalButton}
        btn1TxtStyle={{ color: COLORS.primary, fontSize: wp(4), }}
        textStyle={{
          // marginBottom: hp(5),

          textAlign: 'center',
          fontFamily: fonts.regular,
          fontSize: wp(3.6),
          color: COLORS.black,
          width: wp(70),
        }}
        heading={'Contact Support'}
        btnsContainer={{ paddingHorizontal: wp(3) }}
        headingTxtStyle={styles.contactModalHeading}
        containerStyle={{ width: wp(70), paddingVertical: wp(7) }}
      />
      <PopUpModal
        visible={LogOutPopUp}
        svg={<LogOut width={wp('20%')} height={hp('10%')} />}
        btn1Press={() => {
          setLogOutPopUp(false);
        }}
        btn2Press={() => {
          resetPersistedAuths()
          setAppState({ isLogout: true })
        }}
        // message="Logout"
        btn1Txt="Cancel"
        btn1style={styles.modalBtn1}
        btn1TxtStyle={{ color: COLORS.primary, fontSize: wp(4) }}
        textStyle={{
          // marginBottom: hp(5),
          // marginTop: hp(2),
          textAlign: 'center',
          fontFamily: fonts.regular,
          // fontSize: wp(3.6),
          color: COLORS.black,
        }}
        message={'Are you sure you want to Logout'}
        btn2TxtStyle={{ color: COLORS.white, fontSize: wp(4) }}
        btn2style={styles.modalBtn2}
        btn2Txt={'Logout'}
        heading={'Logout'}
        btnsContainer={{
          flexDirection: 'row',
          // paddingHorizontal: wp(20),
          // marginTop: wp(8),
          // alignItems: 'center',
          justifyContent: 'center',
        }}

      />
      <PopUpModal
        visible={DeletePopUp}
        svg={<Warning width={wp('20%')} height={hp('10%')} />}
        btn1Press={() => {
          setDeletePopUp(false);
        }}
        btn2Press={() => {
          resetUserExistOrNot();
          resetSigninState();
          resetSignupState();
          setAuthState({ isAuthenticated: false });
        }}
        // message="Logout"
        btn1Txt="Cancel"
        btn1style={styles.modalBtn1}
        btn1TxtStyle={{ color: COLORS.primary, fontSize: wp(4) }}
        textStyle={{
          // marginBottom: hp(5),
          // marginTop: hp(2),
          textAlign: 'center',
          fontFamily: fonts.regular,
          // fontSize: wp(3.6),
          color: COLORS.black,
          width: wp(61),
        }}
        message={'Are you sure you want to delete your account?'}
        btn2TxtStyle={{ color: COLORS.white, fontSize: wp(4) }}
        btn2style={styles.modalBtn2}
        btn2Txt={'Confirm'}
        heading={'Delete'}
        btnsContainer={{
          flexDirection: 'row',
          // paddingHorizontal: wp(20),
          // marginTop: wp(8),
          // alignItems: 'center',
          justifyContent: 'center',
        }}
        headingTxtStyle={{ marginLeft: wp(1), marginTop: hp(1), color: 'red' }}


      />




    </View>
  );
};

export default MyProfile;


