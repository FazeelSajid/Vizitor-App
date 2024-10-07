import React, {useCallback, useMemo, useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Platform} from 'react-native';
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

const Location = ({
  location,
  bottomSheetRef,
  setSelected,
  selectedLocation,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [selectedLoc, setSelectedLoc] = useState(selectedLocation);
  const snapPoints = useMemo(() => [hp('50%'), hp('70%')], []);
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
  // console.log(selectedLocation, 'selectedLocation');

  const toggleLocationSelection = location => {
    setSelectedLoc(location); // Always select the location
    setSelected(location); // Update the selected state
    // getInvites({
    //   BranchID: location.BranchId,
    //   authToken: signinState.authToken,
    // });
    handleCloseModalPress(); // Close the modal after selection
  };
  const filteredLocations = location.filter(location =>
    location.Branch.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const showTabBar = () => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'flex',
      },
    });
  };
  const handleCloseModalPress = useCallback(async() => {

    await bottomSheetRef.current?.dismiss();

    showTabBar();

  }, []);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      snapPoints={snapPoints}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={renderBackdrop}>
      {/* <FilterBottomSheet bottomSheetRef={bottomSheetRef} /> */}
      <CustomButton
        svg={<CrossIcon />}
        containerStyle={{alignSelf: 'flex-end', marginRight: wp(5)}}
        onPress={handleCloseModalPress}
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
          keyExtractor={item => item.BranchId.toString()}
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
                  {item.CompanyWithBranch}
                </Text>
              </View>
              {
                selectedLocation.BranchId === item.BranchId && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(4), // Responsive padding
  },
  header: {
    marginTop: hp(2.5), // Responsive margin
    marginBottom: hp(1.25), // Responsive margin
  },
  title: {
    fontSize: wp(5.5), // Responsive font size
    //   fontWeight: 'bold',
    color: COLORS.secondry,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    marginBottom: hp(2),
  },

  txtInput: {
    borderRadius: wp(2),
    borderColor: COLORS.grayBg,
    borderWidth: wp(0.3),
    backgroundColor: '#F7F7F7',
    color: COLORS.black,
  },
  friendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(1.25), // Responsive padding
    //   borderBottomWidth: 1,
    //   borderBottomColor: COLORS.lightGray,
  },
  friendInfo: {
    flex: 1,
  },
  locationName: {
    fontSize: wp(4.5), // Responsive font size
    color: COLORS.black,
    fontFamily: fonts.regular,
  },
  followerCount: {
    fontSize: wp(3.5), // Responsive font size
    color: COLORS.darkGray,
    //   fontFamily: fonts.medium,
  },
  buyButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    borderRadius: wp('3%'),
    marginBottom: hp('3%'),
    width: wp(70),
    alignSelf: 'center',
    flexDirection: 'row',
    position: 'absolute',
    bottom: hp('2%'),
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: wp('4%'),
    fontFamily: fonts.medium,
  },
  ButtonArrowLogo: {position: 'absolute', right: 10, bottom: 15},
  ListEmptyComponent: {
    alignSelf: 'center',
    marginTop: hp(10),
    marginBottom: hp(10),
  },
});

export default Location;
