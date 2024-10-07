import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo, useState } from 'react'
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

const Calender = ({bottomSheetRef, setFieldValue, field, heading}) => {
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  const snapPoints = useMemo(() => [hp('60%'), hp('60%')], []);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7} 
        appearsOnIndex={0} 
        disappearsOnIndex={-1} 
      />
    ),
    []
  );

  const closeBtmSheet = useCallback(()=>{
    bottomSheetRef.current?.dismiss()
  },[])

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}
    >
      <CustomButton svg={<CrossIcon/>} containerStyle={{alignSelf: 'flex-end', marginRight: wp(5)}} onPress={closeBtmSheet} />
      
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading}>{heading}</Text>
          
          {/* Row with date and pencil icon */}
          <View style={styles.dateRow}>
            <Text style={styles.title}>{moment(selectedDate).format('ddd, MMM D')}</Text>
            <Icon name="edit" size={20} color="gray" style={{marginLeft: 8}} />
          </View>
        </View>

        <Calendar
          current={selectedDate}
          
          onDayPress={(day) => {
            setSelectedDate(day.dateString)
            setFieldValue(field, day.dateString)
            closeBtmSheet()
          }}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: COLORS.primary,  },
          }}
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: COLORS.primary,
            selectedDayTextColor: '#ffffff',
            todayTextColor: COLORS.black,
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            arrowColor: COLORS.secondry,
            monthTextColor: 'black',
            indicatorColor: 'blue',
            weekTextColor:  COLORS.secondry

          }}
          
          
        />
        
        {/* OK Button */}
        {/* <CustomButton
          text={'Ok'}
          onPress={()=>{
            setFieldValue(field, selectedDate)
            
            closeBtmSheet()
          }}
          containerStyle={{alignSelf: 'flex-end', marginTop: hp(3), marginRight: wp(5)}}
          textStyle={{color: COLORS.primary, fontFamily: fonts.medium}}
        /> */}
      </View>
    </BottomSheetModal>
  )
}

export default Calender

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4),
  },
  header: {
    // Add margin or padding if needed
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
    marginTop: hp(1),
    justifyContent: 'space-between', 
    borderBottomColor: COLORS.darkGraytext,
    paddingBottom: hp(2),
    borderBottomWidth: wp(0.3)
  },
  title: {
    fontSize: wp(5.5),
    color: COLORS.black,
    fontFamily: fonts.medium,
  },
});
