import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../Constants/COLORS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { fonts } from '../../../assets/fonts/fonts';
const PopUp = ({heading, txtColor , color, svg}) => {
  return (
    <View style={[styles.popUp, {backgroundColor: color}]}>
    {/* <View style={styles.innerContainer} > */}
    {svg}
      <Text style={[styles.heading, {  color: txtColor,}]} >{heading}</Text>
    {/* </View> */}
  </View>
  )
}

export default PopUp

const styles = StyleSheet.create({
    popUp: {
      position: 'absolute',
      top: hp('4%'),
      // left: wp('5%'),

      // right: wp('5%'),
      // backgroundColor: '#d4edda',
      // borderRadius: wp('2%'),
      alignItems: 'center',
      width: '100%',
      height: hp('8%'),
      paddingLeft: wp('7%'),
      

      zIndex: 1,
        // backgroundColor: COLORS.white,
        flexDirection: 'row',
        // flex:1,
        // borderRadius: wp('2.5%'),
        overflow: 'hidden',
        elevation: 10,
      },
      color: {
        // height: hp('7.3%'),
        // width: wp('2.2%'),
        // flexGrow:1
      },
      innerContainer:{
        paddingHorizontal: wp('3%'),
        justifyContent: 'center',
        paddingVertical: wp(3)

        
        // paddingVertical: hp('4%'),
      },
      heading: {
        fontFamily: fonts.regular,
      
        marginLeft: wp(5)
        
        // marginBottom: wp('0.7')
      },
      text:{
        fontFamily: fonts.medium,
        fontSize: wp('3.5%'),
        color: COLORS.blackTxtColor,
      }
})