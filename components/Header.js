import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { parameters } from './GlobalStyles';
import  HeaderIcon  from '../assets/viaja-header.png';

export default function Header({onPress}) {
  return (
    <View style  = {styles.header}>
        <View style = {styles.menuIcon}>
            <TouchableOpacity onPress = {onPress}>
                <Icon
                    name = 'menu'
                    color = '#505050'
                    size = {30}/>
            </TouchableOpacity>
        </View>
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        flex: 1, 
        height: parameters.headerHeight, 
        paddingLeft: 15,
        paddingTop: 15,
   },
    headerIcon: {
        height: parameters.headerHeight, 
        width: 100, 
        padding: 15,
    },
    headerIconView: {
        flex: 2, 
        justifyContent: 'center', 
        alignContent: 'flex-start',
    },
})