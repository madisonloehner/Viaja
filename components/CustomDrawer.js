import { View, Text, Stylesheet, TouchableOpacity, Image, StyleSheet, } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DrawerLogo from '../assets/viaja-no-background.png'
import {DrawerContentScrollView, DrawerItemList, DrawerItem} from '@react-navigation/drawer';
import { Divider } from 'react-native-elements';
import { textOptions } from './GlobalStyles';
import { signOut, getAuth, updateCurrentUser } from 'firebase/auth';


const CustomDrawer = (props) => {

    const authentication = getAuth();
    const user = authentication.currentUser;

//function to log user out of the application
const handleLogout = () => {
    signOut(authentication).then (()=> {
        console.log('user logged out')
    })
    .catch((error)=> {
        console.log(error.message)
    })
};
 return (
    <View style = {styles.container}>
    <DrawerContentScrollView{...props}> 
        <View style = {styles.topContainer}>
                <Image 
                    source = {DrawerLogo}  
                    style= {{height: 100, width: 100, borderRadius: 30}}/>
                <Text style = {textOptions.mediumText} >Hola, amigo!</Text>
                <Text style = {textOptions.usernameText}>{user.displayName}</Text>
            </View>
        <DrawerItemList {...props}/>
    </DrawerContentScrollView>
    <Divider/>
    <TouchableOpacity onPress = {handleLogout}>
        <View style = {styles.iconInput}>
            <MaterialCommunityIcons
                name = 'logout-variant'
                size = {25}
                color = '#B7B7B7'/>
            <Text style = {styles.logoutText}> Log out</Text>
            </View>   
        </TouchableOpacity> 
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container:{
        flex:1,
    },

    topContainer: {
        marginBottom: 20,
        justifyContent: 'space-between',  
        alignItems: 'center', 
    },

    logoutText: {
        marginLeft: 10, 
        fontWeight: 'bold', 
        color: '#B7B7B7', 
        fontSize: 15
    },

    iconInput: {
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 10,
        padding: 25,
        marginBottom: 50,
        flexDirection: 'row',
        alignItems: 'center',
      },
})