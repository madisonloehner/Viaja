import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import { useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { textOptions } from './GlobalStyles';
import { authentication, db} from '../firebase/firebase-config';
import { doc, arrayUnion, updateDoc} from 'firebase/firestore';

export const Item = ({name, username, uid}) => {
    const [pending, setPending] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const user = authentication.currentUser;

    //function to handle sending a friend request to another user.
    const handleAddFriend = async () => {
      try {
      if(uid === user.uid) {
        console.log("you cannot send a friend request to yourself!")
        setDisabled(true)
      } else {
          const sendRequest = doc(db, 'users', (user.uid))
          const receivedRequest = doc(db, 'users', uid )
          await updateDoc(sendRequest, {
            sentRequests: arrayUnion(uid)
          });
          await updateDoc(receivedRequest, {
              pendingRequest: arrayUnion({
              uid: user.uid,
              username: user.displayName,
            })
          })
          setDisabled(true)
          setPending(true)
      }
    } catch(error){
        console.log(error)
    }
  };
    
    //function to display an alert when the icon is pressed. 
    const showAlert = () => {
      if(uid !== user.uid) {
        Alert.alert(
            "Alert!",
            "Are you sure you want to send a friend request?", 
            [
                {
                    text: "confirm",
                    onPress: handleAddFriend(),
                    onPress: setPending(true),
                    onPress: setDisabled(true),
                },
                {
                    text: "cancel",
                    onPress: setDisabled(false),
                    onPress: setPending(false),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true, 
            } 
        )
    }
  }
  return (
    <View>
    <View style = {styles.listItemContainer}>
      <View style = {styles.itemContainer}>
      <Text style = {textOptions.nameText}>{name}</Text>
      <Text style = {textOptions.usernameText}>{username}</Text>
      </View>
        <View style = {{flexDirection: 'row', justifyContent: 'space-evenly',}}>
        <TouchableOpacity disabled = {disabled} onPress={showAlert}>
          <MaterialCommunityIcons
            style = {{marginEnd: 10}}
            name = {pending ? 'check': 'plus-circle'}
            raised
            size = {35}
            color = {'#05B479'}
            />
        </TouchableOpacity>
      </View>
    </View>
  </View>
  )
}

const styles = StyleSheet.create ({
    listItemContainer: {
      backgroundColor: 'white', 
      padding: 20, 
      flexDirection: 'row', 
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    
    itemContainer: {
      justifyContent: 'center',
      paddingLeft: 10,
    },
  })
