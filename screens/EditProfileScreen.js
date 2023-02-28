import { View, Text, Platform, KeyboardAvoidingView, StyleSheet, Alert } from 'react-native';
import SubHeader from '../components/SubHeader';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CustomInput from '../components/CustomInput';
import { useState, useEffect, useRef} from 'react';
import GreenButton from '../components/buttons/GreenButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textOptions } from '../components/GlobalStyles';
import { updateProfile } from 'firebase/auth';
import { authentication } from '../firebase/firebase-config';
import { getFunctions, httpsCallable } from 'firebase/functions';

export default function EditProfileScreen ({navigation}) {

    const updateButton = 'submit';
    const [username, setUsername] = useState(''); 
    const [name, setName] = useState(''); 
    const [buttonPressed, setButtonPressed] = useState(false);
    const functions = getFunctions();
    const user = authentication.currentUser;

    useEffect(() => {
      console.log(username)
      setButtonPressed(false)
    }, [username])

    //https callable function to update a user's profile with 
    //username and name 
    const addUserName = httpsCallable(functions, 'onUpdateUserName')
    if(username) {
    updateProfile(user, {
      displayName: username
    }).catch((error)=>{
      console.log(error)
    });
    if(user.displayName){
      addUserName({
      username: username,
      name: name
      }).catch((error) => {
        console.log(error.message)
        })
      } else{
        console.log('username not updated to database')
      }
    } else{
      console.log('display name not updated')
    };

  //sets button pressed to true, redirects to Profile Screen
    const onUpdateButtonPressed = () => {
      setButtonPressed(true)
      navigation.reset({
        index: 0, 
        routes: [{name: 'ProfileScreen'}]
      })
  };

  return (
    <SafeAreaView  style = {styles.container}>
      <View style = {styles.formContainer}>
        <Text style = {textOptions.headingText}> {'Start Sharing\n Your Location.'} </Text>
        <Text style = {textOptions.mediumText}>Enter a name and username to start checking in with friends and family.</Text>
        <View style = {styles.iconInput}>
            <MaterialCommunityIcon
              style = {styles.iconPadding}
              name = 'human-greeting-variant'
              color = {'#505050'}
              size = {24}/>
            <CustomInput
              placeholder = 'name'
              value = {name}
              onChangeText = {name => setName(name)}
              autocapitalize = {false}/>
          </View>
          <View style = {styles.iconInput}>
            <MaterialCommunityIcon
              style = {styles.iconPadding}
              name = 'account'
              color = {'#505050'}
              size = {24}/>
            <CustomInput
              placeholder = 'username'
              value = {username}
              onChangeText = {username => setUsername(username)}
              autocapitalize = {false}/>
          </View>
        <GreenButton
            text = {updateButton}
            onPress = {onUpdateButtonPressed}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

  container: {
      flex: 1,
  },

  formContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
        
    iconInput: {
      backgroundColor: 'white',
      width: '100%',
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
    },
    
    iconPadding: {
      marginHorizontal: 10,
    },
});