import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsScreen from '../screens/FriendsScreen';
import SearchFriendsScreen from '../screens/SearchFriendsScreen'
import FriendsTab from './FriendsTab';
import BasicHeader from '../components/BasicHeader';
import SearchHeader from '../components/SearchHeader';

const Friends = createNativeStackNavigator();

export function FriendsStack(){
    return(
        <Friends.Navigator
            initialRouteName='SearchFriendsScreen'>
            <Friends.Screen
                name = 'FriendsScreen'
                component = {FriendsScreen}
                options = {{headerShown: false}}/>
            <Friends.Screen
                name = 'SearchFriendsScreen'
                component = {SearchFriendsScreen}
                options = {{headerShown: false}}/>
        </Friends.Navigator>
    )
}