import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from '../../components/menu'
import colorStyle from '../../styles/color'
import { StackNavigator } from './stackNavigator';

export interface DrawerNavigatorProps{
    initialRouteName: "home" | "login"
}

export function DrawerNavigator(props: DrawerNavigatorProps) {
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer theme={DrawerTheme}>
            <Drawer.Navigator
                drawerType={'front'}
                backBehavior={'none'}
                drawerContent={ Menu }
                drawerPosition={'right'}
                edgeWidth={0}>
                
                <Drawer.Screen 
                    name="Home" 
                    options={{
                        drawerIcon: config => <FontAwesome5 name="download" size={20} color="white" focused={true} />
                    }}>
                    {()=><StackNavigator initialRouteName={props.initialRouteName}/>}
                </Drawer.Screen>
                
            </Drawer.Navigator>
        </NavigationContainer>
  )
}

const DrawerTheme = {
    dark: false,
    colors: {
      primary: "#FFFFFF",
      background: colorStyle.corBackground.color,
      card: colorStyle.corBackground.color, 
      text: "#FFFFFF",
      border: colorStyle.corBackground.color, 
      notification: colorStyle.corBackground.color,
    },
};

