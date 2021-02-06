import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

// paginas
import Login from './principais/login'
import Home from './principais/home'
import Perfil from './principais/perfil'
import AnimePage from './principais/anime-page'

import Configuracoes from './mais/configuracoes'
import Downloads from './mais/downloads'
import ListaCompleta from './mais/lista-completa'
import Sobre from './mais/sobre'

import Assistindo from './listas/assistindo'
import Favoritos from './listas/favoritos'
import PlanoAssistir from './listas/plano-assistir'

const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

export const pagesNames = {
    login: "login",
    home: "home",
    perfil: "perfil",
    animePage: "anime-page",
    configuracoes: "configuracoes",
    downloads: "downloads",
    listaCompleta: "lista-completa",
    sobre: "sobre",
    assistindo: "assistindo",
    favoritos: "favoritos",
    planoAssistir: "plano-assistir"
}

interface barProps {
    color: string; 
    size: number; 
}

export function TabNavigator(){
    return (
        <NavigationContainer independent={true}>
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
                name={pagesNames.home}
                component={Home}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="home-sharp" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={pagesNames.assistindo}
                component={Assistindo}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <MaterialIcons name="live-tv" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={pagesNames.planoAssistir}
                component={PlanoAssistir}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="list-circle" size={size} color={color} />
                    ),
                }}
                />
                <Tab.Screen
                name={pagesNames.favoritos}
                component={Favoritos}
                options={{
                    tabBarIcon: ({color, size} : barProps) => (
                    <Ionicons name="md-heart" size={size} color={color} />
                    ),
                }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export function StackNavigator(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name={pagesNames.login} component={Login}/>
                <AppStack.Screen name={pagesNames.home} component={TabNavigator}/>
                <AppStack.Screen name={pagesNames.perfil} component={Perfil}/>
                <AppStack.Screen name={pagesNames.animePage} component={AnimePage}/>
                <AppStack.Screen name={pagesNames.configuracoes} component={Configuracoes}/>
                <AppStack.Screen name={pagesNames.downloads} component={Downloads}/>
                <AppStack.Screen name={pagesNames.listaCompleta} component={ListaCompleta}/>
                <AppStack.Screen name={pagesNames.sobre} component={Sobre}/>
                <AppStack.Screen name={pagesNames.assistindo} component={Assistindo}/>
                <AppStack.Screen name={pagesNames.favoritos} component={Favoritos}/>
                <AppStack.Screen name={pagesNames.planoAssistir} component={PlanoAssistir}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}
