import React from 'react'
import { View, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { RootStackNavigator } from '../pages/rootStackNavigator'

const LogoCompleto = require('../app-assets/logo/Logo-Completo.png')

export default function NavBar(){
    return(
        <View style={navBarStyle.navBar}>
            <Ionicons name="search" size={24} color="white"/>
            <Image style={navBarStyle.logo} source={LogoCompleto}></Image>
            <TouchableOpacity onPress={()=>{ RootStackNavigator.navigate('perfil') }}>
                <FontAwesome5 name="user-circle" size={24} color="white"/>
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