import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { COLORS } from '../../../../../Constants/COLORS';
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../../../Components/Buttons/customButton';
import CrossIcon from '../../../../../assets/Svgs/crossIcon.svg';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Edit icon
import { fonts } from '../../../../../../assets/fonts/fonts';
import TxtInput from '../../../../../Components/TxtInput/TxtInput';
import DatePicker from 'react-native-date-picker';

const TimeInput = ({ bottomSheetRef, setTime, heading }) => {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [selectedPeriod, setSelectedPeriod] = useState('AM'); // Default to 'AM'
  const selectedTime = `${hours}:${minutes} ${selectedPeriod}`// Default to
  const [time, setTimee] = useState(new Date());  // Use current time as default



  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const togglePeriod = (period) => {
    setSelectedPeriod(period);
  };

  const handleDateChange = (date) => {
    const timee = formatTime(date)
    setTime(timee)

  };


  const snapPoints = useMemo(() => [hp('39%'), hp('39%')], []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7} z
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  const closeBtmSheet = useCallback(() => {
    bottomSheetRef.current?.dismiss();
  }, []);


  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}>

      <View style={styles.header
      } >
        <Text style={styles.heading}>{heading}</Text>
        <CustomButton
          svg={<CrossIcon />}
          // containerStyle={{ marginRight: wp(5) }}
          onPress={closeBtmSheet}
        />
      </View>


      <View style={styles.container}>




          <DatePicker
            date={time}            // The selected time value
            onDateChange={handleDateChange}  // Callback when time changes
            mode="time"             // Mode set to 'time' to pick only time
            locale="en"             // You can set the locale, e.g., 'en', 'fr', etc.
            is24hourSource="locale" // Set to 'locale' or 'device' based on preference
            style={{ width: wp(80) }}
            theme='light'
            dividerColor={COLORS.secondry}
          />
          <CustomButton
            text={'Confirm'}
            onPress={() => {

              closeBtmSheet();
            }}
            containerStyle={styles.confirmButton}
            textStyle={{ color: COLORS.primary, fontFamily: fonts.bold, fontSize: wp(4) }}
          pressedRadius={wp(2)}

          />
          {/* Row with date and pencil icon */}
          {/* <View style={styles.dateRow}>
            <View>

            <TxtInput
              containerStyle={styles.TxtInput}
              inputStyle={[styles.input, {color: COLORS.secondry}]}
              focusedStyle={styles.focused}
              keyboardType={'number-pad'}
              maxLength={2}
              onChangeText={(text)=> setHours(text)}
              value={hours}
            />
            <Text style={{fontSize: wp(3), color: COLORS.black}} >
                Hour
            </Text>
            </View>



            <Text style={styles.title}>:</Text>

            <View>

            <TxtInput
              containerStyle={styles.TxtInput}
              inputStyle={[styles.input, {color: COLORS.primary}]}
              focusedStyle={styles.focused}
              keyboardType={'number-pad'}
              maxLength={2}
              onChangeText={(text)=> {
                setMinutes(text)
                // console.log(minutes);
                
              }}
              value={minutes}
            />
            <Text style={{fontSize: wp(3), color: COLORS.black,}} >
                Minutes
            </Text>
            </View>
            <View style={styles.btnContainer}>
      <TouchableOpacity
        style={[styles.toggleButton, selectedPeriod === 'AM' && styles.selected]}
        onPress={() => togglePeriod('AM')}
      >
        <Text style={[styles.text, selectedPeriod === 'AM' && styles.selectedText]}>AM</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.toggleButton, selectedPeriod === 'PM' && styles.selected]}
        onPress={() => togglePeriod('PM')}
      >
        <Text style={[styles.text, selectedPeriod === 'PM' && styles.selectedText]}>PM</Text>
      </TouchableOpacity>
    </View>


          </View> */}
    

        {/* OK Button */}

      </View>
    </BottomSheetModal>
  );
};

export default TimeInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  header: {
    // Add margin or padding if needed
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: wp(4),
    alignItems: 'center',
    marginBottom: hp(3),
    marginTop: hp(1),

    
  },
  heading: {
    fontSize: wp(5.5),
    color: COLORS.secondry,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp(1),
    justifyContent: 'center',
    // paddingBottom: hp(2),
    backgroundColor: '#F2F2F2'
  },
  title: {
    fontSize: wp(8),
    color: COLORS.black,
    fontFamily: fonts.medium,
    marginHorizontal: wp(3),
    marginBottom: wp(6)
    // textAlignVertical: 'center',
  },
  TxtInput: {
    backgroundColor: COLORS.grayBg,
    width: wp(17.5),
    height: hp(7),
    borderColor: COLORS.grayBorder,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    paddingHorizontal: wp(3),
  },
  input: {
    fontSize: wp(6),
    fontFamily: fonts.medium,
    textAlignVertical: 'center',
  },
  focused: {
    borderColor: COLORS.secondry,
  },
  btnContainer: {
    // flexDirection: 'row',
    width: wp(13), // Adjust width as needed
    height: hp(7), // Adjust height as needed
    borderWidth: 1,
    borderColor: COLORS.black, // Border color
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: wp(3),
    marginBottom: wp(6),
  },
  toggleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.grayBg,
  },
  selected: {
    backgroundColor: COLORS.primary, // Change this to the selected background color
  },
  text: {
    fontSize: wp(4),
    color: COLORS.primary, // Text color
  },
  selectedText: {
    color: COLORS.white, // Selected text color
    fontWeight: 'bold',
  },
  confirmButton: {
    alignSelf: 'flex-end',
    marginTop: hp(0),
    marginRight: wp(5),
    borderColor: COLORS.primary,
    borderColor: COLORS.primary,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: wp(2),
  }
});
