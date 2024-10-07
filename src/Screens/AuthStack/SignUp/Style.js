import {StyleSheet} from 'react-native';
import {COLORS} from '../../../Constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {fonts} from '../../../../assets/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    paddingHorizontal: wp(10),
    // justifyContent: 'flex',
    paddingTop: hp(5)
  },
  scrollView:{
    flex: 1,
    backgroundColor: COLORS.white,
  },
  heading: {
    color: COLORS.secondry,
    // fontFamily: fonts.thin,
    fontSize: hp(3),
    fontWeight: '500',
    marginVertical: hp(4),
  },
  TxtInput: {
    borderRadius: wp(2),
    borderColor: COLORS.grayBg,
    borderWidth: wp(0.3),
    // width: "100%"
  },
  uploadbtn: {
    borderRadius: wp(2),
    borderColor: COLORS.grayBg,
    borderWidth: wp(0.3),
    paddingVertical: hp(1.7),
    marginTop: hp(1.5),
    paddingLeft: wp(3.5),
  },
  uploadbtnModal: {
    borderRadius: wp(100),
    borderColor: COLORS.primary,
    borderWidth: wp(0.3),
    borderStyle: 'dashed',
    paddingVertical: hp(1.7),
    marginTop: hp(1.5),
    // paddingLeft: wp(3.5),
    alignItems: 'center',
    paddingVertical: wp(7),
    paddingHorizontal: wp(7),
    backgroundColor: COLORS.grayBg,
  },
  contentContainer: {
    // flexGrow: 1,
    alignItems: 'center',
    // justifyContent: 'flex-start',  // Ensure content starts from the top
    paddingTop: hp(11),
  },
  inputTitle: {
    color: COLORS.grayText2,
    marginBottom: hp(1),
    marginLeft: wp(0.5),
    marginTop: hp(1.5),
  },
  upoadBtntext: {
    color: COLORS.black,
    // marginBottom: hp(1),
    marginLeft: wp(5),
    // marginTop: hp(1.5)
  },
  upoadBtntextModal: {
    color: COLORS.black,
    marginLeft: wp(4),

    // marginBottom: hp(1),
    // marginLeft: wp(5),

    marginTop: hp(1.5),
  },
  btnContainer: {
    justifyContent: 'flex-end',
    flex: 1,
    marginBottom: hp(6),
  },
  btn: {
    backgroundColor: COLORS.primary,
    // paddingHorizontal: wp(10),
    paddingVertical: hp(1.4),
    borderRadius: wp(8),
    borderColor: COLORS.primary,
    borderWidth: wp(0.5),
    marginVertical: hp(4),
  },
  btnText: {
    color: COLORS.white,
    fontSize: hp(1.8),
    textAlign: 'center',
  },
  inputFilled: {
    color: COLORS.black,
  },
  errorText: {
    color: 'red',
    fontSize: wp(3.5),
    // marginTop: 5,
  },
  popUpMessage: {
    color: COLORS.black,
    textAlign: 'center',
    fontSize: wp('4%'),
    paddingHorizontal: wp(4),
  },
  modalText: {
    color: COLORS.secondry,
    fontSize: wp(4),
    fontWeight: '600',
    textAlign: 'center',
    // width:
  },
  validationContainer: {
    marginTop: 10,
  },
  ImagePreview: {
    height: hp(25),
    width: wp(80),
    borderRadius: wp(2),
    marginTop: hp(1.5),
  },

  editBtnImagePreview: {
    backgroundColor: COLORS.secondry,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2.2),
    position: 'absolute',
    top: 25,
    right: 14,
    borderRadius: wp(10),
  },
});
