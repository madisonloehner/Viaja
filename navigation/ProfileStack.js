import React from 'react';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RequestsScreen from '../screens/RequestsScreen';
import HomeScreen from '../screens/HomeScreen'

const Profile = createNativeStackNavigator();

const ProfileStack = () => {
    return(
    <Profile.Navigator 
    initialRouteName='ProfileScreen'>
        <Profile.Screen 
          name = 'EditProfileScreen' 
          component = { EditProfileScreen }
          options = {{headerShown: false}}/>
      <Profile.Screen 
          name = 'ProfileScreen' 
          component = { ProfileScreen }
          options = {{headerShown: false}}/>
      <Profile.Screen 
          name = 'RequestsScreen' 
          component = { RequestsScreen }
          options = {{headerShown: false}}/>
    </Profile.Navigator>
  )
}

export default ProfileStack