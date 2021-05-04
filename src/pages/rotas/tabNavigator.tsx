import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons"

import { RootStackPagesProps, setRootStackNavigator } from "./rootNavigators/rootStackNavigator"
import { pagesLibrary } from './pagesNames'
import colorStyle from '../../styles/color'

import Home from '../principais/home'
import Perfil from '../principais/perfil'
import Assistindo from '../listas/assistindo'
import Favoritos from '../listas/favoritos'
import PlanoAssistir from '../listas/plano-assistir'


interface barProps {
    color: string; 
    size: number; 
}

export interface TabkNavigatorProps{
    navigation: StackNavigationProp<RootStackPagesProps, 'home'>
}

export function TabNavigator(props: TabkNavigatorProps){
    setRootStackNavigator(props.navigation)
    const Tab = createBottomTabNavigator()

    return (
        <NavigationContainer theme={ContainerTheme} independent={true}>
            <Tab.Navigator
                initialRouteName={'home'}
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
                backBehavior={'none'}
            >
                <Tab.Screen
                name={tabNavigatorPages.home}
                children={() => <Home/>}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="home-sharp" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={tabNavigatorPages.assistindo}
                component={Assistindo}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <MaterialIcons name="live-tv" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={tabNavigatorPages.planoAssistir}
                component={PlanoAssistir}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <FontAwesome5 name="list-alt" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={tabNavigatorPages.favoritos}
                component={Favoritos}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="md-heart" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={tabNavigatorPages.perfil}
                component={Perfil}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="person" size={size} color={color} />
                    ),
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export const tabNavigatorPages: pagesLibrary = {
    login: "login",
    home: "home",
    perfil: "perfil",
    pesquisa: "pesquisa",
    animePage: "anime-page",
    watchPage: "watch-page",
    configuracoes: "configuracoes",
    downloads: "downloads",
    listaCompleta: "lista-completa",
    sobre: "sobre",
    assistindo: "assistindo",
    favoritos: "favoritos",
    planoAssistir: "plano-assistir",
    menu: "menu"
}

const ContainerTheme = {
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
