import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import textStyle from '../styles/text'

interface LinkSetinhaProps{
    text: string,
    onClick?: () => void
}

export default function LinkSetinha(props: LinkSetinhaProps){
    return(
        <TouchableOpacity style={linkSetinhaStyle.container} onPress={props.onClick}>
            <Text style={linkSetinhaStyle.texto}>{props.text}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={40} color="white"/>
        </TouchableOpacity>
    )
}

const linkSetinhaStyle = StyleSheet.create({
    texto: {
        ...textStyle.padrao,
        fontSize: 20,
        color: 'white',
        paddingHorizontal: 15
    },
    container: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }
})