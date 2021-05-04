import React from "react"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { NavigationContainer, useNavigation } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import { setRootDrawerNavigator } from "./rootNavigators/rootDrawerNavigator"
import { pagesLibrary } from './pagesNames'
import { TabNavigator } from "./tabNavigator"
import colorStyle from '../../styles/color'

// paginas
import Login from '../principais/login'
import Perfil from '../principais/perfil'
import Pesquisa from '../principais/search'
import AnimePage from '../principais/anime-page'
import WatchPage from '../principais/watch-page'

import Configuracoes from '../mais/configuracoes'
import Downloads from '../mais/downloads'
import ListaCompleta from '../mais/lista-completa'
import Sobre from '../mais/sobre'

import Assistindo from '../listas/assistindo'
import Favoritos from '../listas/favoritos'
import PlanoAssistir from '../listas/plano-assistir'

export interface StackNavigatorProps{
    initialRouteName: "home" | "login",
    //navigation?: DrawerNavigationProp<any>
}

export function StackNavigator(props: StackNavigatorProps){
    const navigator = useNavigation() as DrawerNavigationProp<any>
    setRootDrawerNavigator(navigator)
    const AppStack = createStackNavigator()

    return (
        <NavigationContainer theme={ContainerTheme} independent={true}>
            <AppStack.Navigator screenOptions={{ headerShown: false }} 
                initialRouteName={props.initialRouteName}>
                <AppStack.Screen name={stackNavigatorPages.login} component={Login}/>
                <AppStack.Screen name={stackNavigatorPages.home} component={TabNavigator}/>
                <AppStack.Screen name={stackNavigatorPages.perfil} component={Perfil}/>
                <AppStack.Screen name={stackNavigatorPages.pesquisa} component={Pesquisa}/>
                <AppStack.Screen name={stackNavigatorPages.animePage} component={AnimePage}/>
                <AppStack.Screen name={stackNavigatorPages.watchPage} component={WatchPage} />
                <AppStack.Screen name={stackNavigatorPages.configuracoes} component={Configuracoes}/>
                <AppStack.Screen name={stackNavigatorPages.downloads} component={Downloads}/>
                <AppStack.Screen name={stackNavigatorPages.listaCompleta} component={ListaCompleta}/>
                <AppStack.Screen name={stackNavigatorPages.sobre} component={Sobre}/>
                <AppStack.Screen name={stackNavigatorPages.assistindo} component={Assistindo}/>
                <AppStack.Screen name={stackNavigatorPages.favoritos} component={Favoritos}/>
                <AppStack.Screen name={stackNavigatorPages.planoAssistir} component={PlanoAssistir}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export const stackNavigatorPages: pagesLibrary = {
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