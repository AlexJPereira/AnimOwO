import React from 'react'
import { View, Text } from 'react-native'

import textStyle from '../../styles/text'

export default function Home(){
    return (
        <View>
            <Text style={textStyle.tests}>Home</Text>
            <Text>O Naruto pode ser um pouco duro </Text>
        </View>
    )
}