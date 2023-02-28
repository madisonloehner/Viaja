import { View, Text, StyleSheet } from 'react-native';
import { textOptions } from '../components/GlobalStyles';
import { authentication } from '../firebase/firebase-config';

export const LocationItem = ({ time, location }) => {
    const user = authentication.currentUser
  return (
    <View style = {styles.container}>
    <Text style = {textOptions.nameText}> {location}</Text>
    <Text>{time}</Text>
  <View style = {styles.listItemContainer}>
    </View>
    </View>
  )
}
const styles = StyleSheet.create ({
    listItemContainer: {
      backgroundColor: 'white', 
      padding: 10,
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center'
    },
    container: {
        padding: 20, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
    }
})