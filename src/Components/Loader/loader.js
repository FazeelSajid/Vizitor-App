import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../../Constants/COLORS';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
// import { BarIndicator} from 'react-native-indicators'

const Loader = ({ color, size }) => {
    return (
        <ActivityIndicator
            size={size || "small"}
            color={color ?? COLORS.white}
            style={{alignSelf: 'center', transform: [{ scale: 1.5 }]}} // scale the size
            />
    )
}

export default Loader

const styles = StyleSheet.create({})