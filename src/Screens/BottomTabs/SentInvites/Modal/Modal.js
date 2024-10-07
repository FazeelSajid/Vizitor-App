import {
  Modal,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {styles} from './Styles';
import CustomButton from '../../../../Components/Buttons/customButton';
import CrossIcon from '../../../../assets/Svgs/crossIcon.svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Formik} from 'formik';
import * as Yup from 'yup';
import TxtInput from '../../../../Components/TxtInput/TxtInput';
import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import Location from './LocationBottomSheet/LocationBtmSheet';
import ArrowDown from '../../../../assets/Svgs/dropDownArrowDown.svg';
import Clock from '../../../../assets/Svgs/Clock.svg';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import WindowArrivalBtmSheet from './WindowArrivalBottomSheet/WindowArrivalBtmSheet';
import {GetConfiguration} from '../../../../ReduxToolkit/Slices/ApiSlices/AppApis/GetConfiguration/getConfiguration';
import {useDispatch} from 'react-redux';
import useAuthApis from '../../../../ReduxToolkit/Hooks/AuthHooks/ApiHooks/useAuthApis';
import PurposeListBottomSheet from './PurposeListBottomSheet/PurposeListBottomSheet';
import Loader from '../../../../Components/Loader/loader';
import {COLORS} from '../../../../Constants/COLORS';
import Calender from './Calender/Calender';
import TimeInput from './time/TimeInput';
import { data, windowList } from '../../../../Utils/DummyData';

const validationSchemaGeneral = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  dateFrom: Yup.date().required('Date from is required'),
  timeFrom: Yup.string().required('Time from is required'),
  dateTo: Yup.date().required('Date to is required'),
  timeTo: Yup.string().required('Time to is required'),
  arrivalWindow: Yup.string().required('Arrival window is required'),
});
const validationSchemaPurpose = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  dateFrom: Yup.date().required('Date from is required'),
  timeFrom: Yup.string().required('Time from is required'),
  dateTo: Yup.date().required('Date to is required'),
  timeTo: Yup.string().required('Time to is required'),
  arrivalWindow: Yup.string().required('Arrival window is required'),
  purpose: Yup.string().required('Purpose is required'),
});
const validationSchemaTitle = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  dateFrom: Yup.date().required('Date from is required'),
  timeFrom: Yup.string().required('Time from is required'),
  dateTo: Yup.date().required('Date to is required'),
  timeTo: Yup.string().required('Time to is required'),
  arrivalWindow: Yup.string().required('Arrival window is required'),
  title: Yup.string().required('Title is required'),
});
const validationSchemaBoth = Yup.object().shape({
  email: Yup.string().email('Invalid Email').required('Email is required'),
  location: Yup.string().required('Location is required'),
  dateFrom: Yup.date().required('Date from is required'),
  timeFrom: Yup.string().required('Time from is required'),
  dateTo: Yup.date().required('Date to is required'),
  timeTo: Yup.string().required('Time to is required'),
  arrivalWindow: Yup.string().required('Arrival window is required'),
  purpose: Yup.string().required('Purpose is required'),
  title: Yup.string().required('Title is required'),
});

const Modaal = ({isVisible, onClose, selectedLocation}) => {
  const {
    hostActiveLocation,
    windowTimeList,
    getPurposeList,
    getPurposeListState,
  } = useApis();

  const [isLoading, setIsLoading] = useState(false);
  const [isTittle, setIsTittle] = useState(false);
  const [isPurpose, setIsPurpose] = useState(false);
  const dispatch = useDispatch();
  const {signinState} = useAuthApis();
  const purposeValues = {
    email: '',
    location: '',
    dateFrom: '',
    timeFrom: '',
    dateTo: '',
    timeTo: '',
    arrivalWindow: '',
    purpose: '',
  };

  const titleValues = {
    email: '',
    location: '',
    dateFrom: '',
    timeFrom: '',
    dateTo: '',
    timeTo: '',
    arrivalWindow: '',
    title: '',
  };

  const bothValues = {
    email: '',
    location: '',
    dateFrom: '',
    timeFrom: '',
    dateTo: '',
    timeTo: '',
    arrivalWindow: '',
    purpose: '',
    title: '',
  };
  const generalValues = {
    email: '',
    location: '',
    dateFrom: '',
    timeFrom: '',
    dateTo: '',
    timeTo: '',
    arrivalWindow: '',
  };

  const locationBottomSheetRef = useRef();
  const arrivalWindowBottomSheetRef = useRef();
  const PurposeListBottomSheetRef = useRef();
  const dateFromCalenderRef = useRef();
  const dateToCalenderRef = useRef();
  const timeToSheetRef = useRef();
  const timeFromSheetRef = useRef();

  const [selectLocation, setSelectedLocation] = useState(selectedLocation);
  const [arrivalWindow, setArrivalWindow] = useState(null);
  const [purpose, setPurpose] = useState(null);

  const handlePresentModalPress = useCallback(() => {
    locationBottomSheetRef.current?.present();
  }, []);
  const handleWindowArrivalPresentModalPress = useCallback(() => {
    arrivalWindowBottomSheetRef.current?.present();
  }, []);
  const handlePurposeListPresentModalPress = useCallback(() => {
    PurposeListBottomSheetRef.current?.present();
  }, []);
  const dateFromCalenderPresent = useCallback(() => {
    dateFromCalenderRef.current?.present();
  }, []);
  const dateToCalenderPresent = useCallback(() => {
    dateToCalenderRef.current?.present();
  }, []);
  const timeToBtmSheetPresent = useCallback(() => {
    timeToSheetRef.current?.present();
  }, []);
  const timeFromBtmSheetPresent = useCallback(() => {
    timeFromSheetRef.current?.present();
  }, []);

  useEffect(() => {
    if (selectLocation) {
      handleConfigurationChange(selectLocation.BranchId);
      // setselectLocation(selectLocation)
    }
    // console.log(selectLocation, 'modaal');
  }, [selectLocation]);

  const handleConfigurationChange = async value => {
    try {
      setIsLoading(true); // Set loading before dispatching the action

      const action = await dispatch(
        GetConfiguration({authToken: signinState.authToken, BranchID: value}),
      );

      if (action.meta.requestStatus === 'fulfilled') {
        const config = action.payload.Response.apiResponse[0];

        // Determine which fields to reset based on config
        const resetValues = {
          email: '',
          location: '',
          dateFrom: '',
          timeFrom: '',
          dateTo: '',
          timeTo: '',
          arrivalWindow: '',
          purpose: '',
        };

        if (config.TitleRequired === 1 && config.PurposeRequired === 1) {
          await getPurposeList({
            authToken: signinState.authToken,
            BranchID: value,
          });
          setIsTittle(true);
          setIsPurpose(true);
        } else if (config.TitleRequired === 1) {
          setIsTittle(true);
          setIsPurpose(false);
        } else if (config.PurposeRequired === 1) {
          await getPurposeList({
            authToken: signinState.authToken,
            BranchID: value,
          });
          setIsTittle(false);
          setIsPurpose(true);
        } else {
          setIsTittle(false);
          setIsPurpose(false);
        }

        // Call resetForm to reset the form values
        // resetForm({values: resetValues});
      } else {
        console.error('Failed to fetch configuration');
      }
    } catch (error) {
      console.error('Error in configuration change:', error);
    } finally {
      setIsLoading(false); // Always set loading to false after the operation
    }
  };
  // console.log(getPurposeListState);

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} />
      <BottomSheetModalProvider>
        <View style={styles.modalOverlay}>
          {isLoading ? (
            <View style={styles.LoaderContainer}>
              <Loader size={wp(10)} color={COLORS.primary} />
            </View>
          ) : (
            // <View>
            <ScrollView style={styles.container}>
              <View style={styles.headingContainer}>
                <Text style={styles.heading}>Create Visit</Text>
                <CustomButton
                  svg={<CrossIcon width={wp(7)} />}
                  containerStyle={{alignSelf: 'flex-end'}}
                  onPress={onClose}
                />
              </View>

              <Text style={styles.SectionHeading}>Visitor Details</Text>

              <Formik
                initialValues={
                  isTittle
                    ? titleValues
                    : isPurpose
                    ? purposeValues
                    : isPurpose && isTittle
                    ? bothValues
                    : generalValues
                }
                validationSchema={
                  isTittle
                    ? validationSchemaTitle
                    : isPurpose
                    ? validationSchemaPurpose
                    : isPurpose && isTittle
                    ? validationSchemaBoth
                    : validationSchemaGeneral
                }
                onSubmit={values => {
                  console.log(values);
                }}>
                {({
                  handleChange,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                  setFieldValue,
                  handleBlur,
                  resetForm,
                }) => (
                  <>
                    <Text style={styles.inputTitle}>
                      Email ID <Text style={{color: 'red'}}>*</Text>
                    </Text>

                    <TxtInput
                      containerStyle={styles.TxtInput}
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
                      placeholder={'Email'}
                      placeholderTextColor={COLORS.grayText}
                    />
                    {/* <TouchableOpacity
                      style={styles.dropDownContainer}
                      onPress={handlePresentModalPress}>
                      {selectLocation ? (
                        <Text style={styles.dropDownText}>
                          {selectLocation.CompanyWithBranch}
                        </Text>
                      ) : (
                        <Text style={[styles.dropDownText]}>
                          {selectedLocation.CompanyWithBranch}
                          <Text style={{color: 'red'}}>*</Text>
                        </Text>
                      )}

                      <ArrowDown />
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      style={styles.dropDownContainer}
                      onPress={handlePresentModalPress}>
              
                        <Text style={styles.dropDownText}>
                         Location 
                        </Text>
                     

                      <ArrowDown />
                    </TouchableOpacity>
                    {touched.location && errors.location && (
                      <Text style={styles.errorText}>{errors.location}</Text>
                    )}

                    <Text style={styles.SectionHeading}>Visiting Details</Text>

                    {/* {isTittle && ( */}
                      <View>
                        <Text style={styles.inputTitle}>
                          Title <Text style={{color: 'red'}}>*</Text>
                        </Text>

                        <TxtInput
                          containerStyle={styles.TxtInput}
                          value={values.title}
                          onChangeText={handleChange('title')}
                          onBlur={handleBlur('title')}
                          inputStyle={styles.inputFilled}
                          error={
                            touched.title &&
                            errors.title && (
                              <Text style={styles.errorText}>
                                {errors.title}
                              </Text>
                            )
                          }
                          placeholder={'Title'}
                          placeholderTextColor={COLORS.grayText}
                        />
                      </View>
                    {/* )} */}
                    {isPurpose && getPurposeListState.data && (
                      <>
                        <TouchableOpacity
                          style={[styles.dropDownContainer]}
                          onPress={handlePurposeListPresentModalPress}>
                          {values.purpose.length ? (
                            <Text style={styles.dropDownText}>
                              {purpose.Purpose}
                            </Text>
                          ) : (
                            <Text style={[styles.dropDownText]}>
                              Purpose <Text style={{color: 'red'}}>*</Text>
                            </Text>
                          )}
                          <ArrowDown />
                        </TouchableOpacity>
                        {console.log(errors.purpose)}
                        <Text style={styles.errorText}>{errors.purpose}</Text>
                        {touched.purpose && errors.purpose && (
                          <Text style={styles.errorText}>{errors.purpose}</Text>
                        )}
                      </>
                    )}

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: hp(4),
                      }}>
                      <View>
                        <TouchableOpacity
                          style={[styles.DateContainer]}
                          onPress={dateFromCalenderPresent}>
                          <Text
                            style={[styles.dropDownText, {marginRight: wp(4)}]}>
                            Date from <Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <ArrowDown />
                        </TouchableOpacity>
                        {touched.dateFrom && errors.dateFrom && (
                          <Text style={styles.errorText}>
                            {errors.dateFrom}
                          </Text>
                        )}
                      </View>

                      <Text style={[styles.dropDownText]}>
                        Time <Text style={{color: 'red'}}>*</Text>
                      </Text>
                      <View>
                        <TouchableOpacity style={styles.DateContainer} onPress={timeFromBtmSheetPresent} >
                          <Text
                            style={[styles.dropDownText, {marginRight: wp(6)}]}>
                            --:-- -- <Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <Clock />
                        </TouchableOpacity>
                        {touched.timeFrom && errors.timeFrom && (
                          <Text style={styles.errorText}>
                            {errors.timeFrom}
                          </Text>
                        )}
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: hp(4),
                      }}>
                      <View>
                        <TouchableOpacity
                          style={[styles.DateContainer]}
                          onPress={dateToCalenderPresent}>
                          <Text
                            style={[styles.dropDownText, {marginRight: wp(8)}]}>
                            Date to <Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <ArrowDown />
                        </TouchableOpacity>
                        {touched.dateTo && errors.dateTo && (
                          <Text style={styles.errorText}>{errors.dateTo}</Text>
                        )}
                      </View>

                      <Text style={[styles.dropDownText]}>
                        Time <Text style={{color: 'red'}}>*</Text>
                      </Text>

                      <View>
                        <TouchableOpacity style={styles.DateContainer} onPress={timeToBtmSheetPresent}>
                          <Text
                            style={[styles.dropDownText, {marginRight: wp(6)}]}>
                            --:-- -- <Text style={{color: 'red'}}>*</Text>
                          </Text>
                          <Clock />
                        </TouchableOpacity>
                        {touched.timeTo && errors.timeTo && (
                          <Text style={styles.errorText}>{errors.timeTo}</Text>
                        )}
                      </View>
                    </View>

                    <TouchableOpacity
                      style={styles.dropDownContainer}
                      onPress={handleWindowArrivalPresentModalPress}>
                      {values.arrivalWindow.length ? (
                        <Text style={styles.dropDownText}>
                          {values.arrivalWindow}
                        </Text>
                      ) : (
                        <Text style={[styles.dropDownText]}>
                          Arrival Time Window before start (mins){' '}
                          <Text style={{color: 'red'}}>*</Text>
                        </Text>
                      )}
                      <ArrowDown />
                    </TouchableOpacity>
                    {touched.arrivalWindow && errors.arrivalWindow && (
                      <Text style={styles.errorText}>
                        {errors.arrivalWindow}
                      </Text>
                    )}

                    <CustomButton
                      containerStyle={styles.btn}
                      text="Create"
                      textStyle={styles.btnText}
                      onPress={handleSubmit}
                      pressedRadius={wp(8)}
                      // isLoading={isLoading}
                    />

                    {/* {getPurposeListState.data && isPurpose && (
                      <PurposeListBottomSheet
                        data={getPurposeListState.data}
                        bottomSheetRef={PurposeListBottomSheetRef}
                        setSelected={setPurpose}
                        setFieldValue={setFieldValue}
                        selectedLocation={values.purpose}
                      />
                    )} */}
                    {getPurposeListState.data && isPurpose && (
                      <PurposeListBottomSheet
                        data={getPurposeListState.data}
                        bottomSheetRef={PurposeListBottomSheetRef}
                        setSelected={setPurpose}
                        setFieldValue={setFieldValue}
                        selectedLocation={values.purpose}
                      />
                    )}
                      <WindowArrivalBtmSheet
                        data={windowList}
                        bottomSheetRef={arrivalWindowBottomSheetRef}
                        setSelected={setArrivalWindow}
                        setFieldValue={setFieldValue}
                        selectedLocation={arrivalWindow}
                      />
          
                    {/* {windowTimeList.data && (
                      <WindowArrivalBtmSheet
                        data={windowTimeList.data}
                        bottomSheetRef={arrivalWindowBottomSheetRef}
                        setSelected={setArrivalWindow}
                        setFieldValue={setFieldValue}
                        selectedLocation={arrivalWindow}
                      />
                    )} */}

                    {/* {hostActiveLocation.data && (
                      <Location
                        location={hostActiveLocation.data}
                        bottomSheetRef={locationBottomSheetRef}
                        setSelected={setSelectedLocation}
                        setFieldValue={setFieldValue}
                        selectedLocation={selectLocation}
                      />
                    )} */}

                   
                      <Location
                        location={data}
                        bottomSheetRef={locationBottomSheetRef}
                        setSelected={setSelectedLocation}
                        setFieldValue={setFieldValue}
                        selectedLocation={selectLocation}
                      />
          
                    <Calender
                      bottomSheetRef={dateFromCalenderRef}
                      setFieldValue={setFieldValue}
                      field={'dateFrom'}
                      heading={'Date To'}
                    />
                    <Calender
                      bottomSheetRef={dateToCalenderRef}
                      setFieldValue={setFieldValue}
                      field={'dateTo'}
                      heading={'Date From'}
                    />
                    <TimeInput bottomSheetRef={timeFromSheetRef} field={'timeFrom'} heading={'Time From'} setFieldValue={setFieldValue}  />
                    <TimeInput bottomSheetRef={timeToSheetRef}  field={'timeTo'} heading={'Time To'} setFieldValue={setFieldValue} />
                  </>
                )}
              </Formik>
            </ScrollView>
            // </View>
          )}
        </View>
      </BottomSheetModalProvider>
    </Modal>
  );
};

export default Modaal;
