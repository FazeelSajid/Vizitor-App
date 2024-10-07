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
      backgroundColor: '#FBFBFB',
      paddingTop: hp('4%'),
      paddingHorizontal: wp('6%'),
    },
    headingContainer: {
      paddingHorizontal: wp('10%'),
      overflow: 'hidden',
      alignItems: 'center',
    },
    heading: {
      fontFamily: fonts.medium,
      fontSize: wp('6%'),
      textAlign: 'center',
      // paddingTop: wp('3%'),
      color: COLORS.secondry,
    },
    scrollView: {
      marginTop: hp('2%'),
      // paddingHorizontal: wp(3),
    },
    policy: {
      fontFamily: fonts.regular,
      lineHeight: wp('7%'),
      color: COLORS.darkGraytext,
      fontSize: wp('4.3%'),
    },
    btn: {
      paddingVertical: wp('4%'),
      borderRadius: wp('3%'),
      marginTop: wp('5%'),
    },
    btnText: {
      fontSize: wp(5),
      color: COLORS.white,
      fontFamily: fonts.medium,
      // fontWeight: 'bold',
      textAlign: 'center',
    },
    LoaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    ListEmptyComponentTxt: {
    fontFamily: fonts.bold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: wp(6),
  },
  });