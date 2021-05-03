import React from 'react'
import {Text} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; 
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

import { RootStackPagesProps, setRootStackNavigator } from './rootStackNavigator'
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';

// estilos
import pagesNames from './pagesNames'
import colorStyle from '../styles/color'

// paginas
import Login from './principais/login'
import Home from './principais/home'
import Perfil from './principais/perfil'
import Pesquisa from './principais/search'
import AnimePage from './principais/anime-page'
import WatchPage from './principais/watch-page'

import Configuracoes from './mais/configuracoes'
import Downloads from './mais/downloads'
import ListaCompleta from './mais/lista-completa'
import Sobre from './mais/sobre'

import Assistindo from './listas/assistindo'
import Favoritos from './listas/favoritos'
import PlanoAssistir from './listas/plano-assistir'

const AppStack = createStackNavigator()
const Tab = createBottomTabNavigator()

interface barProps {
    color: string; 
    size: number; 
}

const MyTheme = {
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

export interface TabkNavigatorProps{
    navigation: StackNavigationProp<RootStackPagesProps, 'home'>
}

export function DrawerNavigator(props: StackNavigatorProps) {
    const Drawer = createDrawerNavigator();

    return (
        <NavigationContainer theme={MyTheme}>
            <Drawer.Navigator
                drawerType={'front'}
                backBehavior={'none'}
                drawerContent={()=><Text>test</Text>}
                drawerPosition={'right'}>

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

export function TabNavigator(props: TabkNavigatorProps){
    setRootStackNavigator(props.navigation)

    return (
        <NavigationContainer theme={MyTheme} independent={true}>
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
                name={pagesNames.home}
                children={() => <Home/>}
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
                    <FontAwesome5 name="list-alt" size={size} color={color} />
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
                <Tab.Screen
                name={pagesNames.perfil}
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

export interface StackNavigatorProps{
    initialRouteName: "home" | "login"
}

export function StackNavigator(props: StackNavigatorProps){
    return (
        <NavigationContainer theme={MyTheme} independent={true}>
            <AppStack.Navigator screenOptions={{ headerShown: false }} 
                initialRouteName={props.initialRouteName}>
                <AppStack.Screen name={pagesNames.login} component={Login}/>
                <AppStack.Screen name={pagesNames.home} component={TabNavigator}/>
                <AppStack.Screen name={pagesNames.perfil} component={Perfil}/>
                <AppStack.Screen name={pagesNames.pesquisa} component={Pesquisa}/>
                <AppStack.Screen name={pagesNames.animePage} component={AnimePage}/>
                <AppStack.Screen name={pagesNames.watchPage} component={WatchPage} />
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
