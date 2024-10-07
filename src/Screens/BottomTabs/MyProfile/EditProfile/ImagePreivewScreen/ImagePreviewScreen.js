import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomHeader from '../../../../../Components/CustomHeader/CustomHeader';
import ArrowLeft from '../../../../../assets/Svgs/arrowLeft.svg';
import { styles } from './Styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import CustomButton from '../../../../../Components/Buttons/customButton';
import Retry from '../../../../../assets/Svgs/retry.svg';
import { captureImageFromCamera, pickImageFromGallery } from '../../../../../Utils/ImgePicker';
import Model from '../../../../../Components/Modal/Modal';
import UploadID from '../../../../../assets/Svgs/uploadPhoto.svg';
import CaptureSelfie from '../../../../../assets/Svgs/captureSelfie.svg';
import Warning from '../../../../../assets/Svgs/Warning.svg';
import Success from '../../../../../assets/Svgs/success.svg';
import Edit from '../../../../../assets/Svgs/gray.svg';
import useAppStates from '../../../../../ReduxToolkit/Hooks/AppHooks/useAppStates/useAppStates';
import { WithNetworkCheck } from '../../../../../Utils/Utilities';
import useApis from '../../../../../ReduxToolkit/Hooks/AppHooks/UseApis/useApi';
import Loader from '../../../../../Components/Loader/loader';
import { COLORS } from '../../../../../Constants/COLORS';
import PopUp from '../../../../../Components/NotifyPopUp/PopUp';

const ImagePreviewScreen = ({ route, navigation }) => {
  const { key, image } = route.params; // Handle everything through params
  const [showPictureModal, setShowPictureModal] = useState(false);

  // const [image, setimage] = useState();

  const [keys, setKeys] = useState(key)
  const { setAppState, appState, PersistedAuth } = useAppStates()
  const { fetchApis} = useApis()

  // console.log(keys, 'keys');

  useEffect(() => {

    if (key === 'idfile') {
      WithNetworkCheck(async () => {
        setAppState({ isLoading: true });

        const body = {
          "Data": {
            "FileName": appState.idFile
          },
          "IsPlatform": false,
          "ClientId": "89248",
          "OrgId": "65",
          "RoleId": "66"
        };
        const endPoint = '/api/general/VizitrUserProfile/ViewFile'
        const header =  {
          "Authorization": `Bearer ${PersistedAuth.authToken}`, // Ensure body has 'authToken'
          'Content-Type': 'application/json'  // Add Content-Type header
        }
          // const response = await ViewIdFile(body, setAppState);
          const response = await fetchApis(endPoint, header, JSON.stringify(body), setAppState);


          setAppState({
            isLoading: true
          })
          if (response.Response.apiResponse) {
            setAppState({
              isLoading: false,
              IdFileImage: response.Response.apiResponse
            })


          }
       
      }, setAppState);
    }
  }, [])


  const handleCaptureUpload = async () => {

    WithNetworkCheck(async () => {

      setAppState({ isLoading: true });

      const endPoint = '/api/common/VizitrUserProfile/ProfilePictureSave'
      const header =  {
        "Authorization": `Bearer ${PersistedAuth.authToken}`, // Ensure body has 'authToken'
        'Content-Type': 'multipart/form-data',
      }

      const payload = {
        "Data": {
          "SelfieCaptured": appState.uploadSelfie64
        },
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66",
        "IsPlatform": false
      }

      const formData = new FormData();
    formData.append('Request', JSON.stringify(payload))
        // const response = await ViewIdFile(body, setAppState);
        const response = await fetchApis(endPoint, header, formData, setAppState);

    


      if (response.Response.apiResponse.IsUpdated === true) {
        setAppState({
          isLoading: false,
          successPop: true,
          successPopMsg: 'Profile picture updated successfully',
        })
        setTimeout(() => {
          navigation.goBack()
          setAppState({
            successPop: false,
            successPopMsg: '',
            isLoading: false
          })
        }, 1000);
      }

    }, setAppState)

  }

  const handleGalleryUpload = async () => {

    WithNetworkCheck(async () => {

      setAppState({ isLoading: true });
      const endPoint = '/api/common/VizitrUserProfile/ProfilePictureSave'
      const header =  {
        "Authorization": `Bearer ${PersistedAuth.authToken}`, // Ensure body has 'authToken'
        'Content-Type': 'multipart/form-data',
      }

      const payload = {
        "Data": {
          "SelfieCaptured": ""
        },
        "ClientId": "89248",
        "OrgId": "65",
        "RoleId": "66",
        "IsPlatform": false
      }

      const formData = new FormData();

    formData.append('IdFile', {
      uri: appState.uploadSelfieUri,
      type: 'image/jpeg',
      name: 'id.jpg',
    })
    formData.append('Request', JSON.stringify(payload))



        // const response = await ViewIdFile(body, setAppState);
        const response = await fetchApis(endPoint, header, formData, setAppState);


      // const response = await editSelfieGallery({
      //   authToken: PersistedAuth.authToken,
      //   Selfie: appState.uploadSelfieUri
      // }, setAppState)


      if (response.Response.apiResponse.IsUpdated === true) {
        setAppState({
          isLoading: false,
          successPop: true,
          successPopMsg: 'Profile picture updated successfully',
        })
        setTimeout(() => {
          navigation.goBack()
          setAppState({
            successPop: false,
            successPopMsg: '',
            isLoading: false
          })
        }, 1000);
      }

    }, setAppState)




  }


  return (
    <View style={styles.container}>

      {appState.errorPop && (
        <PopUp
          heading={appState.errorPopMsg}
          svg={<Warning width={wp(8)} />}
          color={'#F2C6C6'}
          txtColor={'#E12929'}
        />
      )}
      {appState.successPop && (
        <PopUp
          heading={appState.successPopMsg}
          svg={<Success width={wp(8)} />}
          color={'#E7FFC5'}
          txtColor={'#0F4124'}
        />
      )}

      {
        key === 'id' || key === 'selfieCamera' || key === 'uploadSelfieUri' ? <CustomHeader
          heading={appState.heading}
          leftSvg={<ArrowLeft width={wp(7)} />}
          leftOnpress={() => navigation.goBack()}
          containerStyle={styles.headerContainer}
          headingStyle={{ marginRight: wp(10), fontSize: wp(5) }}
          rightSvg={<Edit width={wp(7)} />}
          rightOnPress={() => {
            if (key === 'selfieCamera' || key === 'uploadSelfieUri') {
              setKeys('editSelfie')
            }
            setShowPictureModal(true)
          }}
        /> : <CustomHeader
          heading={appState.heading}
          leftSvg={<ArrowLeft width={wp(7)} />}
          leftOnpress={() => navigation.goBack()}
          containerStyle={styles.headerContainer}
          headingStyle={{ marginRight: wp(0), fontSize: wp(5) }}

        />
      }
      {
        appState.isLoading ? <View style={styles.LoaderContainer}>
          <Loader size={wp(10)} color={COLORS.primary} />
        </View> : key === 'idfile' ?
          <Image
            source={{ uri: appState.IdFileImage }}
            style={styles.image}
            resizeMode="cover"
          /> : <Image
            source={{ uri: image }}
            style={styles.image}
            resizeMode="cover"
          />
        // <Image
        //   source={{ uri: key === 'selfie' ? appState.Selfie : key === 'id' ? appState.idUri : key === 'idfile' ? appState.IdFileImage : 'editSelfie' }}
        //   style={styles.image}
        //   resizeMode="cover"
        // />

      }
      {
        key === 'id' || key === 'selfieCamera' || key === 'uploadSelfieUri' ?
          <CustomButton
            text={key === 'id' ? 'Confirm' : 'Upload'}
            containerStyle={styles.btn}
            textStyle={styles.btnText}
            onPress={() => {

              key === 'id' ? navigation.goBack() : key === 'selfieCamera' ? handleCaptureUpload() : handleGalleryUpload()

            }}
            isLoading={appState.isLoading}
            pressedRadius={wp(8)}
          /> : null
      }





      <Model
        visible={showPictureModal}
        containerStyle={{ paddingBottom: hp(5) }}
        onClose={() => setShowPictureModal(false)}>
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
              pressedRadius={wp(100)}
              svg={<UploadID />}
              onPress={() => {
                setShowPictureModal(false);
                pickImageFromGallery(setAppState, keys, navigation); // Use onRetry to handle gallery selection
              }}
            />
            <Text style={styles.upoadBtntextModal}>Gallery</Text>
          </View>
          <View>
            <CustomButton
              containerStyle={styles.uploadbtnModal}
              pressedRadius={wp(100)}
              svg={<CaptureSelfie />}
              onPress={() => {
                setShowPictureModal(false);
                captureImageFromCamera(setAppState, keys, navigation); // Use onRetry for capturing a new image
              }}
            />
            <Text style={styles.upoadBtntextModal}>Capture</Text>
          </View>
        </View>
      </Model>
    </View>
  );
};

export default ImagePreviewScreen;
