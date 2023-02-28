import { View, Text, Dimensions} from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SearchFriendsScreen from '../screens/SearchFriendsScreen';
import FriendsScreen from '../screens/FriendsScreen';
import SubHeader from '../components/SubHeader';
import SearchHeader from '../components/SearchHeader';
import { parameters } from '../components/GlobalStyles';

const Friend = createMaterialTopTabNavigator();

const FriendsTab = () => {
  return (
    <Friend.Navigator 
        initialRouteName='SearchFriendsScreen'
        screenOptions = {{tabBarActiveTintColor: '#05B479', tabBarInactiveTintColor: '#505050', tabBarPressColor: '#9CC0F9'}}
        initialLayout={{width: Dimensions.get('window').width}}
        >
        <Friend.Screen 
            name = 'my friends'
            component = {SearchFriendsScreen}
            />
        <Friend.Screen 
            name = 'find friends'
            component = {FriendsScreen}/>
    </Friend.Navigator>
  )
}

export default FriendsTab