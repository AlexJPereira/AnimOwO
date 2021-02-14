import * as React from 'react';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'; 
import { Text } from 'react-native';
import { useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons';

import Configuracoes from '../pages/mais/configuracoes';
import Downloads from '../pages/mais/downloads';
import Perfil from '../pages/principais/perfil'; 
import ListaCompleta from '../pages/mais/lista-completa';
import Sobre from '../pages/mais/sobre';

const Drawer = createDrawerNavigator();

interface Props{
    screenName: string
}
export default function MyDrawer({screenName} : Props) {
    const dimensions = useWindowDimensions();
    return (
            <Drawer.Navigator
                openByDefault
                drawerType={'front'}
            >
                <Drawer.Screen 
                    name="Lista Completa" 
                    component={ListaCompleta}
                    options={{
                        drawerIcon: config => <FontAwesome5 name="th-list" size={20} color="white" focused={true} />
                    }}/>
                <Drawer.Screen 
                    name="Downloads" 
                    component={Downloads}
                    options={{
                        drawerIcon: config => <FontAwesome5 name="download" size={20} color="white" focused={true} />
                    }}/>
                <Drawer.Screen 
                    name="Sobre" 
                    component={Sobre}
                    options={{
                        drawerIcon: config => <FontAwesome5 name="info-circle" size={20} color="white" focused={true} />
                    }}/>
                <Drawer.Screen 
                    name="Configurações"
                    component={Configuracoes}
                    options={{
                        drawerIcon: config =><Ionicons name="settings" size={20} color="white"/>
                    }}/>
                <Drawer.Screen 
                    name="Perfil" 
                    component={Perfil}
                    options={{
                        drawerIcon: config => <FontAwesome5 name="th-list" size={20} color="white" focused={true} />
                    }}/>
            </Drawer.Navigator>
    );
}