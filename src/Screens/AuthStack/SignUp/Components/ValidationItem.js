import { Text, View,StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { COLORS } from "../../../../Constants/COLORS";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export const ValidationItem = ({ isValid, label, iconName, iconColor, iconBgColor }) => (
    <View style={styles.validationItem}>
      <View style={{
                        paddingHorizontal: wp(0.5),
                        paddingVertical: wp(0.5),
                        borderRadius: 10,
                        backgroundColor:isValid ? "#24A85B" : COLORS.grayBg, 
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Icon
                            name={isValid? 'check' : 'close'}
                            color={isValid? COLORS.white: 'grey'}
                            size={wp(3)}
                        />
                    </View>
      <Text style={styles.validationText}>{label}</Text>
    </View>
  );


  const styles = StyleSheet.create({
    validationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
      validationText:{
        marginLeft: wp(3),
        color: COLORS.grayText2
      }
  })