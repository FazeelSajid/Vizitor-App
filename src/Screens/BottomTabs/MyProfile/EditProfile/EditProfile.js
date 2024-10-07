import { WithNetworkCheck } from '../../../../Utils/Utilities';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import React, { useCallback, useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { styles } from './Style';
import Edit from '../../../../assets/Svgs/edit.svg';
import UploadID from '../../../../assets/Svgs/uploadPhoto.svg';
import CaptureSelfie from '../../../../assets/Svgs/captureSelfie.svg';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import TxtInput from '../../../../Components/TxtInput/TxtInput';
import { COLORS } from '../../../../Constants/COLORS';
import CustomButton from '../../../../Components/Buttons/customButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CountryCodePicker from '../../../../Components/CountryPicker/CountryCodePicker';
import Model from '../../../../Components/Modal/Modal';
import {
  captureImageFromCamera,
  pickImageFromGallery,
} from '../../../../Utils/ImgePicker';
// import ImagePreview from './Components/ImagePreview';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { fonts } from '../../../../../assets/fonts/fonts';
import PopUp from '../../../../Components/NotifyPopUp/PopUp';
import Success from '../../../../assets/Svgs/success.svg';
import Warning from '../../../../assets/Svgs/Warning.svg';
import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { formatIncompletePhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';



const EditProfile = ({ navigation }) => {
  const [showPictureModal, setshowPictureModal] = useState(false);
  const [updateprofilePop, setUpdateprofilePopUp] = useState(false);
  const { setAppState, appState, PersistedAuth } = useAppStates()
  const { fetchApis } = useApis()
  const [key, setKey] = useState('id');
  const [isFirstName, setFirstName] = useState(false);
  const [isPhone, setPhone] = useState(false);
  const idFile = appState.idFile
  // const { ProfileDetails } = useApis()
  // const user = ProfileDetails.data

  // useEffect(() => {
  //   if (user) {
  //     setAppState({
  //       firstName: user.FirstName || '',
  //       lastName: user.LastName || '',
  //       emailId: user.EmailID || '',
  //       mobileNumber: user.MobileNumber || '',
  //       idFile: user.IdFile || '',
  //       Selfie: user.SelfieFile || '',
  //     });
  //     setFirstName( user.FirstName)
  //     setLastName(user.LastName)
  //     setMobile(user.MobileNumber)
  //   }
  // }, [user]);








  const handleSubmit = useCallback(async(appState) => {

    // Check if firstName or mobileNumber is empty/null
    if (!appState.firstName && !appState.mobileNumber) {
      setFirstName(true)
      setPhone(true)
      console.log(appState);
      
      
      return; // Stop execution if fields are invalid
    } else if (!appState.firstName) {
      setFirstName(true)
     
      
      return; // Stop execution if fields are invalid
    }
   else if (!appState.mobileNumber) {
      setPhone(true)
      
      return; // Stop execution if fields are invalid
    }
  
    setAppState({ isLoading: true });
  
    // WithNetworkCheck(async () => {
    //   setAppState({ isLoading: true });
      
      const data = {
        Data: {
          FirstName: appState.firstName,
          LastName: appState.lastName,
          EmailId: appState.emailId,
          MobileNumber: appState.mobileNumber,
          VizitrUserID: '',
        },
        DataObj: {},
        DataInt: {},
        DataFloat: {},
        ClientId: "89248",
        OrgId: "65",
        RoleId: "66",
        IsPlatform: false
      };
  
      // console.log(data.Data.FirstName, 'data');
  
      const formData = new FormData();
      {
        appState.idUri ?
          formData.append('IdFile', {
            uri: appState.idUri,
            type: 'image/jpeg',
            name: 'id.jpg',
          }) : formData.append('IdFile', appState.idFile);
      }
  
      formData.append('Request', JSON.stringify(data));
  
      const endPoint = '/api/common/VizitrUserProfile/Edit'
      const header =  {
        "Authorization": `Bearer ${PersistedAuth.authToken}`, // Ensure body has 'authToken'
        'Content-Type': 'multipart/form-data',
      }
        const response = await fetchApis(endPoint, header, formData, setAppState);
        // const response = await editProfile(formData, PersistedAuth.authToken, setAppState);
  
       
        
        if (response.Response.apiResponse.IsUpdated === true) {
          setAppState({
            isLoading: false,
            successPop: true,
            successPopMsg: 'Profile updated successfully',
          });
  
          setTimeout(() => {
            setAppState({
              successPop: false,
              successPopMsg: '',
              isLoading: false
            });
            navigation.goBack();
          }, 1000);
        }

    // }, setAppState);
  }, [appState.firstName, appState.mobileNumber, appState.Selfie, appState.idUri]);
  
  
console.log(appState.mobileNumber);


  
  return (
    <>
      {appState.errorPop && (
        <PopUp
          heading={appState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      {appState.successPop && (
        <PopUp
          heading={appState.successPopMsg}
          svg={<Success width={wp(8)} />}
          color={'#E7FFC5'}
          txtColor={'#0F4124'}
        />
      )}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
        keyboardShouldPersistTaps="handled"

      >
        <CustomHeader
          leftSvg={<ArrowLeft />}
          leftOnpress={() => navigation.goBack()}
          heading={'Edit Details'}
          headingStyle={styles.heading}
          containerStyle={{ alignItems: 'center', marginVertical: hp('3') }}
        />
        <View style={{ alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            setAppState({heading: 'Profile Picture'})
            navigation.navigate('ImagePreview', { key: 'selfie', image: appState.Selfie })}} >
            {
              appState.Selfie && <Image
                source={{ uri: appState.Selfie }}
                style={styles.profileImage}

              />
            }
          </TouchableOpacity>


          <CustomButton
            svg={<Edit />}
            containerStyle={styles.editBtnImagePrevie}
            pressedRadius={wp(100)}
            onPress={() => { 
              setKey('editSelfie')
              setshowPictureModal(true)
              
            }}
          />
        </View>

        <View style={styles.contentContainer}>


          <Text style={styles.inputTitle}>
            First Name
          </Text>
          <TxtInput
            containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
            value={appState.firstName} // Directly access the state here
            onChangeText={(value) => {
              setAppState({ firstName: value })


            }}
            inputStyle={styles.inputFilled}
            placeholder={'First name'}
            placeholderTextColor={COLORS.grayText2}
          />
          {isFirstName && <Text style={styles.errorText}>First name is required</Text>}

          <Text style={styles.inputTitle}>
            Last Name
          </Text>
          <TxtInput
            containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
            value={appState.lastName}
            onChangeText={(value) => {
              setAppState({ lastName: value })
            }}
            inputStyle={styles.inputFilled}
            placeholder={'Last name'}
            placeholderTextColor={COLORS.grayText2}
          />
          <Text style={styles.inputTitle}>
            Email ID
          </Text>

          <TxtInput
            containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
            value={appState.emailId} // Directly access authState for initial values
            inputStyle={[styles.inputFilled, { color: COLORS.grayText2, fontFamily: fonts.bold }]}
            editable={false} // Email is non-editable
          />

          <Text style={styles.inputTitle}>
            Phone no
          </Text>

          <TxtInput
            containerStyle={styles.TxtInput}
            value={appState.mobileNumber}
            onChangeText={(value) => {


              // const parsedPhoneNumber = parsePhoneNumberFromString(`+${appState.countryCode}${input}`, countryCode);

              const formattedNumber = formatIncompletePhoneNumber(value, appState.countrySign);
              
              
              
              
              setAppState({ mobileNumber: formattedNumber })
            }}
            inputStyle={styles.inputFilled}
            keyboardType={'number-pad'}
            svg={<CountryCodePicker setState={setAppState} state={appState} />}
          />
         {isPhone && <Text style={styles.errorText}>Phone no is required</Text>}


          {/*         
          <View style={{}} >
    <Image source={require('../../../../assets/Images/IdEditImage.png')} style={styles.ImagePreview} resizeMode='cover' />
    <CustomButton svg={<Edit/>} containerStyle={styles.editBtnImagePreview} onPress={()=> {
      setshowPictureModal(true)
    }} 
      pressedRadius={wp(10)}
      />

   </View>
         */}



          <View style={styles.uploadbtn} >
            <Text style={styles.upoadBtntext} >{idFile}</Text>
            <View style={{ marginLeft: wp(32), flexDirection: 'row' }} >
              <CustomButton text={'Change'} containerStyle={styles.changeBtn} textStyle={{ color: COLORS.secondry, fontSize: wp(3) }} onPress={() => {
                setKey('id')
                setshowPictureModal(true)}} />
              <CustomButton icon={'eye'} iconColor={COLORS.primary} iconSize={wp(6)} onPress={() => {
                setAppState({heading: 'ID Card'})
                navigation.navigate('ImagePreview', { key: 'idfile' })}} />
            </View>

          </View>

          <CustomButton
            containerStyle={styles.btn}
            text="Update"
            textStyle={styles.btnText}
            pressedRadius={wp(8)}
            isLoading={appState.isLoading}
            onPress={() => handleSubmit(appState)}
          />
        </View>

        <Model
          visible={showPictureModal}
          containerStyle={{ paddingBottom: hp(5) }}
          onClose={() => setshowPictureModal(false)}>
          <Text style={styles.modalText}>Upload ID</Text>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <View>
              <CustomButton
                containerStyle={styles.uploadbtnModal}
                svg={<UploadID />}
                onPress={() => {
                  setshowPictureModal(false);
                  pickImageFromGallery(setAppState, key, navigation);
                }}
                pressedRadius={wp(100)}
              />
              <Text style={styles.upoadBtntextModal}>Gallery</Text>
            </View>
            <View>
              <CustomButton
                containerStyle={styles.uploadbtnModal}
                svg={<CaptureSelfie />}
                onPress={() => {
                  setshowPictureModal(false);
                  captureImageFromCamera(setAppState, key, navigation);
                }}
                pressedRadius={wp(100)}
              />
              <Text style={styles.upoadBtntextModal}>Capture</Text>
            </View>
          </View>
        </Model>
      </ScrollView>
    </>

  );
};

export default EditProfile;
