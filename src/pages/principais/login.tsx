import React from 'react'
import { View, Text, StyleSheet, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native'

import MalApi from '../../services/mal-api'
import { setMalApi, malApi } from '../../services/global'

import textStyle from '../../styles/text'
import Button from '../../components/button'
import Link from '../../components/link'

const LogoCompleto = require('../../app-assets/logo/Logo-OWO-MAL.png')

export default function Login(){
    setMalApi(new MalApi())
    const navigator = useNavigation()

    function navigateToHome(){
        navigator.navigate('home')
    }

    async function login(){
        const auth = await malApi.login()
        
        if(auth && auth.type == "success"){
            alert("Login feito com sucesso")
            navigator.navigate('home')
        }else{
            alert("Falha no login")
        }
    }

    return (
        <View style={viewStyle.position}>
            <Image style={viewStyle.logo} source={LogoCompleto}></Image>
            <Text style={textStyle.principal}>
                Deseja entrar no aplicativo com sua conta do My Anime List?
            </Text>
            <Button onPress={login} title="ENTRE"></Button>
            <Link onPress={navigateToHome} title="Continuar como convidado"></Link>
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
