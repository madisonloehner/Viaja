import { View, Text, StyleSheet, TouchableOpacity , Alert} from 'react-native';
import { useState } from 'react';
import { textOptions } from '../components/GlobalStyles';
import { authentication, db} from '../firebase/firebase-config';
import { doc, arrayUnion, arrayRemove, updateDoc } from 'firebase/firestore';

export const FriendItem = ({uid, username}) => {
    const [accepted, setAccepted] = useState(false);
    const [declined, setDeclined] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const user = authentication.currentUser;

    //function to handle an accepted friend request in database
    const onConfirmPressed = async () => {
      try {
        const acceptRequest = doc(db,'friends', (user.uid));
        const respondedRequest = doc(db, 'friends', (uid));
        const removeRequest = doc(db, 'users', (user.uid));
        const removeSent = doc(db, 'users', (uid));
        const addFriend = doc(db, 'users', user.uid);
        const friendAdded = doc(db, 'users', uid);
        await updateDoc(acceptRequest, {
          friendslist: arrayUnion({"uid": uid, "username": username})
        });
        await updateDoc(addFriend, {
          friends: arrayUnion(uid)
        });
        await updateDoc(friendAdded, {
          friends: arrayUnion(uid)
        });
        await updateDoc(respondedRequest, {
          friendslist: arrayUnion({"uid": user.uid, "username": user.displayName})
        });
        await updateDoc(removeRequest, {
          pendingRequest: arrayRemove({"uid": uid, "username": username})
        });
        await updateDoc(removeSent, {
          sentRequests: arrayRemove(user.uid)
        });
      } catch(error) {
        console.log(error)
      }
      setAccepted(true)
    };

    //function to handle declined friend request in database
    const onDeclinedPressed = async () => {
      try {
        const declineRequest = doc(db, 'users', (user.uid));
        const removeSent = doc(db, 'users', (uid));
        await updateDoc(declineRequest, {
          pendingRequest: arrayRemove({"uid": uid, "username": username})
        });
        await updateDoc(removeSent, {
          sentRequests: arrayRemove(user.uid)
        })
      } catch(error) {
        console.log(error)
      }
    };

    return (
      <View style = {styles.container}>
        <Text style = {textOptions.nameText}>{username}</Text>
      <View style = {styles.listItemContainer}>
          <TouchableOpacity 
            disabled = {disabled} 
            onPress = {onConfirmPressed}
            style = {styles.confirmButton}>
              <Text style = {textOptions.buttonTxt}>CONFIRM</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style = {styles.declineButton}
            onPress = {onDeclinedPressed}>
              <Text style = {textOptions.buttonTxt}>DECLINE</Text>
          </TouchableOpacity>
        </View>
    </View>
    )
  }
  
  const styles = StyleSheet.create ({
      listItemContainer: {
        backgroundColor: 'white', 
        padding: 10,
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        alignItems: 'center'
      },

      container: {
        padding: 20, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
      
      confirmButton:{
        backgroundColor: '#54BC99',
        borderRadius: 25,
        padding: 10,
        alignItems: 'center',
      }, 

      declineButton: {
        backgroundColor: '#E05F57',
        borderRadius: 25,
        padding: 10,
        marginLeft: 10,
        alignItems: 'center',
      }
    })
