import { View, Text, StyleSheet } from 'react-native';
import { textOptions } from '../components/GlobalStyles';
import { authentication } from '../firebase/firebase-config';

export const LocationFeedItem = ({ time, location, username, uid, clockTime }) => {
    const user = authentication.currentUser
  return (
    <View style = {styles.listItemContainer}>
      <Text style = {textOptions.usernameText}>{username}</Text>
      <Text style = {textOptions.checkIn}>{location}</Text>
      <Text style = {textOptions.nameText}>{clockTime}</Text>
    </View>
  )
}
const styles = StyleSheet.create ({
    listItemContainer: {
      backgroundColor: 'white', 
      padding: 20,
    },
    container: {
        padding: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-evenly'
    }
})