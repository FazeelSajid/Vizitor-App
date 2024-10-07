import { StyleSheet } from "react-native";
import { COLORS } from "../../../../Constants/COLORS";
import { fonts } from "../../../../../assets/fonts/fonts";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: wp(4), // Responsive padding
    },
    header: {
      marginTop: hp(2.5), // Responsive margin
      marginBottom: hp(1.25), // Responsive margin
    },
    title: {
      fontSize: wp(5.5), // Responsive font size
      //   fontWeight: 'bold',
      color: COLORS.secondry,
      fontFamily: fonts.bold,
      fontWeight: 'bold',
      marginBottom: hp(2),
    },
  
    txtInput: {
      borderRadius: wp(2),
      borderColor: COLORS.grayBg,
      borderWidth: wp(0.3),
      backgroundColor: '#F7F7F7',
      color: COLORS.black,
    },
    friendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: hp(1.25), // Responsive padding
      //   borderBottomWidth: 1,
      //   borderBottomColor: COLORS.lightGray,
    },
    friendInfo: {
      flex: 1,
    },
    locationName: {
      fontSize: wp(4.5), // Responsive font size
      color: COLORS.black,
      fontFamily: fonts.regular,
    },
    followerCount: {
      fontSize: wp(3.5), // Responsive font size
      color: COLORS.darkGray,
      //   fontFamily: fonts.medium,
    },
    buyButton: {
      backgroundColor: COLORS.primary,
      paddingVertical: hp('2%'),
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: wp('5%'),
      borderRadius: wp('3%'),
      marginBottom: hp('3%'),
      width: wp(70),
      alignSelf: 'center',
      flexDirection: 'row',
      position: 'absolute',
      bottom: hp('2%'),
    },
    buyButtonText: {
      color: COLORS.white,
      fontSize: wp('4%'),
      fontFamily: fonts.medium,
    },
    ButtonArrowLogo: {position: 'absolute', right: 10, bottom: 15},
    ListEmptyComponent: {
      alignSelf: 'center',
      marginTop: hp(10),
      marginBottom: hp(10),
    },
  });