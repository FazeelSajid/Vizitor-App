import { StyleSheet } from 'react-native';
import { COLORS } from '../../../../Constants/COLORS';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { fonts } from '../../../../../assets/fonts/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    paddingHorizontal: wp(5),
    // justifyContent: 'flex'
  },
  heading: {
    fontFamily: fonts.medium,
    fontSize: wp('6%'),
    textAlign: 'center',
    // paddingTop: wp('3%'),
    color: COLORS.secondry,
  },
  profileImage: {
    width: wp('35%'),
    height: hp('17.5%'),
    borderRadius: wp('100%'),
    marginBottom: hp('2%'),
  },
  editBtnImagePrevie: {
    backgroundColor: COLORS.secondry,
    paddingVertical: hp(1),
    paddingHorizontal: wp(2.2),
    position: 'absolute',
    // top: 25,
    right: 110,
    borderRadius: wp(10),
    bottom: 20
    // justifyContent: 'center',
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
    flexDirection: 'row',
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
    flexGrow: 1,
    paddingHorizontal: wp(5),

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
  changeBtn: { borderColor: COLORS.secondry, paddingVertical: hp(0.3), paddingHorizontal: hp(0.6), borderWidth: wp(0.3), marginRight: wp(4), borderRadius: wp(1) },
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
    justifyContent: 'center',
  },
  icon:{
    backgroundColor: 'green'
  }
});
