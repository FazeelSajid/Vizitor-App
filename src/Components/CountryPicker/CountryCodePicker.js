import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
// import fonts from '../theme/fonts';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { COLORS } from '../../Constants/COLORS';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useAuthStates from '../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import { formatIncompletePhoneNumber } from 'libphonenumber-js';

const CountryCodePicker = ({ phoneNumber, customStyle, setState, state }) => {
    // const [callingCode, setCallingCode] = useState('1');
    // const [countryName, setCountryName] = useState('United States');
    // const [isPickerVisible, setPickerVisible] = useState(false);
    const {authState, setAuthState} = useAuthStates()
    // const [phoneNumber, setPhoneNumber] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');

    const handleCountrySelect = useCallback((country) => {
        // (country.cca2);
        // setCallingCode(country.callingCode[0]);
        // setCountryName(country.name);
        // if (onSelectCountry) {
        //     onSelectCountry(country.callingCode[0]);
        // }
        // console.log(country.callingCode[0]);

        // const newFormattedNumber = formatIncompletePhoneNumber(phoneNumber, country.cca2);
        // setFormattedPhoneNumber(newFormattedNumber);
        // console.log(newFormattedNumber);
        // const formattedNumber = formatIncompletePhoneNumber('1234567890', 'US');
        // console.log(formattedNumber);
        
        
        // setAuthState({
        //     countryCode:  `${country.callingCode[0]}`,
        //     countrySign: country.cca2
        // })
        setState({
            countryCode:  `${country.callingCode[0]}`,
            countrySign: country.cca2
        })
    },[])
    // console.log(formattedPhoneNumber, 'formattedPhoneNumbe');
    

    

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.picker, customStyle]}
                onPress={() => setState({
                    isPickerVisible:true
                })}
            >
                <CountryPicker
                    countryCode={state.countrySign}
                    withFilter
                    withFlag
                    withCallingCode
                    withModal
                    //withAlphaFilter
                    visible={state.isPickerVisible}
                    onClose={() => setState({
                        isPickerVisible:false
                    })}
                    onSelect={handleCountrySelect}
                />
                <Text style={styles.text}>(+{state?.countryCode})</Text>
                <Icon name={'chevron-down'} size={wp(6)} color={COLORS.grayText2} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: wp(2),
        // borderColor: COLORS.grayBg,
        // borderWidth: wp(0.3),
        height: hp(6),
        width: wp(26),
        marginRight: wp(4)
    },
    picker: {
        flexDirection: 'row',
        alignItems: 'center',
        // padding: 10,
        // borderRadius: 12,
        // backgroundColor: "rgba(238, 238, 238, 1)",
    },
    text: {
        // marginLeft: 10,
        fontSize: wp(4),
        color: COLORS.black
        // fontFamily: fonts.fontsType.regular,
    },
});

export default CountryCodePicker;
