import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, StatusBar, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
// import { COLORS } from '../../config/COLORS'; // Adjust the path as necessary
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../Buttons/customButton'; 
import { fonts } from '../../../assets/fonts/fonts'; 
import { COLORS } from '../../Constants/COLORS';

const Model = ({
  containerStyle,
  children,
  visible,
  onClose
}) => {
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={visible}
      onRequestClose={onClose}
    >
      <StatusBar backgroundColor={'rgba(0, 0, 0, 0.5)'} />
      <Pressable onPress={onClose} style={styles.modalOverlay}>
        <View style={[styles.modalContainer, containerStyle]}>
         {children}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1, // Ensures the overlay takes up the full screen
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // paddingHorizontal: wp('3%'),
  },
  modalContainer: {
    width: wp('70%'),
    backgroundColor: COLORS.white,
    borderRadius: wp('6%'),
    paddingVertical: wp('4%'),
    paddingHorizontal: wp('0'), 
    // alignItems: 'center', /// Ensures the content inside is centered
    borderWidth: 1,
    borderColor: COLORS.white,
    // marginHorizontal: wp('3%'),
    // justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: hp('2%'),
  },
  message: {
    fontSize: wp('4%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
    marginTop: hp('2%'), // Adjusted marginTop for better spacing
    color: COLORS.black,
    fontFamily: fonts.regular,
    lineHeight: wp('6%'),
    paddingHorizontal: wp('3%'),
    width: "100%"
  },
  buttonContainer: {
    // flexDirection: 'row', // Align buttons in a row
    justifyContent: 'space-between', // Space buttons evenly
    // marginTop: hp('2%'), // Added marginTop for spacing
    width: '100%', // Ensure the buttons take up the full width of the modal
  },
  button: {
    // backgroundColor: COLORS.primary, // Ensure the button has a background color
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('3%'),
    marginHorizontal: wp('1%'), // Added horizontal margin for spacing between buttons
    // width: 'auto', // Ensure button width is auto
  },
  buttonText: {
    color: COLORS.white,
    fontSize: wp(3.5),
    fontFamily: fonts.medium,
    textAlign: 'center', // Center the button text
  },
  heading: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    // marginTop: hp('3%'),
    color: COLORS.secondry,
    fontFamily: fonts.regular,
    textAlign: 'center',
  },
});

export default Model;
