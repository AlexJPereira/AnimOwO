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

export default function Rotas(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="login" component={Login}/>
                <AppStack.Screen name="home" component={Home}/>
                <AppStack.Screen name="perfil" component={Perfil}/>
                <AppStack.Screen name="anime-page" component={AnimePage}/>
                <AppStack.Screen name="configuracoes" component={Configuracoes}/>
                <AppStack.Screen name="downloads" component={Downloads}/>
                <AppStack.Screen name="lista-completa" component={ListaCompleta}/>
                <AppStack.Screen name="sobre" component={Sobre}/>
                <AppStack.Screen name="assistindo" component={Assistindo}/>
                <AppStack.Screen name="favoritos" component={Favoritos}/>
                <AppStack.Screen name="plano-assistir" component={PlanoAssistir}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}