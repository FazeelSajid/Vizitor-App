import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { COLORS } from "../../../Constants/COLORS";

export const styles = StyleSheet.create({
    container:{
        flex: 1,
        color: COLORS.white
    },
    headerContainer: {
        marginTop: hp(3),
        paddingHorizontal: wp(5),
        marginBottom: hp(10)
    },
    image:{
        height: hp(60),
        width: wp(100),
        alignSelf: 'center'
    },
    retryBtnImagePreview: {
        backgroundColor: COLORS.primary,
        paddingVertical: hp(1),
        paddingHorizontal: wp(2.2),
        position: 'absolute',
        bottom: 230,
        right: 165,
        borderRadius: wp(10),
        
      },
      uploadBtn:{},
      modalText: {
        color: COLORS.secondry,
        fontSize: wp(4),
        fontWeight: '600',
        textAlign: 'center',
        // width:
      },
      uploadbtnModal: {
        borderRadius: wp(100),
        borderColor: COLORS.primary,
        borderWidth: wp(0.3),
        borderStyle: 'dashed',
        paddingVertical: hp(1.7),
        marginTop: hp(1.5),
        // paddingLeft: wp(3.5),
        alignItems: 'center',
        paddingVertical: wp(7),
        paddingHorizontal: wp(7),
        backgroundColor: COLORS.grayBg,
      },
      upoadBtntextModal: {
        color: COLORS.black,
        marginLeft: wp(4),
    
        // marginBottom: hp(1),
        // marginLeft: wp(5),
    
        marginTop: hp(1.5),
      },
      btn: {
        backgroundColor: COLORS.primary,
        // paddingHorizontal: wp(10),
        paddingVertical: hp(1.4),
        borderRadius: wp(8),
        borderColor: COLORS.primary,
        borderWidth: wp(0.5),
        marginTop: hp(10),
        width: wp(80),
        alignSelf: 'center'
      },
      btnText: {
        color: COLORS.white,
        fontSize: hp(1.8),
        textAlign: 'center',
      },

})
