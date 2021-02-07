import React from 'react'
import { View, Text, StyleSheet} from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import textStyle from '../../styles/text'
import colorStyle from '../../styles/color'
import pagesNames from '../pagesNames'
import Button from '../../components/button'
import Link from '../../components/link'

const LogoCompleto = require('../../app-assets/logo/Logo-OWO-MAL.png')

export default function Login(){
    const navigation = useNavigation()

    function navigateToHome(){
        navigation.navigate(pagesNames.home)
    }

    return (
        <View style={viewStyle.position}>
            <Image style={viewStyle.logo} source={LogoCompleto}></Image>
            <Text style={textStyle.principal}>
                Deseja entrar no aplicativo com sua conta do My Anime List?
            </Text>
            <Button onPress={navigateToHome} title="ENTRE"></Button>
            <Link onPress={navigateToHome} title="Continuar como convidado"> </Link>
        </View>
    )
}

const viewStyle = StyleSheet.create({
    position: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logo: {
        height: 113.94,
        width: 226.42
    }
})
