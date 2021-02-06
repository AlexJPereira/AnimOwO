import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

//Page imports 
import Home from './src/pages/home'; 
import Watching from './src/pages/watching'; 
import Plan from './src/pages/plan'; 
import Favorite from './src/pages/favorite'; 

const Tab = createBottomTabNavigator()

interface barProps {
  color: string; 
  size: number; 
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Home'}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: '#AB3962',
          inactiveTintColor: '#ffffff',
          activeBackgroundColor: '#252121',
          inactiveBackgroundColor: '#252121',
          style: {
                backgroundColor: '#252121',
                paddingBottom: 3
          }
        }}
    
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({color, size} : barProps) => (
              <Ionicons name="home-sharp" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Watching"
          component={Watching}
          options={{
            tabBarIcon: ({color, size} : barProps) => (
              <Ionicons name="tv" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Plan"
          component={Plan}
          options={{
            tabBarIcon: ({color, size} : barProps) => (
              <Ionicons name="list-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Favorite"
          component={Favorite}
          options={{
            tabBarIcon: ({color, size} : barProps) => (
              <Ionicons name="md-heart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
