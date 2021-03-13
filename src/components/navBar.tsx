import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';
import { RootStackNavigator } from '../pages/rootStackNavigator';

import SearchBar from './search-bar';

const LogoCompleto = require('../app-assets/logo/Logo-Completo.png');

export default function NavBar(){

    const [shouldShow, setShouldShow] = useState(false);

    return(
        <View>
            <View style={navBarStyle.navBar}>
                <TouchableOpacity onPress={() => {RootStackNavigator.navigate('pesquisa')}}>
                    <Ionicons name="search" size={24} color="white"/>
                </TouchableOpacity>
                <Image style={navBarStyle.logo} source={LogoCompleto}></Image>
                <TouchableOpacity onPress={()=>{ RootStackNavigator.navigate('perfil') }}>
                    <FontAwesome5 name="user-circle" size={24} color="white"/>
                </TouchableOpacity>
            </View>
            <View>
            </View>
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