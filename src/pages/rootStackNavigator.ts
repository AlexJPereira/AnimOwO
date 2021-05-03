import { StackNavigationProp } from "@react-navigation/stack";
import ReactNative from 'react-native'; 
import { animeDetailsResponse } from "../services/mal-api/interfaces";

export type RootStackPagesProps = {
    'home': any,
    'perfil': any,
    'anime-page': { id: number },
    'watch-page': { anime: animeDetailsResponse }, 
    'lista-completa': any,
    'downloads': any, 
    'sobre': any, 
    'configuracoes': any, 
    'pesquisa': any
}

//export var RootStackNavigator: StackNavigationProp<RootStackPagesProps, 'home'>
export var RootStackNavigator: any

export function setRootStackNavigator(newRootStack: StackNavigationProp<RootStackPagesProps, 'home'>){
    RootStackNavigator = newRootStack
}