import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { COLORS } from '../../Constants/COLORS'; 
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../Buttons/customButton';
import { fonts } from '../../../assets/fonts/fonts';
const CustomHeader = ({
  right,
  heading,
  left,
  iconSize,
  leftOnpress,
  rightOnPress,
  leftIconColor,
  rightIconColor,
  rightText,
  rightTextStyle,
  headingStyle,
  leftSvg,
  rightSvg,
  containerStyle,
  secondRightTextStyle,
  secondRightOnPress,
  secondRightIconColor,
  secondRightSvg,
  secondRightIconSize,
  secondRightIcon,
  secondRightRightText,
  secondBtnContainerStyle,
  rightContainerStyle
  
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      { left &&
      <CustomButton
        icon={left}
        // svg={leftSvg}
        iconSize={iconSize}
        iconColor={leftIconColor}
        onPress={leftOnpress}
        containerStyle={styles.iconBtn}
        
      />}
      { leftSvg &&
      <CustomButton
        // icon={left}
        svg={leftSvg}
        iconSize={iconSize}
        iconColor={leftIconColor}
        onPress={leftOnpress}
        containerStyle={styles.iconBtn}
        
      />}
     {heading && <Text style={[styles.heading, headingStyle]}>
        {heading}
      </Text>}
      <View style={secondBtnContainerStyle} >


      <CustomButton
      containerStyle={rightContainerStyle}
        icon={right}
        svg={rightSvg}
        iconSize={iconSize}
        iconColor={rightIconColor}
        onPress={rightOnPress}
        text={rightText}
        textStyle={rightTextStyle}
      />
      {secondRightSvg && <CustomButton
        icon={secondRightIcon}
        svg={secondRightSvg}
        iconSize={secondRightIconSize}
        iconColor={secondRightIconColor}
        onPress={secondRightOnPress}
        text={secondRightRightText}
        textStyle={secondRightTextStyle}
      />}
      </View>
    
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
    paddingTop: hp(2),
    // backgroundColor:'green'
  },
  heading: {
    color: COLORS.secondry,
    fontSize: hp(2.9),
    // lineHeight: wp(6),
    fontFamily: fonts.medium, 
    // textAlign: 'center',
  },
  iconBtn: {
    // backgroundColor: 'green',
    paddingHorizontal: wp(0),
}
});
