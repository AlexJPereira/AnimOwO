import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import textStyle from '../../styles/text'
import { pagesNames } from '../rotas'

export default function Login(){
    const navigation = useNavigation()

    function navigateToHome(){
        navigation.navigate(pagesNames.home)
    }

    return (
        <View>
            <Text style={textStyle.tests}>Login</Text>
            <Button onPress={navigateToHome} title="ir para home"></Button>
        </View>
    )
}

