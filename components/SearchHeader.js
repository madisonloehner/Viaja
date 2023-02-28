import { View, StyleSheet, TouchableOpacity, Image, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { parameters } from './GlobalStyles';
import  HeaderIcon  from '../assets/viaja-header.png';

export default function SearchHeader({onPress}) {
  return (
    <View style  = {styles.header}>
        <View style = {styles.menuIcon}>
            <TouchableOpacity onPress = {onPress}>
                <Icon
                    name = 'magnify'
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
        paddingTop: parameters.statusBarHeight,
      },
    menuIcon: {
        flex: 1, 
        height: parameters.headerHeight, 
        paddingLeft: 15,
        paddingTop: 15
    },
    headerIcon: {
        height: parameters.headerHeight, 
        width: 100, 
        alignItems: 'center' 
    },

    headerIconView: {
        flex: 2, 
        justifyContent: 'center', 
        alignContent: 'flex-start',
    },
})