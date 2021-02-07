import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

interface LinkSetinhaProps{
    text: string,
}

export default function LinkSetinha(props: LinkSetinhaProps){
    return(
        <View style={linkSetinhaStyle.container}>
            <Text style={linkSetinhaStyle.texto}>{props.text}</Text>
            <MaterialIcons name="keyboard-arrow-right" size={40} color="white"/>
        </View>
    )
}

const linkSetinhaStyle = StyleSheet.create({
    texto: {
        textAlignVertical: 'center',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 20,
        lineHeight: 23,
        letterSpacing: 1,
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