import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import CustomDrawer from "../components/CustomDrawer";
import { HomeStack } from "./HomeStack";
import FriendsScreen from "../screens/FriendsScreen";
import RequestsScreen from "../screens/RequestsScreen";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        initalRoute: "Home",
        headerShown: false,
        drawerActiveBackgroundColor: "#9CC0F9",
        drawerActiveTintColor: "#fff",
        drawerInactiveTintColor: "#505050",
        drawerLabelStyle: {
          marginLeft: -20,
          fontSize: 15,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="home"
              color={focused ? "#fff" : "#505050"}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="bell-outline"
              color={focused ? "#fff" : "#505050"}
              size={size}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Find Friends"
        component={FriendsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="magnify"
              color={focused ? "#fff" : "#505050"}
              size={size}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
