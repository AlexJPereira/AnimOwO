import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'

import textStyle from '../styles/text'

interface ListaPadraoProps{
    name: string,
    children?: React.ReactChild[] | React.ReactChild
}

export default function ListaPadrao(props: ListaPadraoProps){
    return(
        <View style={listaPadrao.container}>
            <Text style={listaPadrao.texto}>{props.name}</Text>
            <View style={listaPadrao.scrollContainer}>
                <ScrollView contentContainerStyle={listaPadrao.lista}>
                    {props.children}
                </ScrollView>
            </View>
        </View>
    )
}

const listaPadrao = StyleSheet.create({
    container: {
        height: '100%',
    },
    scrollContainer: {
        flex: 1
    },
    texto: {
        ...textStyle.tituloPagina,
        marginTop: 40,
        marginBottom: 30,
    },
    lista: {
        paddingBottom: 40,
    },
})