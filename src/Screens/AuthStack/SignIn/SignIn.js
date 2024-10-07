import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { styles } from './Style';
import Logo from '../../../assets/Svgs/logo.svg';
import Warning from '../../../assets/Svgs/Warning.svg';
import Success from '../../../assets/Svgs/success.svg';
import useAuthStates from '../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import TxtInput from '../../../Components/TxtInput/TxtInput';
import { COLORS } from '../../../Constants/COLORS';
import CustomButton from '../../../Components/Buttons/customButton';
import { Formik } from 'formik';
import * as Yup from 'yup'; // Import Yup for validation
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import useAuthApis from '../../../ReduxToolkit/Hooks/AuthHooks/ApiHooks/useAuthApis';
import { fonts } from '../../../../assets/fonts/fonts';
import { WithNetworkCheck } from '../../../Utils/Utilities';
import PopUp from '../../../Components/NotifyPopUp/PopUp';
import { signin } from '../../../ReduxToolkit/Slices/ApiSlices/AuthApis/SignInSlice/SignInSlice';
import { useDispatch } from 'react-redux';
import useAppStates from '../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';

// Email validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
});

const SignIn = ({ navigation }) => {
  const { setAuthState, authState } = useAuthStates();
  const { authFunc} = useAuthApis();
  const {setPersistedAuths } = useAppStates();



  useEffect(() => {

    return () => {
      setAuthState({
        isLoading: false,
      })
    };
  }, [])

  const handleSubmit = async values => {
    setAuthState({ email: values.email });

    // await WithNetworkCheck(async () => {
      const data = {
        LoginId: values.email,
        Password: values.password,
        AppType: 'Portal',
        OrgId: '65',
        ClientId: '89248',
      };

      setAuthState({ isLoading: true });

      // console.log(authState.isLoading, 'isloading sign in screen');

      const endPoint = '/api/authentication/signin'
      const header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }

        const response = await authFunc(endPoint, header, JSON.stringify(data), setAuthState);
      // console.log(response);

      if (response) {
        
      if (response.LoginStatus === 'Active') {
        setAuthState({
          // authToken: response.AuthToken,
          successPop: true,
          successPopMsg: 'Logged in Successfully',
        });
        setPersistedAuths({
          authToken: response.AuthToken,
          email: values.email,
          
        });

        setTimeout(() => {
          setAuthState({
            successPop: false,
            successPopMsg: '',
            email: '',
            password: '',
            isAuthenticated: true,
            isLoading: false,
          });
        }, 1000);
      }
      }

    // }, setAuthState);
  };

  return (
    <>
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
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.contentContainer}>
          <Logo />
          <Text style={styles.heading}>Login to your account</Text>
        </View>

        <Formik
          initialValues={{ email: authState.email, password: authState.password }}
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
                Email ID <Text style={{ color: 'red' }}>*</Text>
              </Text>

              <TxtInput
                containerStyle={[styles.TxtInput , Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                inputStyle={styles.inputFilled}
                error={
                  touched.email &&
                  errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )
                }
                placeholder={'Enter your email address'}
                placeholderTextColor={COLORS.grayText2}
              />
              <Text style={styles.inputTitle}>
                Password <Text style={{ color: 'red' }}>*</Text>
              </Text>
              <TxtInput
                containerStyle={[styles.TxtInput , Platform.OS === 'ios' && {height: hp(5.4)}]}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                inputStyle={styles.inputFilled}
                error={
                  touched.password &&
                  errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )
                }
                placeholder={'Enter your password'}
                placeholderTextColor={COLORS.grayText2}
                secureTextEntry={true}
              />
              <View style={styles.btnContainer}>
                <CustomButton
                  containerStyle={[styles.btn, { marginTop: wp(10) }]}
                  text="Login"
                  textStyle={styles.btnText}
                  onPress={handleSubmit} // Formik's submit handler
                  pressedRadius={wp(8)}
                  isLoading={authState.isLoading} // Use loading state here
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    marginTop: hp(1),
                  }}>
                  <Text style={{ color: COLORS.black, textAlign: 'center' }}>
                    Don't have an account?
                  </Text>
                  <CustomButton
                    text={' Register'}
                    textStyle={{
                      color: COLORS.secondry,
                      fontFamily: fonts.medium,
                    }}
                    onPress={() => navigation.navigate('SignUp')}
                  />
                </View>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default SignIn;
