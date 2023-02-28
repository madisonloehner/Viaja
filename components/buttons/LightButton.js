import { Text, StyleSheet, TouchableOpacity} from 'react-native'
import React from 'react'

const LightButton = ({ onPress, text}) => {
  return (
    <TouchableOpacity onPress = {onPress} style= {styles.container}>
      <Text style = {styles.text}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E5E5E5',
        width: '100%',
        borderRadius: 25,
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
    },

    text: {
        color: '#05B479',
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        letterSpacing: 2,
      },
})

export default LightButton