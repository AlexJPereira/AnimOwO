import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

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

export default function Rotas(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name={pagesNames.login} component={Login}/>
                <AppStack.Screen name={pagesNames.home} component={Home}/>
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
