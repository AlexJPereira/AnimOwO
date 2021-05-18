import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootTabPagesProps = {
    'home': any,
    'assistindo': any
} 

export var RootTabNavigator: BottomTabNavigationProp<RootTabPagesProps, 'home'>

export function setRootTabNavigator(newRootTab: BottomTabNavigationProp<RootTabPagesProps, 'home'>){
    RootTabNavigator = newRootTab
}