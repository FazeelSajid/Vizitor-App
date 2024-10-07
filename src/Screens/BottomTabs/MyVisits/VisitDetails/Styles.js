import { StyleSheet } from "react-native";
import { COLORS } from "../../../../Constants/COLORS";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: COLORS.white
    },
    headerContainer: {
        marginTop: hp(4),
        paddingHorizontal: wp(5),

    },
    contentContainer:{
        paddingHorizontal: wp(8),
        // paddingVertical: hp(10)
        // alignItems: 'center',
        // backgroundColor: 'green',
        marginTop: hp(4)
    },
    label:{
        fontSize: wp(5),
        fontWeight: '600',
        marginBottom: hp(1),
        color: COLORS.black
    },
    labelValue:{
        fontSize: wp(4),
        fontWeight: '600',
        marginBottom: hp(3),
        color: COLORS.darkGraytext
    },
    LoaderContainer:{
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        // backgroundColor: 'green'
    }
})