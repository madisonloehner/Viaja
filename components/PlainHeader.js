import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { parameters } from './GlobalStyles';
import  HeaderIcon  from '../assets/viaja-header.png';

export default function PlainHeader() {
  return (
    <View style  = {styles.header}>
    <View style ={styles.headerIconView}>
        <Image 
            source = {HeaderIcon}
            style = {styles.headerIcon}/>
    </View>
</View>
  )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        height: parameters.headerHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerIcon: {
        height: parameters.headerHeight, 
        width: 100, 
    },
    headerIconView: {
        flex: 2, 
        justifyContent: 'center', 
        alignContent: 'flex-start',
    },
})