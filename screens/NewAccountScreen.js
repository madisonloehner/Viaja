import { KeyboardAvoidingView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FormErrorMessage } from '../components/FormErrorMessage';
import { textOptions } from '../components/GlobalStyles';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomInput from '../components/CustomInput';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';
import { authentication, db } from '../firebase/firebase-config';
import * as Yup from 'yup';

const NewAccountScreen = ({navigation}) => {

  const headerText = 'Create Account'
  const createAccountBttn = 'create account';
  const returningUser = 'already have an account? ';
  const loginMessage= ' login';

  const [errorState, setErrorState] = useState('');
  
  //function to create a new account with an email and password, using firebase
  const handleSignup = async (values) => {
    const { email, password } = values;
    createUserWithEmailAndPassword( authentication, email, password)
    .catch((error) => {
      setErrorState(error.code);
      console.log(errorState);
    })
};

  const NewAccountScreenSchema = Yup.object().shape({
    email: Yup.string().email().required('An email address is required'),
    password: Yup.string().required().min(6, 'Password must be at least 6 characters.'),
    confirm: Yup.string().oneOf([Yup.ref('password')], 'Passwords do not match.').required('You must reenter your password.')})

    return (
      <KeyboardAvoidingView style = {styles.container}>
        <View style = {styles.headingStyle}>
            <Text style = {textOptions.headingText}>
                {headerText}
            </Text>
        </View>
        <Formik
          initialValues = {{ email: '',  password: '', confirm: ''}}
          onSubmit = {values => {handleSignup (values) }}
          validationSchema = {NewAccountScreenSchema}
          validateOnMount = {true}>
          {({handleChange, handleBlur, handleSubmit, values, isValid, errors, touched}) => (
          <>
            <View style = {styles.iconInput}>
              <Icon style = {styles.iconPadding}
                name = 'email'
                size = {24}
                color = '#505050'/>
              <CustomInput 
                placeholder = 'email'
                value = {values.email}
                onBlur={handleBlur('email')}
                onChangeText = {handleChange('email')}
                keyboardType = 'email-address'/>
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
                value = {values.password}
                onBlur={handleBlur('password')}
                onChangeText = {handleChange('password')}
                secureTextEntry = {true}/>
              </View>
            <View style = {styles.iconInput}>
              <Icon style = {styles.iconPadding}
                name = 'lock-check'
                size = {24}
                color = '#505050'/>
              <CustomInput
                placeholder = 'confirm password'
                value = {values.confirm}
                onBlur={handleBlur('confirm')}
                onChangeText = {handleChange('confirm')}
                secureTextEntry = {true}/>
               </View>   
               <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}/>          
            <View style = {styles.bottomContainer}>
            {errorState !== '' ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
            <TouchableOpacity
              style= {styles.button(isValid)} 
              onPress = {handleSubmit}>
              <Text style = {styles.text}> 
                {createAccountBttn}
              </Text>
           </TouchableOpacity>
              <Text style = {textOptions.mediumText}>
                {returningUser} 
                <Text 
                  style = {textOptions.empahsistText} 
                  onPress = {()=> navigation.navigate('Login')}>
                  {loginMessage} 
                </Text>
              </Text>
            </View>
            </>
          )}
          </Formik>
        </KeyboardAvoidingView>
  )};

export default NewAccountScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems:'center',
    justifyContent: 'center',
    padding: 20,
  },

  headingStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 70,
    paddingBottom: 40,
  },

  inputView: {
    width: '100%',
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

  bottomContainer: {
    flex: 1, 
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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