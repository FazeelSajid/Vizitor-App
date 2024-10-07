import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useMemo } from 'react'
import CountryPicker from 'react-native-country-picker-modal';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

import {
    BottomSheetBackdrop,
    BottomSheetFlatList,
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
import useAuthStates from '../../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
  


const CountryPickerBtmSheet = ({bottomSheetRef}) => {

    const renderBackdrop = useCallback(
        props => (
          <BottomSheetBackdrop
            {...props}
            opacity={0.7} // Adjust backdrop opacity
            appearsOnIndex={0} // Index at which the backdrop appears
            disappearsOnIndex={-1} // Index at which the backdrop disappears
          />
        ),
        [],
      );
    
      const snapPoints = useMemo(() => [hp('50%'), hp('70%')], []);

      const handleCloseModalPress = useCallback(() => {
        bottomSheetRef.current?.dismiss();
      }, []);

      const {authState, setAuthState} = useAuthStates()

      const handleCountrySelect = (country) => {
          (country.cca2);
          // setCallingCode(country.callingCode[0]);
          // setCountryName(country.name);
          // if (onSelectCountry) {
          //     onSelectCountry(country.callingCode[0]);
          // }
          // console.log(country.callingCode[0]);
          
          setAuthState({
              countryCode:  country.callingCode[0],
              countrySign: country.cca2
          })
      };

  return (
    <BottomSheetModal
    ref={bottomSheetRef}
    index={0}
    snapPoints={snapPoints}
    backgroundStyle={styles.bottomSheetBackground}
    backdropComponent={renderBackdrop}>
         {/* <CountryPicker
                    countryCode={'+1'}
                    withFilter
                    withFlag
                    withCallingCode
                    withModal
                    //withAlphaFilter
                    visible={true}
                    onClose={() => setAuthState({
                        isPickerVisible:false
                    })}
                    onSelect={handleCountrySelect}
                /> */}
    </BottomSheetModal>
  )
}

export default CountryPickerBtmSheet

const styles = StyleSheet.create({})