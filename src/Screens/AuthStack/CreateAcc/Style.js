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
        // alignItems: 'center',
        paddingTop: hp(16),
        paddingHorizontal : wp(10)
        // justifyContent: 'flex'
    },
    heading:{
        color: COLORS.secondry,
        // fontFamily: fonts.thin,
        fontSize: hp(2.5),
        fontWeight: '500',
        marginVertical: hp(4),
    },
    TxtInput: {
        borderRadius: wp(2),
        borderColor: COLORS.grayBg,
        borderWidth: wp(0.3),
        // backgroundColor: 'green'
        // width: "100%"
    },
    contentContainer:{
        alignItems: 'center'
    },
    inputTitle:{
        color: COLORS.grayText2,
        marginBottom: hp(1),
        marginLeft: wp(1)
    },
    btnContainer:{
        justifyContent: 'flex-end',
        flex:1,
        marginBottom: hp(6)

    },
    btn:{
        backgroundColor: COLORS.primary,
        // paddingHorizontal: wp(10),
        paddingVertical: hp(1.4),
        borderRadius: wp(8),
        borderColor: COLORS.primary,
        borderWidth: wp(0.5),        
    },
    btnText:{
        color: COLORS.white,
        fontSize: hp(1.8),
        textAlign: 'center',
    },
    inputFilled:{
        color: COLORS.black,
    },
    errorText: {
        color: 'red',
        fontSize: wp(3.5),
        // marginTop: 5,
      },
      popUpMessage:{
        color: COLORS.black,
        textAlign: 'center',
        fontSize: wp('4%'),
        paddingHorizontal: wp(4) 
      }

})