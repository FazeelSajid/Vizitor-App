import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
} from 'react-native';
import {styles} from './Style';
import Logo from '../../../assets/Svgs/logo.svg';
import Warning from '../../../assets/Svgs/Warning.svg';
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
import {WithNetworkCheck} from '../../../Utils/Utilities';
import PopUp from '../../../Components/NotifyPopUp/PopUp';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[\w-\.]+@([\w-]+\.)+com$/, 'Invalid email address'), 
});

const CreateAcc = ({navigation}) => {
  const {setAuthState, authState} = useAuthStates();
  const {authFunc, UserExistOrNot} = useAuthApis();

  useEffect(() => {

    return () => {
      setAuthState({
        isLoading: false,
      })
    };
  }, [])
  const handleSubmit = async values => {
    // try {
      setAuthState({email: values.email, isLoading: true});

      // Network check before dispatching API call
      // await WithNetworkCheck(async () => {

        setAuthState({
          isLoading: true,
        })
        const data = {
          Data: {
            EmailId: values.email,
          },
          IsPlatform: false,
          OrgId: '65',
          ClientId: '89248',
        };

        const endPoint = '/api/public/UserSelfRegister/UserExistOrNot'
        const header = {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
      }
  
          const response = await authFunc(endPoint, header, JSON.stringify(data), setAuthState);

          if (response) {
            
            if (response.Response.apiResponse.IsSuccess === true) {
              setAuthState({isLoading: false, showPopUpModal: true});

              setTimeout(() => {
                setAuthState({showPopUpModal: false});

                navigation.navigate('SignIn');
              }, 1000);
            } else {
              setAuthState({showPopUpModal: false, isLoading: false});
              navigation.navigate('SignUp');
            }
          }

       
      // }, setAuthState);
    // } catch (error) {
    //   setAuthState({isLoading: false});
    //   console.error('Error in handleSubmit:', error);
    // }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      {authState.showPopUpModal && (
        <PopUpModal
          containerStyle={{}}
          heading={'Account Exist'}
          message={'You will be redirected to login page shortly'}>
          <Loader color={COLORS.primary} />
        </PopUpModal>
      )}
      {authState.errorPop && (
        <PopUp
          heading={authState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}

      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Logo />
          <Text style={styles.heading}>Create your account</Text>
        </View>

        <Formik
          initialValues={{email: ''}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            handleBlur,
          }) => (
            <>
              <Text style={styles.inputTitle}>
                Email ID <Text style={{color: 'red'}}>*</Text>
              </Text>

              <TxtInput
                containerStyle={[styles.TxtInput, Platform.OS === 'ios' && {height: hp(5.4) }]}
                value={values.email}
                onChangeText={handleChange('email')}
                // onBlur={handleBlur('email')}
                inputStyle={styles.inputFilled}
                error={
                  touched.email &&
                  errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )
                }
                placeholder={'Email address'}
                placeholderTextColor={COLORS.grayText}

              />
              <View style={styles.btnContainer}>
                <CustomButton
                  containerStyle={styles.btn}
                  text="Submit"
                  textStyle={styles.btnText}
                  onPress={handleSubmit} // Formik's submit handler
                  pressedRadius={wp(8)}
                  isLoading={authState.isLoading}
                />
              </View>
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CreateAcc;
