import { View, KeyboardAvoidingView, StyleSheet, Text, } from 'react-native';
import React from 'react';
import { useState } from 'react';
import { textOptions } from '../components/GlobalStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomInput from '../components/CustomInput';
import GreenButton from '../components/buttons/GreenButton';
import { sendPasswordResetEmail } from 'firebase/auth';
import { authentication } from '../firebase/firebase-config';

export default function ResetPasswordScreen ({navigation}) {

  const resetMessage = 'Forgot Password?';
  const createAccount = ' create a new account';
  const noAccount = "don't have an account? ";
  const sendEmail = 'send email';

  let [email, setEmail] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  //function to send a reset password email to the user. 
  let resetPassword = () => {
    sendPasswordResetEmail(authentication, email)
    .then(()=> {
      navigation.popToTop();
    })
    .catch((error)=> {
      setErrorMessage('error.message');
    })
  }

  //function to navigate to the New Account screen on button press
  const onCreateAccountPressed = () => {
    navigation.navigate('NewAccount')
  };

  return (
    <KeyboardAvoidingView style = {styles.container}>
      <Text style ={textOptions.headingText}>
        {resetMessage}
      </Text>
      <View style = {styles.iconInput}>
        <Icon style = {styles.iconPadding}
          name = 'lock'
          size = {24}
          color = '#505050'/>
      <CustomInput
        placeholder = 'email'
        value = {email}
        onChangeText = {setEmail}/>
      </View>
      <Text style = {textOptions.errorMessage}>{errorMessage}</Text>
    <GreenButton 
      text = {sendEmail}
      onPress = {resetPassword}/>
    <Text style = {textOptions.mediumText}>
      {noAccount} 
      <Text style = {textOptions.empahsistText} onPress = {onCreateAccountPressed}>
        {createAccount} </Text>
    </Text>
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
container: {
  height: '100%',
  width: '100%',
  alignItems:'center',
  justifyContent: 'center',
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

})