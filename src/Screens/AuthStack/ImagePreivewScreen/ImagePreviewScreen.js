import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomHeader from '../../../Components/CustomHeader/CustomHeader';
import ArrowLeft from '../../../assets/Svgs/arrowLeft.svg';
import {styles} from './Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../Components/Buttons/customButton';
import Retry from '../../../assets/Svgs/retry.svg';
import useAuthStates from '../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates';
import {
  captureImageFromCamera,
  pickImageFromGallery,
} from '../../../Utils/ImgePicker';
import Model from '../../../Components/Modal/Modal';
import UploadID from '../../../assets/Svgs/uploadPhoto.svg';
import CaptureSelfie from '../../../assets/Svgs/captureSelfie.svg';
const ImagePreviewScreen = ({route, navigation}) => {
  const {key} = route.params;
  const {setAuthState, authState} = useAuthStates();
  // console.log(authState.heading, 'preview screen');
  const [showPictureModal, setshowPictureModal] = useState(false);

  return (
    <View style={styles.container}>
      <CustomHeader
        heading={authState.heading}
        leftSvg={<ArrowLeft />}
        leftOnpress={() => navigation.goBack()}
        containerStyle={styles.headerContainer}
        headingStyle={{marginRight: wp(10)}}
      />
      <Image
        source={{
          uri:
           key === 'id' ? authState.IdImage: authState.Selfie
        }}
        style={styles.image}
        resizeMode="cover"
      />


      <CustomButton
        svg={<Retry />}
        containerStyle={styles.retryBtnImagePreview}
        onPress={() =>
          key === 'selfie'
            ? captureImageFromCamera(setAuthState, 'selfie',navigation)
            : setshowPictureModal(true)
        }
        pressedRadius={wp(10)}
      />
      <CustomButton
        text={'Upload'}
        containerStyle={styles.btn}
        textStyle={styles.btnText}
        onPress={() => navigation.goBack()}
        pressedRadius={wp(8)}
      />

      <Model
        visible={showPictureModal}
        containerStyle={{paddingBottom: hp(5)}}
        onClose={() => setshowPictureModal(false)}>
        <Text style={styles.modalText}>Upload ID</Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <View>
            <CustomButton
              containerStyle={styles.uploadbtnModal}
              svg={<UploadID />}
              onPress={() => {
                setshowPictureModal(false);
                pickImageFromGallery(setAuthState, 'id', navigation);
              }}
              pressedRadius={wp(10)}
            />
            <Text style={styles.upoadBtntextModal}>Gallery</Text>
          </View>
          <View>
            <CustomButton
              containerStyle={styles.uploadbtnModal}
              svg={<CaptureSelfie />}
              onPress={() => {
                setshowPictureModal(false);
                captureImageFromCamera(setAuthState, 'id', navigation);
              }}
              pressedRadius={wp(10)}
            />
            <Text style={styles.upoadBtntextModal}>Capture</Text>
          </View>
        </View>
      </Model>
    </View>
  );
};

export default ImagePreviewScreen;
