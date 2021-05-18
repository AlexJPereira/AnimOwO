import React from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackNavigator } from '../pages/rotas/rootNavigators/rootStackNavigator';
import { RootDrawerNavigator } from '../pages/rotas/rootNavigators/rootDrawerNavigator'

const LogoCompleto = require('../app-assets/logo/Logo-Completo.png');

export default function NavBar(){
    return(
        <View style={navBarStyle.navBar}>
            <TouchableOpacity onPress={() => {RootStackNavigator.navigate('pesquisa')}}>
                <Ionicons name="search" size={24} color="white"/>
            </TouchableOpacity>
            <Image style={navBarStyle.logo} source={LogoCompleto}></Image>
            <TouchableOpacity onPress={()=>{ RootDrawerNavigator.toggleDrawer() }}>
                <Ionicons name="md-menu" size={24} color={'white'} />
            </TouchableOpacity>
        </View>
    )
}

const navBarStyle = StyleSheet.create({
    navBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 50,
        marginTop: 7
    },
    logo: {
        height: 32,
        width: 102
    }
})