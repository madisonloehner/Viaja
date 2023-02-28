import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { textOptions } from './GlobalStyles';
import { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { updateDoc, doc, arrayRemove } from 'firebase/firestore';
import { db, authentication } from '../firebase/firebase-config'


const AcceptedFriends = ({username, uid}) => {
  const user = authentication.currentUser;

  //function to handle friend removal from database
  const onRemoveFriend = async () => {
    try {
      if(user.uid !== uid){
      const removeFriend = doc(db, 'friends', uid);
      const deleteFriend = doc(db, 'friends', user.uid);
      const removeUserFriend = doc(db, 'users', uid);
      const deleteUserFriend = doc(db, 'users', user.uid);
      await updateDoc(removeFriend, {
        friendslist: arrayRemove({"uid": user.uid, "username": user.displayName})
      });
      await updateDoc(removeUserFriend, {
        friends: arrayRemove(user.uid)
      })
      await updateDoc(deleteFriend, {
        friendslist: arrayRemove({"uid": uid, "username": username})
      })
      await updateDoc(deleteUserFriend, {
        friends: arrayRemove(uid)
      })
      }
    } catch(error){
      console.log(error.message)
  }
}

    return (
        <View style = {styles.listItemContainer}>
          <Text style = {textOptions.nameText}>{username}</Text>
        <View style = {{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <View>
            <TouchableOpacity 
            onPress= {onRemoveFriend} 
            style = {styles.removeFriend}>
              <Text style = {textOptions.buttonTxt}>REMOVE FRIEND</Text>
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
    removeFriend :{
      backgroundColor: '#E05F57',
      borderRadius: 25,
      padding: 10,
      marginLeft: 10,
      alignItems: 'center',
    }
});
export default AcceptedFriends