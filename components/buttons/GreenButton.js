import { Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text}) => {
  return (
    <TouchableOpacity onPress = {onPress} style= {styles.container}>
      <Text style = {styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#05B479',
        width: '100%',
        borderRadius: 25,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 20,
        alignItems: 'center',
    },

    text: {
        color: 'white',
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
      },
})

export default CustomButton