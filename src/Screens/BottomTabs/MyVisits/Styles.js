import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import {fonts} from '../../../../assets/fonts/fonts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bgColor,
  },
  headingContainer: {
    paddingTop: hp(7),
    backgroundColor: COLORS.white,
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    paddingBottom: hp(2),
    justifyContent: 'space-between',
    alignItems: 'center',
    // flex: 1,
  },
  heading: {
    fontFamily: fonts.bold,
    color: COLORS.black,
    fontWeight: '700',
    fontSize: hp(2.5),

    textAlignVertical: 'center',
  },
  DropdownBtn: {
    backgroundColor: COLORS.bgColor,
    paddingVertical: hp(1),
    paddingHorizontal: wp(3),
    borderColor: COLORS.grayText2,
    borderWidth: wp(0.3),
    borderRadius: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  DropdownBtnText: {
    color: COLORS.grayText2,
    fontSize: wp(3.5),
    marginRight: wp(2.5),
  },
  ListEmptyComponentTxt: {
    fontFamily: fonts.bold,
    color: COLORS.black,
    textAlign: 'center',
    fontSize: wp(6),
  },
  LocationIntemContainer: {
    backgroundColor: COLORS.white,
    paddingVertical: hp(2),
    paddingHorizontal: wp(5),
    marginBottom: hp(2),
    borderRadius: wp(2),
  },
  emailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  email: {
    color: COLORS.black,
  },
  companyName: {
    color: COLORS.darkGraytext,
    fontSize: hp(1.8),
    marginTop: hp(1),
    fontFamily: fonts.medium,
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: hp(2),
    // paddingHorizontal: wp(7),
    alignItems: 'center',
  },
  time: {
    color: COLORS.black,
    marginLeft: wp(5)
  },
  LoaderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
