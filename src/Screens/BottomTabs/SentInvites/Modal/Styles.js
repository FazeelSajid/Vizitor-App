import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { COLORS } from "../../../../Constants/COLORS";
import { fonts } from "../../../../../assets/fonts/fonts";
export const styles = StyleSheet.create({

    modalOverlay: {
        flex: 1,
        paddingHorizontal: wp('2%'),
        paddingTop: hp('12%'),
        paddingBottom: hp('8%'),
      },
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingVertical: wp('5%'),
        paddingHorizontal: wp('5%'),
        borderRadius: wp('3%'),
        flexGrow: 1
    },
    contentContainerStyle: {
        // flex: 1
    },
    headingContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    heading: {
        fontSize: wp(6),
        fontFamily: fonts.bold,
        color: COLORS.secondry,
        paddingLeft: wp(20)
        // marginBottom: 20,
        // marginBottom: 20,
    },
    SectionHeading:{
        fontSize: wp(5),
        fontFamily: fonts.bold,
        color: COLORS.black,
        marginTop: wp('8%'),
    },
    TxtInput: {
        borderRadius: wp(2),
        borderColor: '#5758599E',
        borderWidth: wp(0.3)
        // width: "100%"
    },
    inputTitle:{
        color: COLORS.grayText2,
        marginBottom: hp(1),
        marginLeft: wp(1),
        marginTop: hp(3)
    },
    inputFilled:{
        color: COLORS.black,
    },
    dropDownContainer:{
        height: hp(6.5),
        marginBottom: hp(1),
        borderRadius: wp(2),
        borderColor: '#5758599E',
        borderWidth: wp(0.3),
        marginTop: hp('4%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 1,
        alignItems: 'center',
        paddingHorizontal: wp(4)
    },
    dropDownText:{
        color: COLORS.black,
        fontFamily: fonts.regular,
        fontSize: wp(3.5),
        // margin: wp(3)
        
    },
    DateContainer:{
        borderColor: '#5758599E',
        paddingVertical: hp(2),
        borderWidth: wp(0.3),
        borderRadius: wp(2),
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        // flex: 1
    },
    btn: {
        backgroundColor: COLORS.primary,
        // paddingHorizontal: wp(10),
        paddingVertical: hp(1.4),
        borderRadius: wp(8),
        borderColor: COLORS.primary,
        borderWidth: wp(0.5),
        marginVertical: hp(4),
      },
      btnText: {
        color: COLORS.white,
        fontSize: hp(1.8),
        textAlign: 'center',
      },
      LoaderContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.white
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        // top: 0,
      },
      errorText: {
        color: 'red',
        fontSize: wp(3.5),
        // marginTop: 5,
      },
    
})