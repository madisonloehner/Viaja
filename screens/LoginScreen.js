import { TouchableOpacity, KeyboardAvoidingView, useWindowDimensions, View, Image, StyleSheet, Text } from 'react-native';
import React, { useState } from 'react';
import { FormErrorMessage } from '../components/FormErrorMessage';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ProfileLogo from '../assets/profile.png';
import CustomInput from '../components/CustomInput';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { textOptions } from '../components/GlobalStyles';
import { authentication } from '../firebase/firebase-config';
import { Formik } from 'formik';
import * as Yup from 'yup';

const LoginScreen = ({navigation}) => {

  const {height} = useWindowDimensions();
  const welcomeMessage = 'Welcome back.';
  const loginButton = 'login';
  const noAccount = "don't have an account? ";
  const account = ' create an account';
  const forgotPassword = 'forgot password?';

  const [errorState, setErrorState] = useState('');

  //formik schema for handling authentication flow
  const LoginScreenSchema = Yup.object().shape({
    email: Yup.string().email().required('You must enter a valid email'),
    password: Yup.string().required().min(6, 'Minimum password length is six characters.')
  })

    //redirects user to create an account if they accidentially pressed login  
  const onCreateAnAccountPressed = () => {
    navigation.navigate('NewAccount')
  };
  
  //redirects user to new screen to reset their password
  const onForgotPasswordPressed = () => {
    navigation.push('ResetPassword')
  };

  //signs in user to firebase
  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(authentication, email, password)
    .catch(error =>
      setErrorState(error.message)
    );
  };

  return (
    <KeyboardAvoidingView style = {styles.container}>
          <View style = {styles.alignCenter}>
            <Image 
              source = {ProfileLogo}
              style = {[styles.logo, {height: height * 0.2}]}
              resizeMode = 'contain'/>
              <Text style= {textOptions.headingText}>
                {welcomeMessage}
              </Text>
          </View>
          <Formik
            initialValues={{email:'', password: ''}}
            onSubmit = {values => handleLogin(values)}
            validationSchema={LoginScreenSchema}
            validateOnMount = {true}>
              {({handleChange, handleBlur, handleSubmit, values, isValid, errors, touched})=> (
            <>
          <View style = {styles.iconInput}>
            <Icon style = {styles.iconPadding}
              name = 'email'
              size = {24}
              color = '#505050'/>
            <CustomInput
              placeholder = 'email'
              textContentType = 'emailAddress'
              value = {values.email}
              keyboardType = 'email-address'
              onChangeText = {handleChange('email')}
              onBlur = {handleBlur('email')}
              secureTextEntry = {false}/>
          </View>
          <FormErrorMessage
              error={errors.email}
              visible={touched.email}/>
          <View style = {styles.iconInput}>
            <Icon style = {styles.iconPadding}
              name = 'lock'
              size = {24}
              color = '#505050'/>
            <CustomInput
              placeholder = 'password'
              textContentType='password'
              value = {values.password}
              onChangeText = {handleChange('password')}
              onBlur = {handleBlur('password')}
              secureTextEntry = {true}/>
          </View>
          <FormErrorMessage
                error={errors.password}
                visible={touched.password}/>
        <View style = {{alignItems: 'flex-end'}}>
          <Text  
              style = {textOptions.mediumBoldText}
              onPress= {onForgotPasswordPressed}> 
              {forgotPassword} 
          </Text>
        </View>
        <TouchableOpacity
            style= {styles.button(isValid)} 
            onPress = {handleSubmit}
            >
          <Text style = {styles.text}> 
            {loginButton}
          </Text>
        </TouchableOpacity>
        {errorState !== '' ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
        <View style = {styles.alignCenter}>
          <Text styles = {textOptions.mediumText}> 
              {noAccount} 
              <Text style = {textOptions.empahsistText} onPress = {onCreateAnAccountPressed}> 
                {account} 
              </Text>
            </Text>
          </View>
          </>
          )}
        </Formik>
    </KeyboardAvoidingView>
  )}

export default LoginScreen
const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    padding: 20,
  },

  alignCenter:{
  alignItems: 'center'
  },

  logo: {
    width: '50%',
    maxHeight: 200, 
    maxWidth: 300,
    marginBottom: 10,
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
  
  button: isValid =>({
    backgroundColor: isValid? '#05B479': '#A9CDC1',
    width: '100%',
    borderRadius: 25,
    padding: 10,
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  }),

  text: {
    color: 'white',
    fontSize: 20, 
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 2,
  },
})