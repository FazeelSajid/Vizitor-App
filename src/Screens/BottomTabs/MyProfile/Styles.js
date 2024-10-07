import { StyleSheet } from "react-native";
import { COLORS } from "../../../Constants/COLORS";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { fonts } from "../../../../assets/fonts/fonts";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingTop: hp('4'),
      paddingHorizontal: wp('6%'),
    },
    headerContainer: {
      // flex: 1,
      flexDirection: 'row',
      // backgroundColor: 'green'
      justifyContent: 'space-between',
      marginTop: hp('5%'),
    },
    headerContentContainer: {
      // alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {
      fontFamily: fonts.medium,
      color: COLORS.black,
      fontSize: wp(6),
      marginBottom: wp(1),
    },
    email: {
      fontFamily: fonts.medium,
      color: '#6F6F6F',
      fontSize: wp(4),
      marginTop: wp(1),
      // textAlign: 'center'
    },
    optionContainer: {
      // borderWidth: wp('0.2%'),
      // borderColor: COLORS.grayBg,
      marginBottom: wp('2.6%'),
      borderRadius: wp(2),
      paddingVertical: wp(3.8),
      // alignItems: 'flex-start',
      justifyContent: 'space-between',
      // paddingVertical: wp('100%'),
    },
    editBtn: {
      backgroundColor: COLORS.primary,
      paddingVertical: wp(1),
      marginTop: wp(4),
      alignItems: 'center',
      borderRadius: wp(10),
      width: wp(33),
      // height: wp(10),
    },
    btnText: {
      fontSize: wp(5),
      color: COLORS.white,
      fontFamily: fonts.regular,
      // fontWeight: 'bold',
      // textAlign: 'center',
      // marginLeft: wp(2),
    },
    optionBtnTxt: {
      color: COLORS.darkTextColor,
      fontSize: wp(4.6),
      marginLeft: wp(4),
      fontFamily: fonts.regular,
    },
    modalBtn1: {
      borderColor: COLORS.primary,
      borderWidth: wp(0.5),
      borderRadius: wp(10),
      width: wp(30),
    },
    modalBtn2: {
      backgroundColor: COLORS.primary,
      marginLeft: wp(3),
      borderRadius: wp(10),
      width: wp(30),
    },
    contactModalButton: {
      backgroundColor: COLORS.white,
      borderColor: COLORS.primary,
      borderWidth: wp(0.3),
      borderRadius: 100,
      paddingVertical: wp(2)
    },
    contactModalHeading:{
      marginTop: hp(1.5),
    },
    LoaderContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

