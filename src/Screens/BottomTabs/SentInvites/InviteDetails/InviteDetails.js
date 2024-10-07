import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './Styles'
import ArrowLeft from '../../../../assets/Svgs/arrowLeft.svg'
import DummyQR from '../../../../assets/Svgs/dummyQR.svg'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import CustomHeader from '../../../../Components/CustomHeader/CustomHeader';
import { fonts } from '../../../../../assets/fonts/fonts'



const InviteDetails = ({navigation, route}) => {
  const {Invite} = route.params
  // console.log(Invite, 'invite');
  
  return (
    <ScrollView style={styles.container} >
     <CustomHeader
        heading={'Sent Invite'}
        leftSvg={<ArrowLeft width={wp(7)}  />}
        leftOnpress={() => navigation.goBack()}
        containerStyle={styles.headerContainer}
        headingStyle={{marginRight: wp(30), fontWeight: '650', fontFamily: fonts.medium }}
      />
      <View style={styles.contentContainer} >
      
        <Text style={styles.label} >Invited By:</Text>
        <Text style={styles.labelValue} >{Invite.EmailId}</Text>
        {Invite.FullName && Invite.FullName !== 'Not Provided ' && Invite.FullName !== 'Not Provided'? (
  <>
    <Text style={styles.label}>Name:</Text>
    <Text style={styles.labelValue}>{Invite.FullName}</Text>
  </>
) : null}
{
Invite.Title &&
  <>
  <Text style={styles.label} >Meeting Title:</Text>
  <Text style={styles.labelValue} >{Invite.Title}</Text>
  </>
  
}
        
        {Invite.Phone && Invite.Phone !== 'Not Provided ' && Invite.Phone !== 'Not Provided'? (
  <>
     <Text style={styles.label} >Phone No:</Text>
     <Text style={styles.labelValue} >{Invite.Phone}</Text>
  </>
) : null}
        {Invite.Company && <>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.labelValue}>{Invite.Company}</Text>
        </> }
        {Invite.Branch && <>
          <Text style={styles.label}>Location:</Text>
          <Text style={styles.labelValue}>{Invite.Branch}</Text>
        </> }
        <Text style={styles.label} >Created Date:</Text>
        <Text style={styles.labelValue} >{Invite.Date}</Text>
        {Invite.Company && <>
          <Text style={styles.label} >Company:</Text>
        <Text style={styles.labelValue} >{Invite.Company}</Text>
        </> }
       
        <Text style={styles.label} >Expected Check-In: </Text>
        <Text style={styles.labelValue} >{Invite.ExpectedCheckIn}</Text>
        <Text style={styles.label} >Expected Check-Out: </Text>
        <Text style={styles.labelValue} >{Invite.ExpectedCheckOut}</Text>
        {Invite.Purpose && <>
          <Text style={styles.label}>Purpose:</Text>
          <Text style={styles.labelValue}>{Invite.Purpose}</Text>
        </> }
      </View>
    </ScrollView>
  )
}

export default InviteDetails

