import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
/**
 * Function to pick image from gallery and convert to base64
 * @param {function} setState - Function to set the state of the image
 * @param {string} key - Key to differentiate between selfie and id image
 */
export const pickImageFromGallery = async (setState, key, navigation) => {

  const options = {
    mediaType: 'photo',
    includeBase64: true,
    maxWidth: 300,  // Optional: Adjust max width and height
    maxHeight: 400,
    quality: 0.8,  // Adjust image quality
  };

  launchImageLibrary(options, (response) => {
    // const navigation = useNavigation();

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.errorMessage) {
      console.error('ImagePicker Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image = response.assets[0];
      const base64Image = `data:${image.type};base64,${image.base64}`;
      if (key === 'selfie') {
        setState({
          Selfie: base64Image,
          heading: 'Upload Image',
          base64Selfie: image.base64,


        });
        navigation?.navigate('ImagePreview', { key: key, image: image.uri })
      } else if (key === 'id') {
        setState({
          IdImage: base64Image,
          heading: 'Upload Image',
          idUri: image.uri

        });
        navigation?.navigate('ImagePreview', { key: key, image: image.uri })
      } else if (key === 'idfile') {
        setState({
          IdFileImage: image.uri,
          idUri: image.uri

        });
        navigation?.replace('ImagePreview', { key: key, image: image.uri })

      } else if (key === 'editSelfie') {
        setState({
          heading: 'Upload Image',
          uploadSelfieUri: image.uri,
          Selfie: image.uri
        });
        navigation?.navigate('ImagePreview', { key: 'uploadSelfieUri', image: image.uri })
      }
    }
  });
};

/**
 * Function to capture image using front camera and convert to base64
 * @param {function} setState - Function to set the state of the image
 * @param {string} key - Key to differentiate between selfie and id image
 */
export const captureImageFromCamera = async (setState, key, navigation) => {

  const options = {
    mediaType: 'photo',
    includeBase64: true,
    maxWidth: 300,  // Optional: Adjust max width and height
    maxHeight: 400,
    quality: 0.8,  // Adjust image quality
    cameraType: 'front',  // Use the front camera
  };

  launchCamera(options, (response) => {
    // const navigation = useNavigation();

    if (response.didCancel) {
      console.log('User cancelled camera');
    } else if (response.errorMessage) {
      console.error('Camera Error: ', response.errorMessage);
    } else if (response.assets && response.assets.length > 0) {
      const image = response.assets[0];
      const base64Image = `data:${image.type};base64,${image.base64}`;
      if (key === 'selfie') {
        setState({
          Selfie: base64Image,
          heading: 'Captured Image',
          base64Selfie: image.base64,
          selfieUri: image.uri


        });
        navigation?.navigate('ImagePreview', { key: key, image: image.uri })

      } else if (key === 'id') {
        setState({

          IdImage: base64Image,
          heading: 'Captured Image',
          idUri: image.uri

        });
        navigation?.navigate('ImagePreview', { key: key, image: image.uri })

      }
      else if (key === 'idfile') {
        setState({
          IdFileImage: image.uri,
          idUri: image.uri

        });
        navigation?.replace('ImagePreview', { key: key, image: image.uri })

      } else if (key === 'editSelfie') {
        setState({
          heading: 'Upload Image',
          uploadSelfie64: image.base64,
          Selfie: image.uri

        });
        navigation?.navigate('ImagePreview', { key: 'selfieCamera', image: image.uri })
      }
    }
  });
};
