import {
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { styles } from './Styles';
import CustomButton from '../../../../Components/Buttons/customButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import TxtInput from '../../../../Components/TxtInput/TxtInput';
import useApis from '../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import Location from './LocationBottomSheet/LocationBtmSheet';
import ArrowDown from '../../../../assets/Svgs/dropDownArrowDown.svg';
import Clock from '../../../../assets/Svgs/Clock.svg';
import Warning from '../../../../assets/Svgs/Warning.svg';
import Success from '../../../../assets/Svgs/success.svg';
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import WindowArrivalBtmSheet from './WindowArrivalBottomSheet/WindowArrivalBtmSheet';
// import { GetConfiguration } from '../../../../ReduxToolkit/Slices/ApiSlices/AppApis/GetConfiguration/getConfiguration';
import { useDispatch } from 'react-redux';
import PurposeListBottomSheet from './PurposeListBottomSheet/PurposeListBottomSheet';
import Loader from '../../../../Components/Loader/loader';
import { COLORS } from '../../../../Constants/COLORS';
import Calender from './Calender/Calender';
import TimeInput from './time/TimeInput';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { AddVisit } from '../../../../ReduxToolkit/Slices/ApiSlices/AppApis/AddVisits/addVisit';
import { WithNetworkCheck } from '../../../../Utils/Utilities';
import PopUp from '../../../../Components/NotifyPopUp/PopUp';
import { parse, isAfter, isBefore, isValid, format, startOfDay, differenceInMinutes, isSameDay } from 'date-fns';
import moment from 'moment';

const AddInvite = ({ navigation, route }) => {
  const { hostActiveLocation, windowTimeList } = route.params;

  // console.log(hostActiveLocation);
  // console.log(windowTimeList);

  const {
    // hostActiveLocation,
    // windowTimeList,
    // getPurposeList,
    // getPurposeListState,
    fetchApis
  } = useApis();

  const [purposeList, setPurposeList] = useState([]);

  



  const [isTitle, setIsTitle] = useState(false);
  const [isPurpose, setIsPurpose] = useState(false);
  const dispatch = useDispatch();
  const [btnLoading, setBtnLoading] = useState(false);
  const { appState, setAppState, PersistedAuth } = useAppStates();
  console.log(purposeList.length, 'purpose');


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
    if (hostActiveLocation?.length > 0) {
      setSelectedLocation(hostActiveLocation[0]);
    }

    return () => {
      setAppState({
        isLoading: false,
      });
    };
  }, [hostActiveLocation]);

  useEffect(() => {
    if (selectLocation) {
      handleConfigurationChange(selectLocation.BranchId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectLocation]);




  const handleConfigurationChange = async (value) => {

    setAppState({ isLoading: true });

    const configEndPoint = '/api/general/VizitrUserMyInvite/GetConfiguration'
    const purposeEndPoint = '/api/general/VizitrUserMyInvite/GetHostPurposeList'



    const header = {
      "Authorization": `Bearer ${PersistedAuth.authToken}`,
      "Content-Type": "application/json"
    };
    const body = {
      "Data": {
        "BranchID": value
      },
      "DataObj": {},
      "DataInt": {},
      "DataFloat": {},
      "IsPlatform": false,
      "ClientId": "89248",
      "OrgId": "65",
      "RoleId": "66",

    };



    const response = await fetchApis(configEndPoint, header, JSON.stringify(body), setAppState);


    if (response) {
      setAppState({
        isLoading: false,
      });

      const config = response.Response.apiResponse[0];
      if (config.TitleRequired === 1 && config.PurposeRequired === 1) {

        const response = await fetchApis(purposeEndPoint, header, JSON.stringify(body), setAppState);
        if (response) {
          setPurposeList(response.Response.apiResponse)
          setIsTitle(true);
          setIsPurpose(true);
          setFormValues({ ...formValues, purpose: '' })

        }

      } else if (config.TitleRequired === 1) {
        setIsTitle(true);
        setIsPurpose(false);
      } else if (config.PurposeRequired === 1) {
      
        if (response) {
          setPurposeList(response.Response.apiResponse)
          setIsTitle(false);
          setIsPurpose(true);
          setFormValues({ ...formValues, purpose: '' })
        }

      } else {
        setIsTitle(false);
        setIsPurpose(false);
      }
    }
  };

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    email: '',
    dateFrom: '',
    timeFrom: '',
    dateTo: '',
    timeTo: '',
    arrivalWindow: '',
    purpose: '0',
    title: '',
  });



  const formatDate = (inputDate) => {
    // Split the input date string
    const [year, month, day] = inputDate.split('-');

    // Rearrange the date in the format you want
    const formattedDate = `${parseInt(day)},${parseInt(month)},${year}`;

    return formattedDate;
  };

  const handleSubmit =async () => {
    setBtnLoading(true)
    if (validateForm()) {


      const data = {
        ...formValues,
        dateFrom: formatDate(formValues.dateFrom),
        dateTo: formatDate(formValues.dateTo),
        branch: selectLocation.BranchId,
        authToken: PersistedAuth.authToken,
      };

      const endPoint = '/api/general/VizitrUserMyInvite/AddVisit'
      const body = {
        "Data": {
            "PurposeID": data.purpose,
            "ExpectedCheckIn": data.timeFrom,
            "Title": data.title,
            "ExpectedCheckOut": data.timeTo,
            "BranchID": data.branch,
            "WindowTime": data.arrivalWindow,
            "DateCheckIn": data.dateFrom,
            "DateCheckOut":data.dateTo,
            "EmailId": data.email
        },
        "IsPlatform": false,
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66"
    };

    const header = {
        "Authorization": `Bearer ${PersistedAuth.authToken}`,
        "Content-Type": "application/json"  // Ensure JSON content type
    };

    const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);

    if (response) {
      if (response.Response.apiResponse.IsCreated || response.Response.apiResponse.IsUpdated) {
        setAppState({
          successPop: true,
          isLoading: false,
          successPopMsg: 'Visit Created Successfully',
        });
        setBtnLoading(false)
        setTimeout(() => {
          setAppState({
            successPop: false,
            successPopMsg: '',
          });
          navigation.goBack();
        }, 3000);
      }
    }

    } else {
      // Optionally, provide user feedback for form errors
      setBtnLoading(false)

    }
  };

  const validateForm = () => {
    let errors = {};

    // Email Validation
    if (!formValues.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = 'Invalid Email';
    }

    // Date and Time Validation
    const dateFromString = `${formValues.dateFrom} ${formValues.timeFrom}`;
    const dateFromParsed = parse(dateFromString, 'yyyy-MM-dd HH:mm', new Date());

    if (!formValues.dateFrom) {
      errors.dateFrom = 'Check-In Date is required';
    } else if (!isValid(dateFromParsed)) {
      errors.dateFrom = 'Invalid Check-In Date';
    }

    if (!formValues.timeFrom) {
      errors.timeFrom = 'Check-In Time is required';
    } else if (!isValid(dateFromParsed)) {
      errors.timeFrom = 'Invalid Check-In Time';
    }

    const dateToString = `${formValues.dateTo} ${formValues.timeTo}`;
    const dateToParsed = parse(dateToString, 'yyyy-MM-dd HH:mm', new Date());

    if (!formValues.dateTo) {
      errors.dateTo = 'Check-Out Date is required';
    } else if (!isValid(dateToParsed)) {
      errors.dateTo = 'Invalid Check-Out Date';
    }

    if (!formValues.timeTo) {
      errors.timeTo = 'Check-Out Time is required';
    } else if (!isValid(dateToParsed)) {
      errors.timeTo = 'Invalid Check-Out Time';
    }

    // Arrival Window Validation
    if (!formValues.arrivalWindow) {
      errors.arrivalWindow = 'Arrival window is required';
    }
    if (!formValues.purpose) {
      errors.purpose = 'Purpose is required';
    }

    // Conditional Fields Validation
    if (isPurpose && !formValues.purpose) {
      errors.purpose = 'Purpose is required';
    }

    if (isTitle && !formValues.title) {
      errors.title = 'Title is required';
    }

    // Logical Date-Time Validation
    if (isValid(dateFromParsed) && isValid(dateToParsed)) {
      const today = startOfDay(new Date());

      // 1. Check-In Date is not in the past
      if (isBefore(dateFromParsed, today)) {
        errors.dateFrom = 'Check-In cannot be in the past';
      }

      // 2. Check-Out Date is equal to or after Check-In Date
      if (isBefore(dateToParsed, dateFromParsed)) {
        errors.dateTo = `Check-out must be on or after Check-in Date`;
      }

      // If dates are the same, ensure Check-Out Time is after Check-In Time
      if (
        isSameDay(dateFromParsed, dateToParsed) &&
        isAfter(dateFromParsed, dateToParsed)
      ) {
        errors.timeTo = 'Check-out time must be later than check-in time.';
      }

      // **New Validations:**

      if (isSameDay(dateFromParsed, dateToParsed)) {
        const minutesDiff = differenceInMinutes(dateToParsed, dateFromParsed);

        // a. Times are exactly the same
        if (minutesDiff === 0) {
          errors.timeTo = 'Check-out time must be different from check-in time.';
        }
        // b. Time difference is less than 15 minutes
        else if (minutesDiff < 15) {
          errors.timeTo = 'Check-out time must be at least 15 minutes after check-in time.';
        }
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const setDateTo = (value) => {
    setFormValues({ ...formValues, dateTo: value });
  };

  const setDateFrom = (value) => {
    setFormValues({ ...formValues, dateFrom: value });
  };

  const setTimeTo = (value) => {
    setFormValues({ ...formValues, timeTo: value });
  };

  const setTimeFrom = (value) => {
    setFormValues({ ...formValues, timeFrom: value });
  };

  return (
    <BottomSheetModalProvider >
      

      <View style={styles.container}>
        {appState.errorPop && (
          <PopUp
            heading={appState.errorPopMsg}
            svg={<Warning width={wp(8)} />}
            color="#F2C6C6"
            txtColor="#E12929"
          />
        )}
        {appState.successPop && (
          <PopUp
            heading={appState.successPopMsg}
            svg={<Success width={wp(8)} />}
            color="#E7FFC5"
            txtColor="#0F4124"
          />
        )}
        <CustomHeader
          heading="Create Visit"
          leftSvg={<ArrowLeft width={wp(7)} />}
          leftOnpress={() => navigation.goBack()}
          containerStyle={styles.headingContainer}
          headingStyle={styles.heading}
        />
        {appState.isLoading ? (
          <View style={styles.LoaderContainer}>
            <Loader size={wp(10)} color={COLORS.primary} />
          </View>
        ) : (

          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={{ flexGrow: 1 }}
          >


            <Text style={styles.SectionHeading}>Visitor Details</Text>

            <Text style={styles.inputTitle}>
              Email ID <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TxtInput
              containerStyle={[styles.TxtInput,  Platform.OS === 'ios' && {height: hp(5.4)}]}
              value={formValues.email}
              onChangeText={(value) =>
                setFormValues({ ...formValues, email: value })
              }
              inputStyle={styles.inputFilled}
              error={
                formErrors.email && (
                  <Text style={styles.errorText}>{formErrors.email}</Text>
                )
              }

              placeholderTextColor={COLORS.grayText}

            />

            <Text style={{ color: COLORS.grayText2, marginTop: hp(2), marginBottom: hp(1) }}>
              Location <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <TouchableOpacity
              style={styles.dropDownContainer}
              onPress={handlePresentModalPress}
              accessibilityLabel="Select Location"
              accessibilityRole="button"
            >
              <Text style={styles.dropDownText}>
                {selectLocation?.CompanyWithBranch}
              </Text>
              <ArrowDown />
            </TouchableOpacity>

            <Text style={styles.SectionHeading}>Visiting Details</Text>

            {isTitle && (
              <View>
                <Text style={styles.inputTitle}>
                  Title <Text style={{ color: 'red' }}>*</Text>
                </Text>

                <TxtInput
                  containerStyle={[styles.TxtInput,  Platform.OS === 'ios' && {height: hp(5.5)}]}
                  value={formValues.title}
                  onChangeText={(value) =>
                    setFormValues({ ...formValues, title: value })
                  }
                  inputStyle={styles.inputFilled}
                  error={
                    formErrors.title && (
                      <Text style={styles.errorText}>{formErrors.title}</Text>
                    )
                  }

                />
              </View>
            )}

            {isPurpose && (
              <>
                <Text style={{ color: COLORS.grayText2, marginTop: hp(2), marginBottom: hp(1) }}>
                  Purpose <Text style={{ color: 'red' }}>*</Text>
                </Text>
                <TouchableOpacity
                  style={styles.dropDownContainer}
                  onPress={handlePurposeListPresentModalPress}
                  accessibilityLabel="Select Purpose"
                  accessibilityRole="button"
                >
                  {purpose ? (
                    <Text style={styles.dropDownText}>{purpose.Purpose}</Text>
                  ) : (
                    <Text style={styles.dropDownText}>
                      Select
                    </Text>
                  )}
                  <ArrowDown />
                </TouchableOpacity>

                {formErrors.purpose && (
                  <Text style={styles.errorText}>{formErrors.purpose}</Text>
                )}
              </>
            )}

            <Text style={{ color: COLORS.grayText2, marginTop: hp(2), marginBottom: hp(1) }}>
              Check-In Date and Time <Text style={{ color: 'red' }}>*</Text>
            </Text>


            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',
                // marginTop: hp(4),
              }}
            >
              <View style={{ width: wp(40) }} >
                <TouchableOpacity
                  style={styles.DateContainer}
                  onPress={dateFromCalenderPresent}
                  accessibilityLabel="Select Start Date"
                  accessibilityRole="button"
                >
                  <Text style={[styles.dropDownText, { marginRight: wp(4) }]}>
                    {formValues.dateFrom ? moment(formValues.dateFrom).format('D-MMM-yy') : 'YYYY-MM-DD'}{' '}
                  </Text>
                  <ArrowDown />
                </TouchableOpacity>
                {formErrors.dateFrom && (
                  <Text style={styles.errorText}>{formErrors.dateFrom}</Text>
                )}
              </View>

              {/* <Text style={styles.dropDownText}>
                Time <Text style={{ color: 'red' }}>*</Text>
              </Text> */}
              <View style={{ width: wp(30) }}>
                <TouchableOpacity
                  style={[styles.DateContainer, { paddingHorizontal: wp(3) }]}
                  onPress={timeFromBtmSheetPresent}
                  accessibilityLabel="Select Start Time"
                  accessibilityRole="button"
                >
                  <Text style={styles.dropDownText}>
                    {formValues.timeFrom ? moment(formValues.timeFrom, "HH:mm").format("hh:mm A") : '--:-- --'}{''}

                  </Text>
                  <Clock />
                </TouchableOpacity>
                {formErrors.timeFrom && (
                  <Text style={styles.errorText}>{formErrors.timeFrom}</Text>
                )}
              </View>
            </View>

            <Text style={{ color: COLORS.grayText2, marginTop: hp(2), marginBottom: hp(1) }}>
              Check-Out Date and Time <Text style={{ color: 'red' }}>*</Text>
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                // alignItems: 'center',

              }}
            >
              <View style={{ width: wp(40) }}>
                <TouchableOpacity
                  style={styles.DateContainer}
                  onPress={dateToCalenderPresent}
                  accessibilityLabel="Select End Date"
                  accessibilityRole="button"
                >
                  <Text style={[styles.dropDownText, { marginRight: wp(4) }]}>
                    {formValues.dateTo ? moment(formValues.dateTo).format('D-MMM-yy') : 'YYYY-MM-DD'}{' '}

                  </Text>
                  <ArrowDown />
                </TouchableOpacity>
                {formErrors.dateTo && (
                  <Text style={styles.errorText}>{formErrors.dateTo}</Text>
                )}
              </View>

              {/* <Text style={styles.dropDownText}>
                Time <Text style={{ color: 'red' }}>*</Text>
              </Text> */}

              <View style={{ width: wp(30) }}>
                <TouchableOpacity
                  style={[styles.DateContainer, { paddingHorizontal: wp(3) }]}
                  onPress={timeToBtmSheetPresent}
                  accessibilityLabel="Select End Time"
                  accessibilityRole="button"
                >
                  <Text style={[styles.dropDownText,]}>
                    {formValues.timeTo ? moment(formValues.timeTo, "HH:mm").format("hh:mm A") : '--:-- --'}{' '}

                  </Text>
                  <Clock />
                </TouchableOpacity>

                {formErrors.timeTo && (
                  <Text style={styles.errorText}>{formErrors.timeTo}</Text>
                )}
              </View>
            </View>


            <Text style={{ color: COLORS.grayText2, marginTop: hp(2), marginBottom: hp(1) }}>
              Arrival Time Window before start (mins){' '}
              <Text style={{ color: 'red' }}>*</Text>
            </Text>


            <TouchableOpacity
              style={[styles.dropDownContainer,]}
              onPress={handleWindowArrivalPresentModalPress}
            // accessibilityLabel="Select Arrival Window"
            // accessibilityRole="button"
            >
              {formValues.arrivalWindow.length ? (
                <Text style={styles.dropDownText}>
                  {formValues.arrivalWindow}
                </Text>
              ) : (
                <Text style={styles.dropDownText}>
                  Select
                </Text>
              )}
              <ArrowDown />
            </TouchableOpacity>

            {formErrors.arrivalWindow && (
              <Text style={styles.errorText}>{formErrors.arrivalWindow}</Text>
            )}
            <CustomButton
              containerStyle={styles.btn}
              text="Create"
              textStyle={styles.btnText}
              onPress={handleSubmit}
              pressedRadius={wp(8)}
              isLoading={btnLoading}
            />

            {purposeList && isPurpose && (
              <PurposeListBottomSheet
                data={purposeList}
                bottomSheetRef={PurposeListBottomSheetRef}
                setSelected={setPurpose}
                setFormValues={setFormValues}
                formValues={formValues}
                selectedLocation={formValues.purpose}
              />
            )}

            {windowTimeList && (
              <WindowArrivalBtmSheet
                data={windowTimeList}
                bottomSheetRef={arrivalWindowBottomSheetRef}
                setSelected={setArrivalWindow}
                setFormValues={setFormValues}
                formValues={formValues}
                selectedLocation={arrivalWindow}
              />
            )}

            {hostActiveLocation && (
              <Location
                location={hostActiveLocation}
                bottomSheetRef={locationBottomSheetRef}
                setSelected={setSelectedLocation}
                selectedLocation={selectLocation}
              />
            )}

            <Calender
              bottomSheetRef={dateToCalenderRef}
              setDate={setDateTo}
              heading="Check-Out Date"
              setDatee={setDateTo}
            />
            <Calender
              bottomSheetRef={dateFromCalenderRef}
              setDate={setDateFrom}
              heading="Check-In Date"
              setDatee={setDateFrom}
            />
            <TimeInput
              bottomSheetRef={timeFromSheetRef}
              heading="Check-In Time"
              setTime={setTimeFrom}
            />
            <TimeInput
              bottomSheetRef={timeToSheetRef}
              heading="Check-Out Time"
              setTime={setTimeTo}
            />
          </ScrollView>
        )}
      </View>

    </BottomSheetModalProvider>
  );
};

export default AddInvite;
