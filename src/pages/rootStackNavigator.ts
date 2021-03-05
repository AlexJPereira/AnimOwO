import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackPagesProps = {
    'home': any,
    'perfil': any,
    'anime-page': {animeName: string}, 
    'lista-completa': any,
    'link-page': any, 
    'downloads': any, 
    'sobre': any, 
    'configuracoes': any
}

export var RootStackNavigator: StackNavigationProp<RootStackPagesProps, 'home'>

export function setRootStackNavigator(newRootStack: StackNavigationProp<RootStackPagesProps, 'home'>){
    RootStackNavigator = newRootStack
}