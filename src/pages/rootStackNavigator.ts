import { StackNavigationProp } from "@react-navigation/stack";
import ReactNative from 'react-native'; 

export type RootStackPagesProps = {
    'home': any,
    'perfil': any,
    'anime-page': {
                    animeName: string,
                    animeImage: ReactNative.ImageSourcePropType},
    'watch-page': {
                    animeName: string,
                    animeImage: ReactNative.ImageSourcePropType,
                    animeSeason: number}, 
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