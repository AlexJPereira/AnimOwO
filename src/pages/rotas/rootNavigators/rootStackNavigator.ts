import { StackNavigationProp } from "@react-navigation/stack";
import { animeDetailsResponse } from "../../../services/mal-api/interfaces";

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
    'login': any,
    'recomendados': any,
    'assistindo': any,
    'em-alta': any,
    'temporada': any
} 


export var RootStackNavigator: StackNavigationProp<RootStackPagesProps, 'home'>

export function setRootStackNavigator(newRootStack: StackNavigationProp<RootStackPagesProps, 'home'>){
    RootStackNavigator = newRootStack
}
