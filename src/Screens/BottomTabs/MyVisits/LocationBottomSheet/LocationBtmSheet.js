import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform} from 'react-native';
import {COLORS} from '../../../../Constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CheckBoxBlueTick from '../../../../assets/Svgs/selectedCheck.svg';
import Search from '../../../../assets/Svgs/Search.svg';
import CrossIcon from '../../../../assets/Svgs/crossIcon.svg';
import EmptySearch from '../../../../assets/Svgs/emptySearch.svg';
import {fonts} from '../../../../../assets/fonts/fonts';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import TxtInput from '../../../../Components/TxtInput/TxtInput';
import CustomButton from '../../../../Components/Buttons/customButton';
import {useNavigation} from '@react-navigation/native';
import useAppStates from '../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { styles } from './styles';

const Location = ({location, bottomSheetRef, setSelected, selectLocation, onClose}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLoc, setSelectedLoc] = useState(selectLocation);
  const {setAppState} = useAppStates()
  const snapPoints = useMemo(() => [hp('50%'), hp('70%')], []);
  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.7} 
        appearsOnIndex={0} 
        disappearsOnIndex={-1} 
      />
    ),
    [],
  );

  const navigation = useNavigation();

  const toggleLocationSelection = location => {
    setAppState({isLoading: true});
    setSelectedLoc(location);
    setSelected(location); 
    onClose()
  };

  const filteredLocations = location.filter(location =>
    location.Branch.toLowerCase().includes(searchQuery.toLowerCase()),
  );


  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      // backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}>
      {/* <FilterBottomSheet bottomSheetRef={bottomSheetRef} /> */}
      <CustomButton
        svg={<CrossIcon />}
        containerStyle={{alignSelf: 'flex-end', marginRight: wp(5)}}
        onPress={onClose}
      />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Choose Location</Text>
            <TxtInput
            placeholder={'Search'}
            selectableColor={COLORS.black}
            placeholderTextColor={COLORS.darkGraytext}
            containerStyle={[styles.txtInput, Platform.OS === 'ios' && {height: hp(5.4)}]}
            svg={<Search />}
            onChangeText={setSearchQuery}
            leftIcon={searchQuery.length > 0 && 'close-circle-outline'}
            leftIconColor={COLORS.primary}
            leftIconSize={wp(6)}
            leftBtnStyle={{paddingHorizontal: wp(3)}}
            leftBtnPress={()=> setSearchQuery('')}
            value={searchQuery}
          />
        </View>

        {/* Friends List */}
        <BottomSheetFlatList
          data={filteredLocations}
          keyExtractor={item => item.BranchID.toString()}
          ListEmptyComponent={
            <View style={styles.ListEmptyComponent}>
              <EmptySearch />
            </View>
          }
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.friendContainer}
              onPress={() => toggleLocationSelection(item)}>
              <View style={styles.friendInfo}>
                <Text style={styles.locationName}>
                  {item.CompanyWIthBranch}
                </Text>
              </View>
              {
                selectLocation.BranchID === item.BranchID && (
                  <CheckBoxBlueTick width={wp(6)} />
                )}
            </TouchableOpacity>
          )}
          scrollEnabled={true}
        />
      </View>
    </BottomSheetModal>
  );
};



export default Location;
