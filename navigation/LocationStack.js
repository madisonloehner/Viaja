import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LocationScreen from '../screens/LocationScreen'

const Location = createNativeStackNavigator();

export function LocationStack(){
    return(
        <Location.Navigator>
            <Location.Screen
                name = 'LocationScreen'
                component = {LocationScreen}
                options = {{headerShown: false}}
                />
        </Location.Navigator>
    )
}