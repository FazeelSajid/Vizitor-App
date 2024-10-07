import {
    Modal,
    ScrollView,
    StatusBar,
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
  import TxtInput from '../../../../Components/TxtInput/TxtInput';
  import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
  import Location from './LocationBottomSheet/LocationBtmSheet';
  import ArrowDown from '../../../../assets/Svgs/dropDownArrowDown.svg';
  import Clock from '../../../../assets/Svgs/Clock.svg';
  import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
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
  import {data, windowList} from '../../../../Utils/DummyData';
  import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
  import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
  
  const AddInvite = ({navigation}) => {
    const {
      hostActiveLocation,
      windowTimeList,
      getPurposeList,
      getPurposeListState,
    } = useApis();
  
    const [isLoading, setIsLoading] = useState(false);
    const [isTittle, setIsTittle] = useState(false);
    const [isPurpose, setIsPurpose] = useState(false);
    const [selectedPurpose, setSelectedPurpose] = useState();
    const dispatch = useDispatch();
    const {appState} = useAppStates();
  
    const [formValues, setFormValues] = useState({
      email: '',
      location: '',
      dateFrom: '',
      timeFrom: '',
      dateTo: '',
      timeTo: '',
      arrivalWindow: '',
      purpose: '',
      title: '',
    });
  
    const [formErrors, setFormErrors] = useState({});
  
    const locationBottomSheetRef = useRef();
    const arrivalWindowBottomSheetRef = useRef();
    const PurposeListBottomSheetRef = useRef();
    const dateFromCalenderRef = useRef();
    const dateToCalenderRef = useRef();
    const timeToSheetRef = useRef();
    const timeFromSheetRef = useRef();
  
    const [selectLocation, setSelectedLocation] = useState();
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
      if (hostActiveLocation?.data?.length) {
        setSelectedLocation(hostActiveLocation.data[0]);
      }
    }, [hostActiveLocation]);
  
    useEffect(() => {
      if (selectLocation) {
        handleConfigurationChange(selectLocation.BranchId);
      }
    }, [selectLocation, appState.authToken]);
  
    const handleConfigurationChange = async value => {
      try {
        setIsLoading(true); // Set loading before dispatching the action
        dispatch(
          GetConfiguration({authToken: appState.authToken, BranchID: value}),
        ).then(action => {
          if (action.meta.requestStatus === 'fulfilled') {
            const config = action.payload.Response.apiResponse[0];
            if (config.TitleRequired === 1 && config.PurposeRequired === 1) {
              getPurposeList({
                authToken: appState.authToken,
                BranchID: value,
              });
              setSelectedPurpose(getPurposeListState.data[0]);
              setIsTittle(true);
              setIsPurpose(true);
            } else if (config.TitleRequired === 1) {
              setIsTittle(true);
              setIsPurpose(false);
            } else if (config.PurposeRequired === 1) {
              getPurposeList({
                authToken: appState.authToken,
                BranchID: value,
              });
              setIsTittle(false);
              setIsPurpose(true);
            } else {
              setIsTittle(false);
              setIsPurpose(false);
            }
          } else if (action.meta.requestStatus === 'rejected') {
            console.error('Failed to fetch configuration');
          }
        });
      } catch (error) {
        console.error('Error in configuration change:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    const validateForm = () => {
      let errors = {};
  
      if (!formValues.email) {
        errors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
        errors.email = 'Invalid Email';
      }
  
      if (!formValues.location) {
        errors.location = 'Location is required';
      }
  
      if (!formValues.dateFrom) {
        errors.dateFrom = 'Date from is required';
      }
  
      if (!formValues.timeFrom) {
        errors.timeFrom = 'Time from is required';
      }
  
      if (!formValues.dateTo) {
        errors.dateTo = 'Date to is required';
      }
  
      if (!formValues.timeTo) {
        errors.timeTo = 'Time to is required';
      }
  
      if (!formValues.arrivalWindow) {
        errors.arrivalWindow = 'Arrival window is required';
      }
  
      if (isPurpose && !formValues.purpose) {
        errors.purpose = 'Purpose is required';
      }
  
      if (isTittle && !formValues.title) {
        errors.title = 'Title is required';
      }
  
      setFormErrors(errors);
      return Object.keys(errors).length === 0;
    };
  
    const handleSubmit = () => {
      if (validateForm()) {
        console.log('Form Submitted:', formValues);
      } else {
        console.error('Form has errors:', formErrors);
      }
    };
  
    return (
      <BottomSheetModalProvider>
        {isLoading ? (
          <View style={styles.LoaderContainer}>
            <Loader size={wp(10)} color={COLORS.primary} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.container}>
            <CustomHeader
              heading={'Create Visit'}
              leftSvg={<ArrowLeft width={wp(7)} />}
              leftOnpress={() => navigation.goBack()}
              containerStyle={styles.headingContainer}
              headingStyle={styles.heading}
            />
  
            <Text style={styles.SectionHeading}>Visitor Details</Text>
  
            <Text style={styles.inputTitle}>
              Email ID <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TxtInput
              containerStyle={styles.TxtInput}
              value={formValues.email}
              onChangeText={value => setFormValues({...formValues, email: value})}
              inputStyle={styles.inputFilled}
              error={formErrors.email && <Text style={styles.errorText}>{formErrors.email}</Text>}
              placeholder={'Email'}
              placeholderTextColor={COLORS.grayText}
            />
  
            <TouchableOpacity style={styles.dropDownContainer} onPress={handlePresentModalPress}>
              <Text style={styles.dropDownText}>
                {selectLocation?.CompanyWithBranch}
              </Text>
              <ArrowDown />
            </TouchableOpacity>
            {formErrors.location && <Text style={styles.errorText}>{formErrors.location}</Text>}
  
            <Text style={styles.SectionHeading}>Visiting Details</Text>
  
            {isTittle && (
              <View>
                <Text style={styles.inputTitle}>
                  Title <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TxtInput
                  containerStyle={styles.TxtInput}
                  value={formValues.title}
                  onChangeText={value => setFormValues({...formValues, title: value})}
                  inputStyle={styles.inputFilled}
                  error={formErrors.title && <Text style={styles.errorText}>{formErrors.title}</Text>}
                  placeholder={'Title'}
                  placeholderTextColor={COLORS.grayText}
                />
              </View>
            )}
  
            <View style={styles.dateTimeContainer}>
              <View>
                <Text style={styles.inputTitle}>
                  Date From <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity onPress={dateFromCalenderPresent} style={styles.dateTimeInput}>
                  <Text style={styles.dateTimeText}>{formValues.dateFrom || 'Select Date'}</Text>
                  <Calender width={wp(5)} />
                </TouchableOpacity>
                {formErrors.dateFrom && <Text style={styles.errorText}>{formErrors.dateFrom}</Text>}
              </View>
  
              <View>
                <Text style={styles.inputTitle}>
                  Time From <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity onPress={timeFromBtmSheetPresent} style={styles.dateTimeInput}>
                  <Text style={styles.dateTimeText}>{formValues.timeFrom || 'Select Time'}</Text>
                  <Clock width={wp(5)} />
                </TouchableOpacity>
                {formErrors.timeFrom && <Text style={styles.errorText}>{formErrors.timeFrom}</Text>}
              </View>
            </View>
  
            <View style={styles.dateTimeContainer}>
              <View>
                <Text style={styles.inputTitle}>
                  Date To <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity onPress={dateToCalenderPresent} style={styles.dateTimeInput}>
                  <Text style={styles.dateTimeText}>{formValues.dateTo || 'Select Date'}</Text>
                  <Calender width={wp(5)} />
                </TouchableOpacity>
                {formErrors.dateTo && <Text style={styles.errorText}>{formErrors.dateTo}</Text>}
              </View>
  
              <View>
                <Text style={styles.inputTitle}>
                  Time To <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity onPress={timeToBtmSheetPresent} style={styles.dateTimeInput}>
                  <Text style={styles.dateTimeText}>{formValues.timeTo || 'Select Time'}</Text>
                  <Clock width={wp(5)} />
                </TouchableOpacity>
                {formErrors.timeTo && <Text style={styles.errorText}>{formErrors.timeTo}</Text>}
              </View>
            </View>
  
            <Text style={styles.inputTitle}>
              Arrival Window <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TouchableOpacity style={styles.dropDownContainer} onPress={handleWindowArrivalPresentModalPress}>
              <Text style={styles.dropDownText}>
                {arrivalWindow ? arrivalWindow.WindowName : 'Select Arrival Window'}
              </Text>
              <ArrowDown />
            </TouchableOpacity>
            {formErrors.arrivalWindow && <Text style={styles.errorText}>{formErrors.arrivalWindow}</Text>}
  
            {isPurpose && (
              <>
                <Text style={styles.inputTitle}>
                  Purpose <Text style={{color: 'red'}}>*</Text>
                </Text>
                <TouchableOpacity style={styles.dropDownContainer} onPress={handlePurposeListPresentModalPress}>
                  <Text style={styles.dropDownText}>
                    {selectedPurpose?.PurposeName || 'Select Purpose'}
                  </Text>
                  <ArrowDown />
                </TouchableOpacity>
                {formErrors.purpose && <Text style={styles.errorText}>{formErrors.purpose}</Text>}
              </>
            )}
  
            <CustomButton
              onPress={handleSubmit}
              btnStyle={styles.submitBtn}
              labelStyle={styles.submitBtnLabel}
              label={'Submit'}
            />
          </ScrollView>
        )}
        {/* All Modals */}
        <Location ref={locationBottomSheetRef} />
        <WindowArrivalBtmSheet ref={arrivalWindowBottomSheetRef} />
        <PurposeListBottomSheet ref={PurposeListBottomSheetRef} />
      </BottomSheetModalProvider>
    );
  };
  
  export default AddInvite;
  