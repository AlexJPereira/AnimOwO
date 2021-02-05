import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import textStyle from '../../styles/text'
import { pagesNames } from '../rotas'

export default function Home(){
    const navigation = useNavigation()

    function navigateToLogin(){
        navigation.navigate(pagesNames.login)
    }

    return (
        <View>
            <Text style={textStyle.tests}>Home</Text>
            <Button onPress={navigateToLogin} title="Ir para login"></Button>
        </View>
    )
}