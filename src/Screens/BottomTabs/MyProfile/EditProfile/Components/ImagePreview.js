import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from '../Style'
import CustomButton from '../../../../../Components/Buttons/customButton'
import Edit from '../../../../../assets/Svgs/edit.svg'
import { useNavigation } from '@react-navigation/native'
import useAuthStates from '../../../../../ReduxToolkit/Hooks/AuthHooks/StateHooks/useAuthStates'
import { widthPercentageToDP as wp } from 'react-native-responsive-screen'

const ImagePreview = ({image, heading}) => {
  // console.log(image, 'imagepreview');
  const navigation = useNavigation()
  const {setAuthState} = useAuthStates()
  
  return (
    <View style={{}} >
    <Image source={image} style={styles.ImagePreview} resizeMode='cover' />
    <CustomButton svg={<Edit/>} containerStyle={styles.editBtnImagePreview} onPress={()=> {
      setAuthState({
        heading: heading
      })
      navigation.navigate('ImagePreview', {image})}} 
      pressedRadius={wp(10)}
      />

   </View>
  )
}

export default ImagePreview
