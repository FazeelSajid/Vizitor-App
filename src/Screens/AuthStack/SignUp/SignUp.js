import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import {styles} from './Style';
import Logo from '../../../assets/Svgs/logo.svg';
import UploadID from '../../../assets/Svgs/uploadPhoto.svg';
 import Warning from '../../../assets/Svgs/Warning.svg';
 import Success from '../../../assets/Svgs/success.svg';
import CaptureSelfie from '../../../assets/Svgs/captureSelfie.svg';
import useAuthStates from '../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import TxtInput from '../../../Components/TxtInput/TxtInput';
import {COLORS} from '../../../Constants/COLORS';
import CustomButton from '../../../Components/Buttons/customButton';
import {Formik} from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useAuthApis from '../../../ReduxToolkit/Hooks/AuthHooks/ApiHooks/useAuthApis';
import PopUpModal from '../../../Components/PopupModal/PopUpModal';
import Loader from '../../../Components/Loader/loader';
import CountryCodePicker from '../../../Components/CountryPicker/CountryCodePicker';
import Model from '../../../Components/Modal/Modal';
import {ValidationItem} from './Components/ValidationItem';
import {
  pickImageFromGallery,
  captureImageFromCamera,
} from '../../../Utils/ImgePicker';
import ImagePreview from './Components/ImagePreview';
import {fonts} from '../../../../assets/fonts/fonts';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import CountryPickerBtmSheet from './Components/CountryPickerBtmSheet';
import { WithNetworkCheck} from '../../../Utils/Utilities';
import PopUp from '../../../Components/NotifyPopUp/PopUp';

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .matches(/^[a-zA-Z]+$/, 'First name can only contain letters'),

    email: Yup.string()
    .email('Invalid email address') // Standard email validation
    .required('Email is required') // Required field
    .matches(/^[\w-\.]+@([\w-]+\.)+com$/, 'Invalid email address'), 

  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'At least one lowercase letter')
    .matches(/[A-Z]/, 'At least one uppercase letter')
    .matches(/\d/, 'At least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'At least one special character'),

  phoneNumber: Yup.string().required('Phone number is required'),

  // idImg: Yup.string().required('ID image is required'),

  // selfie: Yup.string().required('Selfie image is required'),
});
const SignUp = ({navigation}) => {
  const {setAuthState, authState} = useAuthStates();
  const { authFunc} = useAuthApis();
  // const [isLoading, setIsLoading] = useState();
  const [showPictureModal, setshowPictureModal] = useState(false);
  const [password, setPassword] = useState('');
  const bottomSheetRef = useRef();
  // const [show, setShow] = useState(false);
  // const [countryCode, setCountryCode] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [isSelfie, setIsSelfie] = useState(false);
  const [isIdImg, setIsIdImg] = useState(false);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  // console.log(authState.Selfie);

  // Password criteria checks
  const checkLowercase = /[a-z]/.test(password);
  const checkUppercase = /[A-Z]/.test(password);
  const checkNumber = /\d/.test(password);
  const checkSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const checkMinLength = password.length >= 8;

  useEffect(() => {
    setAuthState({
      password: '',
    });


      return () => {
        setAuthState({
          isLoading: false,
        })
      };
 
  }, []);

  // console.log(authState.countryCode);,

  const handleSubmit = useCallback(
   
    async values => {
      if (authState.Selfie === null && authState.IdImage === null) {
        setIsSelfie(true);
        setIsIdImg(true);
        return;
      } else if (authState.IdImage === null) {
        setIsIdImg(true);
        return;
      } else if (authState.Selfie === null) {
        setIsSelfie(true);
        return;
      }
      setAuthState({email: values.email, isLoading: true});

      // await WithNetworkCheck(async () => {
        setAuthState({isLoading: true});
        const data = {
          Data: {
            FirstName: values.firstName,
            LastName: values.lastName,
            EmailId: values.email,
            MobileNumber: values.phoneNumber,
            Password: values.password,
            SelfieFile: authState.base64Selfie,
          },
          OrgId: '65',
          ClientId: '89248',
          IsPlatform: false,
        };
        const formData = new FormData();
        formData.append('IdFile', {
          uri: authState.idUri,
          type: 'image/jpeg',
          name: 'id.jpg',
        });
      
        
        formData.append('Request', JSON.stringify(data));

        const endPoint = '/api/public/full/UserSelfRegister/AddNewUser'
        const header = {
              'Content-Type': 'multipart/form-data',
        }

          const response = await authFunc(endPoint, header, formData, setAuthState);
          setAuthState({
            isLoading: true
          })
          if (response) {
            if (response.Response.apiResponse.IsSuccess === true) {
              setAuthState({
                isLoading: false,
                successPop: true,
                successPopMsg: 'Account created successfully',
              })
              setTimeout(() => {
                setAuthState({            
                  successPop: false,
                  successPopMsg:'',
                })
                navigation.navigate('SignIn');
  
              }, 1000);
            }
            else if (response.Response.apiResponse.IsSuccess === false) {
              setAuthState({
                isLoading: false,
                errorPopMsg: response.Response.apiResponse.Message,
                errorPop: true
              })
              setTimeout(() => {
                setAuthState({            
                  errorPopMsg: '',
                errorPop: false
                })
                
              }, 1000);
      
            }
          }
         
       
      // }, setAuthState);
    },
    [authState.Selfie, authState.IdImage],
  );

  return (
    <BottomSheetModalProvider>
      {authState.errorPop && (
        <PopUp
          heading={authState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      {authState.successPop && (
        <PopUp
          heading={authState.successPopMsg}
          svg={<Success width={wp(8)} />}
          color={'#E7FFC5'}
          txtColor={'#0F4124'}
        />
      )}
      <View style={styles.container}>
      
    
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}
        scrollEnabled
        keyboardShouldPersistTaps="handled">
        <View style={styles.contentContainer}>
          <Logo />
          <Text style={styles.heading}>Create your account</Text>
        </View>

        <Formik
          initialValues={{
            email: authState.email,
            password: authState.password,
            firstName: '',
            lastName: '',
            phoneNumber: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
            setFieldValue,
          }) => (
            <View style={{flexGrow: 1}}>
              <Text style={styles.inputTitle}>
                Email ID <Text style={{color: 'red'}}>*</Text>
              </Text>

              <TxtInput
                containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                inputStyle={[
                  styles.inputFilled,
                  {color: COLORS.grayText2, fontFamily: fonts.medium},
                ]}
                error={
                  touched.email &&
                  errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )
                }
                placeholder={'Email address'}
                placeholderTextColor={COLORS.grayText2}
                editable={false}
              />
              <Text style={styles.inputTitle}>
                Password <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TxtInput
                containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.password}
                onChangeText={text => {
                  setPassword(text); // Update password state
                  handleChange('password')(text); // Notify Formik about the change
                }}
                onBlur={handleBlur('password')}
                inputStyle={styles.inputFilled}
                error={
                  touched.password &&
                  errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )
                }
                placeholder={'Password'}
                placeholderTextColor={COLORS.grayText2}
                secureTextEntry={true}
              />
              {values.password.length > 0 && (
                <View style={styles.validationContainer}>
                  <ValidationItem
                    isValid={checkLowercase}
                    label="At least one lowercase letter"
                  />
                  <ValidationItem
                    isValid={checkUppercase}
                    label="At least one uppercase letter"
                  />
                  <ValidationItem
                    isValid={checkNumber}
                    label="At least one number"
                  />
                  <ValidationItem
                    isValid={checkSpecialChar}
                    label="At least one special character"
                  />
                  <ValidationItem
                    isValid={checkMinLength}
                    label="At least 8 characters"
                  />
                </View>
              )}

              <Text style={styles.inputTitle}>
                First Name <Text style={{color: 'red'}}>*</Text>
              </Text>
              <TxtInput
                containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                inputStyle={styles.inputFilled}
                error={
                  touched.firstName &&
                  errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )
                }
                placeholder={'First name'}
                placeholderTextColor={COLORS.grayText2}
              />
              <Text style={styles.inputTitle}>Last Name</Text>
              <TxtInput
                containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                inputStyle={styles.inputFilled}
                error={
                  touched.lastName &&
                  errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )
                }
                placeholder={'Last name'}
                placeholderTextColor={COLORS.grayText2}
              />
              <Text style={styles.inputTitle}>
                Phone no <Text style={{color: 'red'}}>*</Text>
              </Text>

              <TxtInput
                containerStyle={styles.TxtInput}
                value={values.phoneNumber}
                onChangeText={handleChange('phoneNumber')}
                onBlur={handleBlur('phoneNumber')}
                inputStyle={[styles.inputFilled]}
                error={
                  touched.phoneNumber &&
                  errors.phoneNumber && (
                    <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                  )
                }
                keyboardType={'number-pad'}
                svg={<CountryCodePicker setState={setAuthState} state={authState} />}
              />

              {authState.IdImage ? (
                <ImagePreview image={authState.IdImage} keyy={'id'} />
              ) : (
                <CustomButton
                  containerStyle={styles.uploadbtn}
                  svg={<UploadID />}
                  text={'Upoad ID'}
                  textStyle={styles.upoadBtntext}
                  onPress={() => setshowPictureModal(true)}
                />
              )}
              {isIdImg && (
                <Text style={styles.errorText}>ID Image Is required</Text>
              )}
              {authState.Selfie ? (
                <ImagePreview image={authState.selfieUri} keyy={'selfie'} />
              ) : (
                <CustomButton
                  containerStyle={styles.uploadbtn}
                  svg={<CaptureSelfie />}
                  text={'Capture Selfie'}
                  textStyle={styles.upoadBtntext}
                  onPress={() =>
                    captureImageFromCamera(setAuthState, 'selfie', navigation)
                  }
                />
              )}
              {isSelfie && (
                <Text style={styles.errorText}>Selfie Is required</Text>
              )}

              <CustomButton
                containerStyle={styles.btn}
                text="Register"
                textStyle={styles.btnText}
                onPress={handleSubmit} // Formik's submit handler
                pressedRadius={wp(8)}
                isLoading={authState.isLoading}
              />
            </View>
          )}
        </Formik>

        <Model
          visible={showPictureModal}
          containerStyle={{paddingBottom: hp(5)}}
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
                  pickImageFromGallery(setAuthState, 'id', navigation);
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
                  captureImageFromCamera(setAuthState, 'id', navigation);
                }}
                pressedRadius={wp(100)}
              />
              <Text style={styles.upoadBtntextModal}>Capture</Text>
            </View>
          </View>
        </Model>
        <CountryPickerBtmSheet bottomSheetRef={bottomSheetRef} />
      </ScrollView>
      </View>
    </BottomSheetModalProvider>
  );
};

export default SignUp;
