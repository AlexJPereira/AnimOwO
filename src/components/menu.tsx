import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native'

import Configuracoes from '../pages/mais/configuracoes';
import Downloads from '../pages/mais/downloads';
import ListaCompleta from '../pages/mais/lista-completa';
import Sobre from '../pages/mais/sobre';

const Drawer = createDrawerNavigator();

interface Props{
    screenName: string
}
export default function MyDrawer({screenName} : Props) {
    return (
            <Drawer.Navigator>
                <Drawer.Screen name="Configurações" component={Configuracoes} />
                <Drawer.Screen name="Downloads" component={Downloads} />
            </Drawer.Navigator>
    );
}