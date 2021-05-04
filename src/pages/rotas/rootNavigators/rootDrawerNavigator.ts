import { DrawerNavigationProp } from '@react-navigation/drawer'

export var RootDrawerNavigator: DrawerNavigationProp<any>

export function setRootDrawerNavigator(newRootDrawer: DrawerNavigationProp<any>){
    RootDrawerNavigator = newRootDrawer
}
