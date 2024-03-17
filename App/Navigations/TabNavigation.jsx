import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Entypo, Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import Colors from '../Utils/Colors';



const Tab = createBottomTabNavigator();
export default function TabNavigation() {
  return (

    <Tab.Navigator screenOptions = {{
        headerShown:false,
    }}>
        {/* Have tab screens for each screen we have 
            tabBarLabel is basically the name of the buttons at the bottom
            screenOptions headerShown:false means no header*/}

        <Tab.Screen name='home'
        component={HomeScreen}
        options={{
            tabBarLabel: 'Search',
            tabBarActiveTintColor: Colors.LIGHTBLUE,
            tabBarIcon: ({color, size}) => (<FontAwesome5 name="search-location" size={24} color={color} />)
        }}/>

        <Tab.Screen name='favorite'
            component={FavoriteScreen}
            options={{
                tabBarLabel: 'Favorites',
                tabBarActiveTintColor: Colors.LIGHTBLUE,
                tabBarIcon: ({color, size}) => (<Entypo name="heart" size={24} color={color} />)
            }}
            />

        <Tab.Screen name='profile'
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                tabBarActiveTintColor: Colors.LIGHTBLUE,
                tabBarIcon: ({color, size}) => (<Ionicons name="person" size={24} color={color} />)
            }}/>
    </Tab.Navigator>
  )
}