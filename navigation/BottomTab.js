import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { FriendsStack } from './FriendsStack';
import { LocationStack } from './LocationStack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DrawerNavigator from './DrawerNav';
import ProfileStack from './ProfileStack';


const TabNav = createMaterialBottomTabNavigator();

export default function BottomTab() {  
  return (
    <TabNav.Navigator
    initialRouteName='HomeScreen'
      activeColor = "#05B479"
      inactiveColor='#505050'
      barStyle = {{backgroundColor: 'white'}}>
        <TabNav.Screen 
          name = 'HomeTab'
          component={DrawerNavigator}
          options = {{
            tabBarLabel: 'home',
            tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name = 'home' 
              size = {25}
              color = {focused? '#05B479' : '#505050' }
              />
              ), 
            
          }}
        />
        <TabNav.Screen 
          name = 'LocationTab' 
          component = {LocationStack} 
          options = {{
            tabBarLabel: 'location',
            tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name = 'map-marker' 
              size = {25}
              color = {focused? '#05B479' : '#505050' }
              />
              ), 
            
          }}
        />
        <TabNav.Screen 
          name = 'FriendsTab' 
          component = {FriendsStack}
          options = {{
            tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name = 'heart' 
              size = {25}
              color = {focused? '#05B479' : '#505050' }
              />
              ), 
            tabBarLabel: 'friends'
          }}
        />
      <TabNav.Screen 
          name = 'ProfileTab' 
          component = {ProfileStack}
          options = {{
            tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name = 'account' 
              size = {25}
              color = {focused? '#05B479' : '#505050' }
              />
              ), 
            tabBarLabel: 'profile'
          }}
        />
    </TabNav.Navigator>   
  );
}
