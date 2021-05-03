import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackNavigator } from '../pages/rootStackNavigator';

import Drawer from '../components/menu'; 

const LogoCompleto = require('../app-assets/logo/Logo-Completo.png');
//const barHeight = StatusBar.currentHeight || 24;

export default function NavBar(){

    const [shouldShow, setShouldShow] = useState(false);

    return(
        <View style={navBarStyle.navBar}>
            <TouchableOpacity onPress={() => {RootStackNavigator.navigate('pesquisa')}}>
                <Ionicons name="search" size={24} color="white"/>
            </TouchableOpacity>
            <Image style={navBarStyle.logo} source={LogoCompleto}></Image>
            <TouchableOpacity onPress={()=>{  }}>
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