import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import NewAccountScreen from '../screens/NewAccountScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';

const Auth = createNativeStackNavigator();

export function AuthStack(){
    return(
        <Auth.Navigator
            initialRouteName= 'Welcome'>
            <Auth.Screen
                name = 'Welcome'
                component = {WelcomeScreen}
                options = {{headerShown: false}}/>
            <Auth.Screen
                name = 'Login'
                component = {LoginScreen}
                options = {{headerShown: false}}/>
             <Auth.Screen
                name = 'ResetPassword'
                component = {ResetPasswordScreen}
                options = {{headerShown: false}}/>
            <Auth.Screen
                name = 'NewAccount'
                component = {NewAccountScreen}
                options = {{headerShown: false}}/>
            </Auth.Navigator>
    )};
  