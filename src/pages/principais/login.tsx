import React from 'react'
import { View, Text, Button } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import textStyle from '../../styles/text'

export default function Login(){
    const navigation = useNavigation()

    function navigateToHome(){
        navigation.navigate('home')
    }

    return (
        <View>
            <Text style={textStyle.tests}>Login</Text>
            <Button onPress={navigateToHome} title="Ir para home"></Button>
        </View>
    )
}

