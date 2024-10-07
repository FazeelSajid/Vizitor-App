import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { styles } from './Styles'

const CompanyHostsItem = ({item}) => {
  
  return (
    <View style={styles.container} >

      {
        item.Name && item.Name !== " - NA" &&  item.Name !== "NA" ? <>
          <Text style={styles.label}>Company:</Text>
          <Text style={styles.Value}>{item.Name}</Text>
        </>: null
      }
     {
        item.Branch && item.Branch !== " - NA" &&  item.Branch !== "NA" ? <>
          <Text style={styles.label}>Branch:</Text>
          <Text style={styles.Value}>{item.Branch}</Text>
        </>: null
      }
       {
        item.FullAddressLine2 && item.FullAddressLine2 !== " - NA" &&  item.FullAddressLine2 !== "NA" ? <>
         <Text style={styles.label}>Location:</Text>
         <Text style={styles.Value}>{item.FullAddressLine2}</Text>
        </>: null
      }
     
      
    </View>
  )
}

export default CompanyHostsItem
