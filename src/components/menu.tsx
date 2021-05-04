import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Image } from 'react-native';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

import { RootDrawerNavigator } from '../pages/rotas/rootNavigators/rootDrawerNavigator';
import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator';

const LogoCompleto = require('../app-assets/logo/Logo-Completo.png');

export interface MenuItemProps {
    text: string,
    onClick: () => void
    children: React.ReactChild
}

export function MenuItem(props: MenuItemProps){
    return (
        <TouchableOpacity
            style={MenuStyle.itemContainer}
            onPress={props.onClick}>
            { props.children }
            <Text style={MenuStyle.itemText}>{ props.text }</Text>
        </TouchableOpacity>
    )
}

export default function Menu(){

    function openConfiguracoes(){
        RootStackNavigator.navigate('configuracoes')
        RootDrawerNavigator.toggleDrawer()
    }
    function openListaCompleta(){
        RootStackNavigator.navigate('lista-completa')
        RootDrawerNavigator.toggleDrawer()
    }
    function openSobre(){
        RootStackNavigator.navigate('sobre')
        RootDrawerNavigator.toggleDrawer()
    }

    return (
        <View>
            <View style={MenuStyle.logoContainer}>
                <Image style={MenuStyle.logo} source={LogoCompleto}/>
            </View>

            <MenuItem onClick={openListaCompleta} text={'Lista Completa'}>
                <FontAwesome5 name="th-list" size={20} color="white" style={MenuStyle.iconStyle}/>
            </MenuItem>

            <MenuItem onClick={openConfiguracoes} text={'Configurações'}>
                <Ionicons name="ios-settings-sharp" size={20} color="white" style={MenuStyle.iconStyle}/>
            </MenuItem>

            <MenuItem onClick={openSobre} text={'Sobre'}>
                <FontAwesome5 name="info-circle" size={20} color="white" style={MenuStyle.iconStyle}/>
            </MenuItem>
        </View>
    )
}

const MenuStyle = StyleSheet.create({
    itemContainer: {
        height: 50,
        marginTop: 15,
        paddingHorizontal: '15%',
        alignItems: 'center',
        flexDirection: 'row'
    },
    itemText: {
        color: 'white',
        marginLeft: 15,
        fontSize: 15
    },
    iconStyle: {
        
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        marginTop: 30,
        marginBottom: 15,
        height: 306 * 0.165,
        width: 969 * 0.165
    }
})
