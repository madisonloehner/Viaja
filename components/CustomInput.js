import { TextInput, StyleSheet } from 'react-native';
import React from 'react';

const CustomInput = ({ placeholder,value, autoCorrect, autocapitalize, secureTextEntry, keyboardType, onChangeText, onBlur, textContentType}) => {
  return (
      <TextInput
        placeholder = {placeholder}
        value = {value}
        onChangeText = {onChangeText}
        keyboardType = {keyboardType}
        secureTextEntry = {secureTextEntry} 
        onBlur = {onBlur}
        textContentType={textContentType}
        autocapitalize = {autocapitalize}
        autoCorrect = {autoCorrect}
        />
  )
};

export default CustomInput