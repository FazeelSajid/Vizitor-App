import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../../../../assets/fonts/fonts';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    // justifyContent: 'center',
    paddingHorizontal: wp(10),
    // alignItems: 'center',
    paddingVertical: wp(5),
  },
  skipBtn: {
    color: COLORS.secondry,
    fontFamily: fonts.regular,
    alignSelf: 'flex-end',
  },
  imgContainer: {
    justifyContent: 'center',
    paddingTop: wp(10),
    alignItems: 'center',
  },
  text: {
    color: COLORS.black,
    fontSize: wp(5),
    fontFamily: fonts.bold,
    textAlign: 'center',
    lineHeight: wp(8),
    marginTop: hp(2),
    // width: wp(60)
  },
  continueButtonContainer: {
    backgroundColor: COLORS.primary,
    paddingVertical: wp(3),
    borderRadius: wp(6),
    
  },
  continueButtonText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontFamily: fonts.medium,
    fontSize: wp(4),
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    // marginTop: hp(3),
  },
  dot: {
    height: wp(2),
    borderRadius: wp(2.5),
    marginHorizontal: wp(1),
  },
});
