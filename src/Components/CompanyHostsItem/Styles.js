import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { COLORS } from "../../Constants/COLORS";
import { fonts } from "../../../assets/fonts/fonts";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingVertical: hp('2'),
      paddingHorizontal: wp('6%'),
      borderColor: '#D9D9D9',
      borderWidth: wp(0.3),
      borderRadius: wp('3'),
      marginVertical: hp('1'),
    },
   label: {
     fontSize: hp('1.9'),
     color: COLORS.black,
     marginBottom: hp('0.6'),
     fontFamily: fonts.medium 
   },
   Value: {
     fontSize: hp('1.8'),
     color: COLORS.darkGraytext,
     marginBottom: hp('1'),
     fontFamily: fonts.regular 
   }
  });
